-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_voucher_type_id_fkey";

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "voucher_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_voucher_type_id_fkey" FOREIGN KEY ("voucher_type_id") REFERENCES "voucher_type"("voucher_type_id") ON DELETE SET NULL ON UPDATE CASCADE;
