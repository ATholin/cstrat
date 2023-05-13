
"use client"

import { ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useState } from "react"
import like from '~/api/like';

export default function LikeStrategy({ id, ...props }: { id: string, like: typeof like }) {
    const { toast } = useToast()

    const [liked, setLiked] = useState(false)

    async function handleLike() {
        const result = await props.like(id)
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