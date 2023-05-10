"use client"

import { PROVIDER_ID as SteamProviderId } from "next-auth-steam"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignIn() {
    return (
        <button className="h-full" onClick={() => signIn(SteamProviderId)}>
            <Image priority width="180" height="35" src='https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png' alt='Sign in through Steam' />
        </button>
    )
}