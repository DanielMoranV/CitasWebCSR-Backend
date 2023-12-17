/*
  Warnings:

  - Added the required column `closing_balance` to the `cash_register` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_at` to the `cash_register` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cash_register" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "closing_balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL;
