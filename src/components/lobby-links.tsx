import { buttonVariants } from "./ui/button";


import Link from "next/link";
import { getUserLobby } from "~/api/lobby";
import CreateLobby from "./create-lobby";
import getServerSession from "~/utils/getServerSession";
import { redirect } from "next/navigation";

export default async function LobbyLinks() {
    const lobby = await getUserLobby()

    if (lobby) return (
        <Link className={buttonVariants({ variant: 'outline' })} href={`/lobby/${lobby.shareId}`}>My Lobby</Link>
    )

    return (
        <div className="flex items-center space-x-2">
            <Link className={buttonVariants({
                variant: 'link'
            })} href="/lobby/join">Join lobby</Link>
        </div>
    )
}