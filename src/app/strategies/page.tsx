
import Link from "next/link"
import LikeStrategy from "~/components/like-strategy-button"
import { Badge } from "~/components/ui/badge"
import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { prisma } from "~/server/db"



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
                        <p className="text-lg text-muted-foreground">Shows a complete list of strategies</p>
                    </div>
                </div>
                <Link href="/strategies/new" className={cn(buttonVariants({ size: "sm" }))}>
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
                                {strategy.map && <Badge variant="outline">{strategy.map}</Badge>}
                                {strategy.side && <Badge variant="outline">{strategy.side}</Badge>}
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