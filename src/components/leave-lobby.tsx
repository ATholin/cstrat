"use client"

import { leaveLobbyAction } from "~/api/lobby"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function LeaveLobby({ leaveLobby }: { leaveLobby: leaveLobbyAction }) {
    const router = useRouter()
    const [_, setTransition] = useTransition()

    return (
        <>
            {/* @ts-ignore Server Actions */}
            <form action={async () => {
                await leaveLobby()
                setTransition(() => {
                    router.refresh()
                })
            }}>
                <Button variant='outline'>
                    Leave lobby
                </Button>
            </form>
        </>
    )
}