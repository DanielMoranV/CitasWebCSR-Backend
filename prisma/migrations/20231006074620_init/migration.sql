-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_user_id_fkey";

-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "dependent_id" INTEGER,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_dependent_id_fkey" FOREIGN KEY ("dependent_id") REFERENCES "dependent"("dependent_id") ON DELETE SET NULL ON UPDATE CASCADE;
