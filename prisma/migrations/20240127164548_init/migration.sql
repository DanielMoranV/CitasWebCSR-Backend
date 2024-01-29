-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_time_slot_id_fkey";

-- AlterTable
ALTER TABLE "appointment" ALTER COLUMN "time_slot_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_time_slot_id_fkey" FOREIGN KEY ("time_slot_id") REFERENCES "timeSlot"("time_slot_id") ON DELETE SET NULL ON UPDATE CASCADE;
