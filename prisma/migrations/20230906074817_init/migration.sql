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

-- CreateIndex
CREATE UNIQUE INDEX "dependent_dni_key" ON "dependent"("dni");

-- AddForeignKey
ALTER TABLE "dependent" ADD CONSTRAINT "dependent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
