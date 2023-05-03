import Link from "next/link"

import { Icons } from "~/components/icons"
import { siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"
import { type NavItem } from "~/types/nav"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface MainNavProps {
    items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
    return (
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                    {siteConfig.name}
                </span>
            </Link>
            {items?.length ? (
                <nav className="hidden gap-6 md:flex">
                    {items?.map(
                        (item, index) =>
                            item.disabled ? (
                                <TooltipProvider key={index}>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger>
                                            <p
                                                key={index}
                                                className={cn(
                                                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                                                    item.disabled && "cursor-not-allowed opacity-60"
                                                )}
                                            >
                                                {item.title}
                                            </p>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Coming soon</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <Link
                                    key={index}
                                    href={item.href ?? ""}
                                    className={cn(
                                        "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                                        item.disabled && "cursor-not-allowed opacity-60"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            )
                    )}
                </nav>
            ) : null}
        </div>
    )
}