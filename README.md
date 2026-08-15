# CitasWebCSR — Backend

API REST para la gestión integral de citas médicas de **Clínica Santa Rosa** (Sullana, Perú): pacientes, colaboradores, doctores, horarios, pagos, caja e integración con WhatsApp para notificaciones.

## Estado del proyecto

Proyecto en **desarrollo activo / MVP funcional**. El núcleo del dominio (usuarios, accesos, doctores, horarios, citas, pagos, caja, colaboradores) está implementado y operativo; quedan pendientes endurecimiento de seguridad, pruebas automatizadas, CI/CD y documentación de API formal (ver [Roadmap](#roadmap-sugerido)).

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

## Análisis de seguridad y credenciales

Se realizó una revisión del repositorio y del código en busca de credenciales expuestas y prácticas de manejo de secretos.

### ✅ Puntos correctos

- No hay ningún archivo `.env` ni credenciales reales versionadas en el repositorio ni en el historial de git.
- Todos los secretos (`JWT_KEY`, `ACCESS_TOKEN_CULQUI`, credenciales de Twilio, `DATABASE_URL`, etc.) se leen exclusivamente desde variables de entorno (`process.env`) — no hay claves ni contraseñas hardcodeadas en el código fuente.
- Las contraseñas de acceso se almacenan con `bcrypt` (hash), no en texto plano.
- `.gitignore` excluye `node_modules` y `.env`.

### ⚠️ Hallazgos a corregir (por severidad)

1. **Crítico — Fuga del secreto JWT en la respuesta HTTP.** En `src/midlewares/verifyToken.ts`, cuando la verificación del token falla, la respuesta 401 incluye el propio `JWT_KEY` en el body (`{ message, token, JWT_KEY, err }`). Esto expone la clave secreta de firma a cualquiera que envíe un token inválido/expirado, permitiendo forjar tokens válidos para cualquier usuario. **Acción:** eliminar `JWT_KEY` (y el objeto `err` completo) de la respuesta.

2. **Crítico — Endpoint de alta de credenciales sin autenticación.** `POST /access/:username` (`AccessController.createAccessUser`) no pasa por `verifyToken` (ver `src/routes/access.ts`). Cualquiera puede crear un acceso para un DNI existente, incluyendo el `roleId`, con contraseña por defecto igual al propio username hasheado. **Acción:** proteger la ruta y no permitir que el cliente asigne `roleId` libremente sin validación de permisos.

3. **Medio — Filtrado de hash de contraseña al cliente.** `AccessController.loginUser` responde con `{ ...access, token }`, y `getAccess`/`getAccessUser` devuelven el registro completo de `Access`, incluyendo el hash de `password`. **Acción:** usar `select`/DTO para excluir `password` de toda respuesta.

4. **Bajo–Medio — Artefactos de build y de sesión versionados.** `dist/` (compilado) y `.wwebjs_cache/` están commiteados al repositorio, incluyendo `tmp/qr.svg` y `dist/public/imgqrwp/qr.svg` (imágenes de códigos QR de vinculación de WhatsApp, servidos además por un endpoint público sin autenticación en `/imgqrwp`). Aunque el QR expira en segundos, no debería versionarse ni haber quedado en el historial. **Acción:** agregar `dist/`, `.wwebjs_cache/`, `tmp/` al `.gitignore` y purgarlos del repo.

5. **Bajo — Rutas de datos personales sin auth.** Varias rutas (`/patients` POST, `/users/dependents/*`, `/users/photoprofile/:dni`) no exigen `verifyToken`. Revisar si es intencional (formularios públicos) o si falta protección.

> Ninguno de estos hallazgos corresponde a una credencial real filtrada en el repositorio (no se encontró ninguna clave, token o contraseña real expuesta), pero los puntos 1–3 exponen material sensible **en tiempo de ejecución vía la API**, con el mismo impacto que una fuga de credenciales. Se recomienda tratarlos como prioritarios.

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

## Roadmap sugerido

- [ ] Corregir los hallazgos de seguridad listados arriba (prioridad crítica: #1 y #2).
- [ ] Sacar `dist/` y artefactos de WhatsApp del control de versiones.
- [ ] Añadir pruebas automatizadas (unitarias/integración) — actualmente no hay suite de tests.
- [ ] Configurar CI/CD (lint, build, tests) en GitHub Actions.
- [ ] Documentar la API con OpenAPI/Swagger en lugar del HTML estático en `/`.
- [ ] Definir y validar payloads de entrada (p. ej. con Zod/Joi) en controllers.
- [ ] Persistencia de sesión de WhatsApp (actualmente sin `authStrategy`, requiere reescanear QR en cada reinicio).
