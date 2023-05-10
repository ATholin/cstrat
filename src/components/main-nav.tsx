"use client"

import Link, { LinkProps } from "next/link"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Icons } from "~/components/icons"
import { siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"
import { type NavItem } from "~/types/nav"
import { ScrollArea } from "./ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useState } from "react"

interface MainNavProps {
    items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
                <Icons.logo className="h-5 w-5" />
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
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger className="flex items-center">
                        <Icons.logo className="h-5 w-5" />
                        <ChevronRight />
                    </SheetTrigger>
                    <SheetContent position="left" size='xl'>
                        <MobileLink onOpenChange={setOpen} href="/" className="flex items-center space-x-2">
                            <Icons.logo className="h-5 w-5" />
                            <span className="font-bold">
                                {siteConfig.name}
                            </span>
                        </MobileLink>
                        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                            <div className="flex flex-col space-y-3">
                                {siteConfig.mainNav?.map(
                                    (item) =>
                                        item.href && (
                                            <MobileLink
                                                key={item.href}
                                                href={item.href}
                                                onOpenChange={setOpen}
                                            >
                                                {item.title}
                                            </MobileLink>
                                        )
                                )}
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    const router = useRouter()
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString())
                onOpenChange?.(false)
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </Link>
    )
}