/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `admissionist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `admissionist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admissionist" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admissionist_user_id_key" ON "admissionist"("user_id");

-- AddForeignKey
ALTER TABLE "admissionist" ADD CONSTRAINT "admissionist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
