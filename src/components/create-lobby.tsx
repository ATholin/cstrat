"use client"

import { createLobby, leaveLobbyAction } from "~/api/lobby"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function CreateLobby() {
    const router = useRouter()
    const [_, setTransition] = useTransition()

    return (
        <>
            {/* @ts-ignore Server Actions */}
            <form action={async () => {
                await createLobby()
                setTransition(() => {
                    router.refresh()
                })
            }}>
                <Button>
                    Create lobby
                </Button>
            </form>
        </>
    )
}