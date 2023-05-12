-- CreateTable
CREATE TABLE "Lobby" (
    "id" TEXT NOT NULL,
    "shareId" TEXT NOT NULL,
    "strategyId" TEXT,
    "map" "Map",
    "side" "Side",
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Lobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersInLobby" (
    "lobbyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersInLobby_pkey" PRIMARY KEY ("userId","lobbyId")
);

-- AddForeignKey
ALTER TABLE "Lobby" ADD CONSTRAINT "Lobby_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lobby" ADD CONSTRAINT "Lobby_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInLobby" ADD CONSTRAINT "UsersInLobby_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES "Lobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInLobby" ADD CONSTRAINT "UsersInLobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
