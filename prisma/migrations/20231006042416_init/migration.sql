/*
  Warnings:

  - A unique constraint covering the columns `[time_slot_id]` on the table `appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time_slot_id` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "time_slot_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointment_time_slot_id_key" ON "appointment"("time_slot_id");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_time_slot_id_fkey" FOREIGN KEY ("time_slot_id") REFERENCES "timeSlot"("time_slot_id") ON DELETE RESTRICT ON UPDATE CASCADE;
