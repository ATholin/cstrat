-- DropForeignKey
ALTER TABLE "Lobby" DROP CONSTRAINT "Lobby_strategyId_fkey";

-- AddForeignKey
ALTER TABLE "Lobby" ADD CONSTRAINT "Lobby_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
