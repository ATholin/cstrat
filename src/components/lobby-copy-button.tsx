"use client"

import { Lobby } from "@prisma/client"
import { Copy } from "lucide-react"
import { Button } from "./ui/button"

type Props = {
    lobby: Lobby
}

export default function LobbyCopyButton({ lobby }: Props) {
    return (
        <Button variant='outline' className="space-x-2">
            <p>
                {lobby?.shareId}
            </p>
            <div>
                <Copy size={18} />
            </div>
        </Button>
    )
}