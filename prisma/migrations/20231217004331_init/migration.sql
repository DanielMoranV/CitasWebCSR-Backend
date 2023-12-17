-- AlterTable
ALTER TABLE "appointment_history" ADD COLUMN     "reason" TEXT,
ALTER COLUMN "diagnosis" DROP NOT NULL,
ALTER COLUMN "treatment" DROP NOT NULL;
