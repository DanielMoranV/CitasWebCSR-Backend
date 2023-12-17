/*
  Warnings:

  - You are about to drop the column `userId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `admissionist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admissionist" DROP CONSTRAINT "admissionist_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cash_register" DROP CONSTRAINT "cash_register_admissionist_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_admissionist_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_userId_fkey";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- DropTable
DROP TABLE "admissionist";

-- AddForeignKey
ALTER TABLE "cash_register" ADD CONSTRAINT "cash_register_admissionist_id_fkey" FOREIGN KEY ("admissionist_id") REFERENCES "access"("access_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_admissionist_id_fkey" FOREIGN KEY ("admissionist_id") REFERENCES "access"("access_id") ON DELETE SET NULL ON UPDATE CASCADE;
