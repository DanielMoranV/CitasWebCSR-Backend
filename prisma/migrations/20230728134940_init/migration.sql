-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "Users";

-- CreateTable
CREATE TABLE "Users"."user" (
    "user_id" SERIAL NOT NULL,
    "document_type" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "email" TEXT,
    "photo" TEXT,
    "role_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Users"."access" (
    "access_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT DEFAULT 'offline',
    "active" BOOLEAN,
    "last_session" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temporal_code" TEXT,

    CONSTRAINT "access_pkey" PRIMARY KEY ("access_id")
);

-- CreateTable
CREATE TABLE "Users"."role" (
    "role_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Users"."doctor" (
    "doctor_id" SERIAL NOT NULL,
    "specialty" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "cmp" TEXT NOT NULL,
    "rne" TEXT NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "Users"."timetable" (
    "timetable_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "weekday" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "timetable_pkey" PRIMARY KEY ("timetable_id")
);

-- CreateTable
CREATE TABLE "Users"."tariff" (
    "tariff_id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "code_tariff" TEXT NOT NULL,
    "clinic_price" INTEGER NOT NULL,
    "doctor_price" INTEGER NOT NULL,
    "discount" INTEGER,
    "total_Tariff" INTEGER NOT NULL,

    CONSTRAINT "tariff_pkey" PRIMARY KEY ("tariff_id")
);

-- CreateTable
CREATE TABLE "Users"."form" (
    "form_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "form_pkey" PRIMARY KEY ("form_id")
);

-- CreateTable
CREATE TABLE "Users"."role_x_form" (
    "role_x_form_id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,

    CONSTRAINT "role_x_form_pkey" PRIMARY KEY ("role_x_form_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_dni_key" ON "Users"."user"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "access_username_key" ON "Users"."access"("username");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "Users"."role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tariff_code_tariff_key" ON "Users"."tariff"("code_tariff");

-- CreateIndex
CREATE UNIQUE INDEX "form_name_key" ON "Users"."form"("name");

-- AddForeignKey
ALTER TABLE "Users"."user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Users"."role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"."access" ADD CONSTRAINT "access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"."user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"."doctor" ADD CONSTRAINT "doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"."user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"."timetable" ADD CONSTRAINT "timetable_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Users"."doctor"("doctor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"."tariff" ADD CONSTRAINT "tariff_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Users"."doctor"("doctor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"."role_x_form" ADD CONSTRAINT "role_x_form_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Users"."role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users"."role_x_form" ADD CONSTRAINT "role_x_form_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Users"."form"("form_id") ON DELETE RESTRICT ON UPDATE CASCADE;
