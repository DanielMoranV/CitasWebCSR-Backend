-- AlterTable
ALTER TABLE "cash_register" ALTER COLUMN "opening_balance" DROP NOT NULL,
ALTER COLUMN "current_balance" DROP NOT NULL,
ALTER COLUMN "last_updated" DROP NOT NULL,
ALTER COLUMN "closing_balance" DROP NOT NULL;
