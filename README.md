# CitasWebCSR — Backend

API REST para la gestión de citas médicas: pacientes, colaboradores, doctores, horarios, pagos, caja e integración con WhatsApp para notificaciones.

## Sobre este proyecto

Fue mi **primer encargo como freelance**, desarrollado entre 2023 y 2024 como soporte para el proyecto de tesis de una colega. El caso de uso está modelado sobre una clínica (de ahí el nombre), pero **no es ni fue un sistema de producción de Clínica Santa Rosa**: es un trabajo académico y de aprendizaje, hecho a título personal.

**Estado: archivado, fuera de servicio.** No hay ningún despliegue activo. Se mantiene público como registro de trabajo: 97 commits, 19 modelos de dominio y 28 migraciones escritos a mano, antes de que existieran los asistentes de código que uso hoy.

En 2026 lo reabrí para auditarlo. La sección [Auditoría de seguridad](#auditoría-de-seguridad-2026) documenta lo que encontré y lo que corregí — es, con diferencia, la parte más interesante del repositorio.

## Arquitectura

Backend monolítico en capas sobre Node.js/Express, con acceso a datos vía Prisma ORM y dos integraciones de tiempo real (Socket.IO y WhatsApp Web).

```
Cliente (Web/App)
      │  HTTP/REST + JWT
      ▼
 Express App (src/app.ts)
      │
      ├── Routes        (src/routes)        → definición de endpoints por dominio
      ├── Middlewares    (src/midlewares)    → auth JWT, upload de archivos, manejo de errores
      ├── Controllers    (src/controllers)   → orquestación de la petición/respuesta
      ├── Repositories   (src/repository)    → acceso a datos (Prisma) por entidad
      └── Connections    (src/connection)    → Prisma Client, Twilio, WhatsApp Web
      │
      ▼
 PostgreSQL (Prisma ORM, 19 modelos, 28 migraciones)

Canales adicionales:
 - Socket.IO   → eventos en tiempo real (estado de conexión WhatsApp, QR)
 - WhatsApp Web (whatsapp-web.js) → confirmación de citas/pagos por WhatsApp
 - Twilio SMS  → notificaciones (implementado, actualmente sin uso activo)
 - Culqi       → pasarela de pagos con tarjeta
```

Patrón por módulo: `route → controller → repository → prisma`, con controllers agrupados en clases "Handler" y repositories como funciones exportadas por entidad.

## Tecnologías

| Categoría | Tecnología |
|---|---|
| Runtime / Lenguaje | Node.js, TypeScript 5 |
| Framework HTTP | Express 4 |
| ORM / Base de datos | Prisma 5 + PostgreSQL |
| Autenticación | JWT (`jsonwebtoken`) + `bcrypt` para hashing de contraseñas |
| Tiempo real | Socket.IO |
| Mensajería | whatsapp-web.js, Twilio (SMS) |
| Pagos | Culqi (`culqi-node`) |
| Utilitarios | Multer (subida de archivos), Morgan (logging), CORS, Axios, dotenv |
| Túnel de desarrollo | @ngrok/ngrok |
| Tooling | ts-node, nodemon, concurrently |

## Módulos / dominios implementados

- **Usuarios y dependientes** — CRUD, foto de perfil, búsqueda por DNI.
- **Accesos (Access)** — alta de credenciales, login con JWT, roles.
- **Colaboradores** — CRUD de personal administrativo.
- **Doctores** — perfil, precios personalizados, horarios (`Schedule`/`TimeSlot`) y disponibilidad.
- **Citas (Appointment)** — creación, consulta por usuario, historial, eliminación.
- **Pagos** — pago con tarjeta (Culqi) y pago en efectivo, notificación automática por WhatsApp al confirmar.
- **Caja (Cash Register)** — apertura/cierre de caja, transacciones de ingreso/egreso, reportes por fecha.
- **Conexión WhatsApp** — generación de QR, estado de sesión emitido por Socket.IO.
- **Documentación** — endpoint raíz con listado HTML de rutas disponibles.

## Auditoría de seguridad (2026)

Dos años después de escribirlo, audité este código con criterio actual. Lo publico entero —hallazgos y correcciones— porque revisar el propio trabajo viejo y saber leerlo dice más que un repositorio sin defectos.

**Contexto:** el proyecto no tiene despliegue activo, así que ninguno de estos hallazgos fue explotable contra un servicio real. Todos están corregidos en el código.

### Hallazgos corregidos

**1. Fuga del secreto JWT en la respuesta HTTP — crítico.**
`src/midlewares/verifyToken.ts` devolvía el propio `JWT_KEY` dentro del body del 401 cuando la verificación fallaba. Bastaba enviar un token vencido para obtener el secreto de firma del servidor y, con él, forjar tokens válidos de cualquier usuario. Es el fallo más grave: convierte un error de autenticación en una toma completa del sistema.
→ *Corregido:* la respuesta de error ya no incluye el secreto, el token recibido ni el objeto `err`.

**2. Alta de credenciales sin autenticación — crítico.**
`POST /access/:username` no pasaba por `verifyToken`. Cualquiera podía crear un acceso para un DNI existente, eligiendo el `roleId` en el body, con contraseña por defecto igual al propio username. Además, el *spread* del body iba al final del objeto, de modo que el cliente podía sobrescribir `userId`, `username` y `active`.
→ *Corregido:* la ruta exige sesión válida y los campos de identidad los fija el servidor después del spread.

**3. Filtrado del hash de contraseña — medio.**
`loginUser`, `getAccess`, `getAccessUser` y `updateAccessId` devolvían el registro `Access` completo, hash `bcrypt` incluido. Un hash no es una contraseña, pero entregarlo al cliente regala el material para atacarlo sin límite de intentos.
→ *Corregido:* helper `omitPassword` aplicado a todas las respuestas del módulo.

**4. JWT sin caducidad — medio.**
`jwt.sign` se llamaba sin `expiresIn`: los tokens emitidos eran válidos para siempre.
→ *Corregido:* expiración de 8 horas.

**5. Artefactos de build y sesión versionados — bajo.**
`dist/`, `.wwebjs_cache/` y `tmp/` estaban commiteados, incluidos los SVG de QR de vinculación de WhatsApp (expiran en un minuto, pero no debían estar ahí).
→ *Corregido:* fuera del control de versiones y añadidos al `.gitignore`, junto a `.wwebjs_auth/`, que sí contiene credenciales de sesión.

### Lo que ya estaba bien

- **Ninguna credencial real fue commiteada nunca.** Verificado sobre el historial completo: `.env`, `.env.local` y `credentials.json` no aparecen en ningún commit.
- Todos los secretos (`JWT_KEY`, `DATABASE_URL`, `ACCESS_TOKEN_CULQUI`, Twilio) se leen desde `process.env`; no hay nada hardcodeado en el código.
- Las contraseñas se almacenan con `bcrypt`, nunca en claro.
- Las migraciones son solo DDL: no hay datos de personas reales en el repositorio.

### Pendiente, y por qué no lo corregí

- **Autorización por roles.** El sistema autentica (¿quién eres?) pero no autoriza (¿puedes hacer esto?): un usuario con sesión válida puede asignar `roleId` al crear un acceso. Resolverlo bien exige un middleware de permisos y rediseñar las rutas — es una funcionalidad nueva, no un parche, y no tiene sentido construirla sobre un proyecto archivado.
- **Rutas de datos personales sin `verifyToken`** (`POST /patients`, `/users/dependents/*`, `/users/photoprofile/:dni`). Parte parece intencional (formularios públicos de reserva) y parte un olvido; sin el contexto original no puedo distinguirlas con certeza, y prefiero dejarlo dicho a fingir que lo sé.

## Instalación

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev      # desarrollo (watch + nodemon)
npm run build    # compila TypeScript a dist/
npm start        # ejecuta dist/index.js
```

### Variables de entorno requeridas (`.env`)

```
DATABASE_URL=postgresql://usuario:password@host:puerto/basededatos
PORT=3000
API=/api/v1
CLIURL=http://localhost:puerto-frontend
JWT_KEY=una_clave_secreta_fuerte
ACCESS_TOKEN_CULQUI=tu_token_privado_de_culqi
accountSidTwilio=tu_account_sid_de_twilio
authTokenTwilio=tu_auth_token_de_twilio
twilioPhoneNumber=tu_numero_de_twilio
```

## Lo que hoy haría distinto

El proyecto está archivado, así que esto no es una hoja de ruta sino la lista de lo que le faltaba — y que en los proyectos que vinieron después ya doy por sentado:

- **Validar los payloads de entrada** (Zod o similar) en lugar de confiar en `req.body`. La mayoría de los hallazgos de la auditoría nacen de ahí.
- **Autorización por roles**, no solo autenticación.
- **Pruebas automatizadas**: no hay ninguna. Los dos fallos críticos los habría cazado un test de integración sobre el login.
- **CI/CD** con lint, build y tests en GitHub Actions.
- **Documentar la API** con OpenAPI en vez del HTML estático servido en `/`.
- **Persistir la sesión de WhatsApp** (`authStrategy`): sin ella hay que reescanear el QR en cada reinicio.
