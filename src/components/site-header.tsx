
import { LogOutIcon } from "lucide-react"
import { PROVIDER_ID as SteamProviderId } from "next-auth-steam"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { MainNav } from "~/components/main-nav"
import { ThemeToggle } from "~/components/theme-toggle"
import { siteConfig } from "~/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function SiteHeader() {
    const session = useSession()

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <MainNav items={siteConfig.mainNav} />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        {/* <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}
                            >
                                <Icons.gitHub className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link> */}
                        <ThemeToggle />
                        {session.status === 'authenticated' && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={session.data?.user.image ?? ""} alt={session.data.user.name ?? "User"} />
                                        <AvatarFallback>{session.data?.user.name}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOutIcon className="mr-2 h-4 w-4" />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        {session.status === 'unauthenticated' && (
                            <button onClick={() => signIn(SteamProviderId)}>
                                <Image width="180" height="1" src='https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png' alt='Sign in through Steam' />
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}