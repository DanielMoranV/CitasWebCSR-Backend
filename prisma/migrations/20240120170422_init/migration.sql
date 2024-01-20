-- CreateTable
CREATE TABLE "Connection" (
    "connection_id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("connection_id")
);
