
"use client"

import { ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useState } from "react"

export default function LikeStrategy({ id, like }: { id: string, like: (id: string) => Promise<boolean> }) {
    const { toast } = useToast()

    const [liked, setLiked] = useState(false)

    async function handleLike() {
        const result = await like(id)
        if (result) {
            setLiked(true)
            toast({
                title: 'Liked!',
                description: 'Successfully liked strategy'
            })
        }
    }

    return (
        <>
            <Button title="Like strategy" onClick={handleLike} disabled={liked} variant='ghost'>
                <ThumbsUp size={20} />
            </Button>
        </>
    )
}