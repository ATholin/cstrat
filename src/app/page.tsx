import Head from "next/head";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { TypographyH2, TypographyLarge, TypographyMuted } from "~/components/ui/typography";
import { prisma } from "~/server/db";

export default async function Home() {
    const users = await prisma.user.findMany()

    return (
        <>
            <Head>
                <title>cstrat</title>
                <meta name="description" content="Counter-Strike Stratroulette" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="mt-8 container max-w-sm">
                <TypographyH2>Users</TypographyH2>

                <div className="mt-4">
                    {users.map(user => (
                        <div key={user.id} className="flex space-x-4">
                            <div className="flex items-center">
                                <Avatar>
                                    <AvatarImage src={user.image ?? ""} />
                                    <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <TypographyLarge>{user.name}</TypographyLarge>
                                <TypographyMuted>{user.email}</TypographyMuted>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </>
    );
};
