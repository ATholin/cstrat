/*
  Warnings:

  - You are about to drop the `UsersInLobby` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lobby" DROP CONSTRAINT "Lobby_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "UsersInLobby" DROP CONSTRAINT "UsersInLobby_lobbyId_fkey";

-- DropForeignKey
ALTER TABLE "UsersInLobby" DROP CONSTRAINT "UsersInLobby_userId_fkey";

-- DropTable
DROP TABLE "UsersInLobby";

-- CreateTable
CREATE TABLE "_JoinedLobbies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JoinedLobbies_AB_unique" ON "_JoinedLobbies"("A", "B");

-- CreateIndex
CREATE INDEX "_JoinedLobbies_B_index" ON "_JoinedLobbies"("B");

-- AddForeignKey
ALTER TABLE "Lobby" ADD CONSTRAINT "Lobby_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JoinedLobbies" ADD CONSTRAINT "_JoinedLobbies_A_fkey" FOREIGN KEY ("A") REFERENCES "Lobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JoinedLobbies" ADD CONSTRAINT "_JoinedLobbies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
