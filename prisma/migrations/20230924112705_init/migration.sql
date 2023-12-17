/*
  Warnings:

  - You are about to drop the column `userId` on the `doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "doctor" DROP CONSTRAINT "doctor_userId_fkey";

-- DropIndex
DROP INDEX "doctor_userId_key";

-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "doctor_user_id_key" ON "doctor"("user_id");

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
