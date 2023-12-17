/*
  Warnings:

  - A unique constraint covering the columns `[start_time]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[end_time]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderly_turn]` on the table `timeSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedule_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "schedule_start_time_key" ON "schedule"("start_time");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_end_time_key" ON "schedule"("end_time");

-- CreateIndex
CREATE UNIQUE INDEX "timeSlot_orderly_turn_key" ON "timeSlot"("orderly_turn");
