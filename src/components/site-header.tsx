
import { getServerSession } from "next-auth"
import { MainNav } from "~/components/main-nav"
import { ThemeToggle } from "~/components/theme-toggle"
import { siteConfig } from "~/config/site"
import { createAuthOptions } from "~/server/auth"
import SignIn from "./sign-in"
import SignOut from "./sign-out"

export default async function SiteHeader() {
    const session = await getServerSession(createAuthOptions())

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
                        {session?.user && (
                            <SignOut />
                        )}
                        {!session?.user && (
                            <SignIn />
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}