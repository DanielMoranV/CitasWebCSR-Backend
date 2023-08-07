/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users"."user" DROP CONSTRAINT "user_role_id_fkey";

-- AlterTable
ALTER TABLE "Users"."access" ADD COLUMN     "role_id" INTEGER;

-- AlterTable
ALTER TABLE "Users"."user" DROP COLUMN "role_id";

-- AddForeignKey
ALTER TABLE "Users"."access" ADD CONSTRAINT "access_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Users"."role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;
