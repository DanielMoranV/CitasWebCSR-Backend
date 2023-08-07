Instrucciones de instalación:

- npm init --yes
- npm install express dotenv
- npm nodemon morgan -D
- npm i jsonwebtoken
- npm i concurrently -D
- npm install prisma
- npm i bcrypt
- npx prisma init --datasource-provider postgresql
- npm install @prisma/client

Typescript

- npm install typescript ts-node @types/express @types/node
- modifica tsconfig.json " "outDir": "./dist", "

Migrar base de datos

- npx prisma migrate dev --name init

Sistema Citas Medicas

- Pagina de inicio : Informacion de los medicos con sus especialidad, horarios de atencion (disponibilidad), precios de servicios
- notificaciones con anticipacion de turnos
-
