"use client"

import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { leaveLobby } from "~/api/lobby"
import { Button } from "./ui/button"
import SubmitButton from "./submit-button"

export default function LeaveLobby() {
    return (
        <>
            {/* @ts-ignore Server Actions */}
            <form action={leaveLobby}>
                <SubmitButton variant='outline'>
                    Leave lobby
                </SubmitButton>
            </form>
        </>
    )
}

