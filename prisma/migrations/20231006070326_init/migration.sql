-- DropForeignKey
ALTER TABLE "appointment_service" DROP CONSTRAINT "appointment_service_appointment_id_fkey";

-- AddForeignKey
ALTER TABLE "appointment_service" ADD CONSTRAINT "appointment_service_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE CASCADE ON UPDATE CASCADE;
