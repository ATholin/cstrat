-- CreateEnum
CREATE TYPE "Map" AS ENUM ('MIRAGE', 'INFERNO', 'NUKE', 'ANCIENT', 'VERTIGO', 'OVERPASS', 'ANUBIS', 'DUST2', 'TRAIN', 'CACHE');

-- CreateEnum
CREATE TYPE "Side" AS ENUM ('COUNTERTERRORISTS', 'TERRORISTS');

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maps" "Map"[],
    "side" "Side",

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
