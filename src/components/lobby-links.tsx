import { buttonVariants } from "./ui/button";


import Link from "next/link";
import { getUserLobby } from "~/api/lobby";
import CreateLobby from "./create-lobby";

export default async function LobbyLinks() {
    const lobby = await getUserLobby()

    if (lobby) {
        return (
            <Link className={buttonVariants()} href="/lobby">Lobby</Link>
        )
    }

    return (
        <div className="flex items-center space-x-2">
            <Link className={buttonVariants({
                variant: 'link'
            })} href="/lobby/join">Join lobby</Link>

            {/* @ts-ignore Server Actions */}
            <CreateLobby />
        </div>
    )
}