"use client"

import { PROVIDER_ID as SteamProviderId } from "next-auth-steam"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignIn() {
    return (
        <button onClick={() => signIn(SteamProviderId)}>
            <Image width="180" height="1" src='https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png' alt='Sign in through Steam' />
        </button>
    )
}