
import { NextAuthProvider } from "~/app/providers"
import { MainNav } from "~/components/main-nav"
import { ThemeToggle } from "~/components/theme-toggle"
import { siteConfig } from "~/config/site"
import SignIn from "./sign-in"
import SignOut from "./sign-out"
import LobbyLinks from "./lobby-links"
import getServerSession from "~/utils/getServerSession"

export default async function SiteHeader() {
    const session = await getServerSession()

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
                        {/* @ts-ignore RSC */}
                        {session?.user && <LobbyLinks />}
                        <ThemeToggle />
                        <NextAuthProvider>
                            {session?.user && (
                                <SignOut />
                            )}
                            {!session?.user && (
                                <SignIn />
                            )}
                        </NextAuthProvider>
                    </nav>
                </div>
            </div>
        </header>
    )
}