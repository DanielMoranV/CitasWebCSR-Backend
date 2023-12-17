/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `dependent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "dependent_user_id_dni_key";

-- CreateIndex
CREATE UNIQUE INDEX "dependent_dni_key" ON "dependent"("dni");
