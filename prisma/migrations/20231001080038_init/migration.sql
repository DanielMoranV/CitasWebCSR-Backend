-- DropForeignKey
ALTER TABLE "timeSlot" DROP CONSTRAINT "timeSlot_scheduleId_fkey";

-- AddForeignKey
ALTER TABLE "timeSlot" ADD CONSTRAINT "timeSlot_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("schedule_id") ON DELETE CASCADE ON UPDATE CASCADE;
