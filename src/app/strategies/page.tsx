
import { Side } from "@prisma/client"
import Link from "next/link"
import LikeStrategy from "~/components/like-strategy-button"
import { Badge } from "~/components/ui/badge"
import { buttonVariants } from "~/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { cn } from "~/lib/utils"
import { prisma } from "~/server/db"

const sides = {
    [Side.COUNTERTERRORISTS]: 'CT',
    [Side.TERRORISTS]: 'T'
} as const

export default async function Strategies() {
    const strategies = await prisma.strategy.findMany()

    async function like(id: string) {
        "use server"
        console.log("liked", id)
        return true
    }

    return (
        <div className="container max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between px-2">
                    <div className="grid gap-1">
                        <h1 className="font-heading text-3xl md:text-4xl">Strategies</h1>
                        <p className="text-sm md:text-lg text-muted-foreground">Shows a complete list of strategies</p>
                    </div>
                </div>
                <Link href="/strategies/new" className={cn(buttonVariants({ size: "sm" }), "text-center")}>
                    Suggest strategy
                </Link>
            </div>
            <div className="mt-6 space-y-2">
                {strategies.map(strategy => (
                    <div key={strategy.id} className="flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium leading-none">
                                    {strategy.title}
                                </p>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger title="Show tags">
                                            <Badge className="md:hidden">...</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {strategy.maps.map(map => <Badge variant="outline">{map}</Badge>)}
                                            {strategy.side && <Badge variant="secondary">{sides[strategy.side]}</Badge>}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {strategy.maps.map(map => <Badge className="hidden md:block" variant="outline">{map}</Badge>)}
                                {strategy.side && <Badge className="hidden md:block" variant="secondary">{sides[strategy.side]}</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {strategy.description}
                            </p>
                        </div>
                        <LikeStrategy id={strategy.id} like={like} />
                    </div>
                ))}
            </div>
        </div>
    )
}