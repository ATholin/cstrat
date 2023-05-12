-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'PREMIUM', 'USER');

-- AlterTable
ALTER TABLE "Strategy" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
