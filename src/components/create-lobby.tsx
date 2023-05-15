"use client"

import { createLobby, leaveLobbyAction } from "~/api/lobby"
import { Button } from "./ui/button"
import SubmitButton from "./submit-button"
export default function CreateLobby() {
    return (
        <>
            {/* @ts-ignore Server Actions */}
            <form action={createLobby}>
                <SubmitButton>
                    Create lobby
                </SubmitButton>
            </form>
        </>
    )
}