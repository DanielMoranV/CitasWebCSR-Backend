-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "document_type" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT,
    "birth_date" TIMESTAMP(3),
    "sex" TEXT,
    "civil_status" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "dependent" (
    "dependent_id" SERIAL NOT NULL,
    "document_type" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "photo" TEXT,
    "birth_date" TIMESTAMP(3),
    "sex" TEXT,
    "civil_status" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "dependent_pkey" PRIMARY KEY ("dependent_id")
);

-- CreateTable
CREATE TABLE "access" (
    "access_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT,
    "active" BOOLEAN DEFAULT true,
    "last_session" TIMESTAMP(3),
    "create_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "access_pkey" PRIMARY KEY ("access_id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "appointment_id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("appointment_id")
);

-- CreateTable
CREATE TABLE "medical_service" (
    "medical_service_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "general_price" DOUBLE PRECISION NOT NULL,
    "prerequisites" TEXT,

    CONSTRAINT "medical_service_pkey" PRIMARY KEY ("medical_service_id")
);

-- CreateTable
CREATE TABLE "appointment_service" (
    "appointment_id" INTEGER NOT NULL,
    "medical_service_id" INTEGER NOT NULL,

    CONSTRAINT "appointment_service_pkey" PRIMARY KEY ("appointment_id","medical_service_id")
);

-- CreateTable
CREATE TABLE "cash_register_transaction" (
    "transaction_id" SERIAL NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "cash_register_id" INTEGER NOT NULL,
    "voucher_number" INTEGER NOT NULL,
    "paymentPaymentId" INTEGER,

    CONSTRAINT "cash_register_transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "cash_register" (
    "cash_register_id" SERIAL NOT NULL,
    "opening_balance" DOUBLE PRECISION NOT NULL,
    "current_balance" DOUBLE PRECISION NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "admissionist_id" INTEGER,

    CONSTRAINT "cash_register_pkey" PRIMARY KEY ("cash_register_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" SERIAL NOT NULL,
    "voucher_number" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "appointment_id" INTEGER NOT NULL,
    "payment_method_id" INTEGER NOT NULL,
    "invoice_type_id" INTEGER NOT NULL,
    "admissionist_id" INTEGER,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "personalized_price" (
    "personalized_price_id" SERIAL NOT NULL,
    "personalized_price" DOUBLE PRECISION NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "medical_service_id" INTEGER NOT NULL,

    CONSTRAINT "personalized_price_pkey" PRIMARY KEY ("personalized_price_id")
);

-- CreateTable
CREATE TABLE "appointment_history" (
    "appointment_history_id" SERIAL NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "appointment_id" INTEGER NOT NULL,

    CONSTRAINT "appointment_history_pkey" PRIMARY KEY ("appointment_history_id")
);

-- CreateTable
CREATE TABLE "notification" (
    "notification_id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "role" (
    "role_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "payment_method" (
    "payment_method_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("payment_method_id")
);

-- CreateTable
CREATE TABLE "invoice_type" (
    "invoice_type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "invoice_type_pkey" PRIMARY KEY ("invoice_type_id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "schedule_id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "interval" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "available_schedule" BOOLEAN NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "timeSlot" (
    "time_slot_id" SERIAL NOT NULL,
    "orderly_turn" TIMESTAMP(3) NOT NULL,
    "n_turn" INTEGER NOT NULL,
    "available_turn" BOOLEAN NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "timeSlot_pkey" PRIMARY KEY ("time_slot_id")
);

-- CreateTable
CREATE TABLE "doctor" (
    "doctor_id" SERIAL NOT NULL,
    "specialization" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "cmp" TEXT,
    "rne" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_dni_key" ON "user"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dependent_dni_key" ON "dependent"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "access_username_key" ON "access"("username");

-- CreateIndex
CREATE UNIQUE INDEX "medical_service_code_key" ON "medical_service"("code");

-- CreateIndex
CREATE UNIQUE INDEX "payment_voucher_number_key" ON "payment"("voucher_number");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "payment_method_name_key" ON "payment_method"("name");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_type_name_key" ON "invoice_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_day_key" ON "schedule"("day");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_cmp_key" ON "doctor"("cmp");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_rne_key" ON "doctor"("rne");

-- AddForeignKey
ALTER TABLE "dependent" ADD CONSTRAINT "dependent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access" ADD CONSTRAINT "access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access" ADD CONSTRAINT "access_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_service" ADD CONSTRAINT "appointment_service_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_service" ADD CONSTRAINT "appointment_service_medical_service_id_fkey" FOREIGN KEY ("medical_service_id") REFERENCES "medical_service"("medical_service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_register_transaction" ADD CONSTRAINT "cash_register_transaction_cash_register_id_fkey" FOREIGN KEY ("cash_register_id") REFERENCES "cash_register"("cash_register_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_register_transaction" ADD CONSTRAINT "cash_register_transaction_paymentPaymentId_fkey" FOREIGN KEY ("paymentPaymentId") REFERENCES "payment"("payment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_register" ADD CONSTRAINT "cash_register_admissionist_id_fkey" FOREIGN KEY ("admissionist_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("payment_method_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_invoice_type_id_fkey" FOREIGN KEY ("invoice_type_id") REFERENCES "invoice_type"("invoice_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_admissionist_id_fkey" FOREIGN KEY ("admissionist_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personalized_price" ADD CONSTRAINT "personalized_price_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personalized_price" ADD CONSTRAINT "personalized_price_medical_service_id_fkey" FOREIGN KEY ("medical_service_id") REFERENCES "medical_service"("medical_service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_history" ADD CONSTRAINT "appointment_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_history" ADD CONSTRAINT "appointment_history_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_history" ADD CONSTRAINT "appointment_history_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeSlot" ADD CONSTRAINT "timeSlot_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
