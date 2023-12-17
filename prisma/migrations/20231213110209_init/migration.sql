/*
  Warnings:

  - Added the required column `category` to the `cash_register_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cash_register_transaction" ADD COLUMN     "category" TEXT NOT NULL;
