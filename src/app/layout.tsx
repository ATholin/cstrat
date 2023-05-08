import { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import "~/styles/globals.css"

import SiteHeader from "~/components/site-header"
import { ThemeProvider } from "~/components/theme-provider"
import { siteConfig } from "~/config/site"
// import { fontSans } from "~/lib/fonts"
import { cn } from "~/lib/utils"
import { NextAuthProvider } from "./providers"
import { Toaster } from "~/components/ui/toaster"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
    src: "../assets/fonts/CalSans-SemiBold.woff2",
    variable: "--font-heading",
})

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable,
                        fontHeading.variable
                    )}
                >
                    <NextAuthProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <div className="relative flex min-h-screen flex-col space-y-6">
                                {/* @ts-expect-error Server Component */}
                                <SiteHeader />
                                <div className="flex-1">{children}</div>
                            </div>
                        </ThemeProvider>
                    </NextAuthProvider>
                    <Toaster />
                </body>
            </html>
        </>
    )
}