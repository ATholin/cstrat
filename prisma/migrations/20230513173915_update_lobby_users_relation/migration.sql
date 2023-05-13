/*
  Warnings:

  - You are about to drop the `_JoinedLobbies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Lobby` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_JoinedLobbies" DROP CONSTRAINT "_JoinedLobbies_A_fkey";

-- DropForeignKey
ALTER TABLE "_JoinedLobbies" DROP CONSTRAINT "_JoinedLobbies_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lobbyId" TEXT;

-- DropTable
DROP TABLE "_JoinedLobbies";

-- CreateIndex
CREATE UNIQUE INDEX "Lobby_ownerId_key" ON "Lobby"("ownerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES "Lobby"("id") ON DELETE SET NULL ON UPDATE CASCADE;
