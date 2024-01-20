/*
  Warnings:

  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Connection";

-- CreateTable
CREATE TABLE "connection" (
    "connection_id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "connection_pkey" PRIMARY KEY ("connection_id")
);
