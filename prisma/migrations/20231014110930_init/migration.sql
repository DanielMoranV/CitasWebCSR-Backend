/*
  Warnings:

  - You are about to drop the column `invoice_type_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `invoice_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `voucher_type_id` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_invoice_type_id_fkey";

-- DropIndex
DROP INDEX "payment_voucher_number_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "invoice_type_id",
ADD COLUMN     "voucher_type_id" INTEGER NOT NULL,
ALTER COLUMN "voucher_number" DROP NOT NULL;

-- DropTable
DROP TABLE "invoice_type";

-- CreateTable
CREATE TABLE "voucher_type" (
    "voucher_type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "voucher_type_pkey" PRIMARY KEY ("voucher_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voucher_type_name_key" ON "voucher_type"("name");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_voucher_type_id_fkey" FOREIGN KEY ("voucher_type_id") REFERENCES "voucher_type"("voucher_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
