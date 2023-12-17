/*
  Warnings:

  - Changed the type of `interval` on the `schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "interval",
ADD COLUMN     "interval" INTEGER NOT NULL;
