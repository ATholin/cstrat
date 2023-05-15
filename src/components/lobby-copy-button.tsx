"use client"

import { Lobby } from "@prisma/client"
import { Check, Copy } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useClipboard } from "@mantine/hooks"

type Props = {
    lobby: Lobby
}

export default function LobbyCopyButton({ lobby }: Props) {
    const { toast } = useToast()
    const clipboard = useClipboard({ timeout: 1000 })

    return (
        <Button variant='outline' className="space-x-2" onClick={() => {
            clipboard.copy(lobby.shareId);
            toast({ description: 'Lobby link copied' })
        }}>
            <p>{lobby?.shareId}</p>
            {clipboard.copied && <Check size={18} />}
            {!clipboard.copied && <Copy size={18} />}
        </Button>
    )
}