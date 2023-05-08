"use client"

import { Button } from "./ui/button"

export default function GenerateStrategy({ generate }: { generate?: () => Promise<void> }) {
    return (
        <Button disabled onClick={async () => {
            await generate?.()
        }} variant='outline' className="space-x-2">
            Generate
        </Button>
    )
}