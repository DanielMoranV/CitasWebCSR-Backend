/*
  Warnings:

  - A unique constraint covering the columns `[cmp]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctor_cmp_key" ON "doctor"("cmp");
