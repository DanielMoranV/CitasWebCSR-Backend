/*
  Warnings:

  - A unique constraint covering the columns `[rne]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctor_rne_key" ON "doctor"("rne");
