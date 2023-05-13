
import { Side } from "@prisma/client"
import Link from "next/link"
import LikeStrategy from "~/components/like-strategy-button"
import { Badge } from "~/components/ui/badge"
import { buttonVariants } from "~/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { cn } from "~/lib/utils"
import { prisma } from "~/server/db"
import { DataTable } from "./datatable"
import { columns } from "./columns"
import like from "~/api/like"


const sides = {
    [Side.COUNTERTERRORISTS]: 'CT',
    [Side.TERRORISTS]: 'T'
} as const

export default async function Strategies() {
    const strategies = await prisma.strategy.findMany()
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
            <div className="mt-2">
                <DataTable columns={columns} data={strategies}/>
            </div>
        </div>
    )
}