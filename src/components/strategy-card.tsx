"use client"
import { Map, Side, Strategy } from "@prisma/client"
import { FormEvent, useState, useTransition } from "react"
import Balancer from 'react-wrap-balancer'
import { GetRandomStrategy, GetRandomStrategyOptions } from "~/api/getRandomStrategy"
import { maps } from "~/utils/map-names"
import { sides } from "~/utils/side-names"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { TypographyH1, TypographyLead } from "./ui/typography"
import { Skeleton } from "./ui/skeleton"
import { newStrategy } from "~/api/lobby"

type Props = {
    showSelects?: boolean,
    showNewStrategy?: boolean,
    getRandomStrategy: typeof GetRandomStrategy | typeof newStrategy,
    initialStrategy: Strategy | null
}

export default function StrategyCard({ showSelects = true, showNewStrategy = true, getRandomStrategy, initialStrategy }: Props) {
    const [strategy, setStrategy] = useState<Strategy | null>(initialStrategy);
    const [pending, startTransition] = useTransition()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const map = formData.get('map')
        const side = formData.get('side')

        const options: GetRandomStrategyOptions = {
            map: map === "" ? null : map as Map,
            side: side === "" ? null : side as Side,
        }

        // @ts-ignore
        startTransition(async () => {
            const result = await getRandomStrategy(options)
            setStrategy(result)
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="container max-w-lg mt-4 space-y-4 sm:space-y-0 sm:flex justify-between sm:space-x-4">
                {showSelects && (
                    <>
                        <Select name="map">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a map" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="">Any</SelectItem>
                                    {Object.keys(Map).map(m => <SelectItem value={m} key={m}>{maps[m as Map]}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select name="side">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Side" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="">Any</SelectItem>
                                    {Object.keys(Side).map(s => <SelectItem value={s} key={s}>{sides[s as Side]}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </>
                )}
                {showNewStrategy && (
                    <Button disabled={pending} className="w-full">{pending ? "Loading..." : "New strategy"}</Button>
                )}
            </div>
            <div className="mt-8">
                {pending && (
                    <div className="flex flex-col items-center">
                        <Skeleton className="w-auto">
                            <TypographyH1 className="opacity-0">Loading...</TypographyH1>
                        </Skeleton>
                        <Skeleton className="mt-4 w-auto">
                            <TypographyLead className="opacity-0">LoadingLoadingLoadingLoadingLoadingLoading</TypographyLead>
                        </Skeleton>
                    </div>
                )}

                {!pending && (
                    <>
                        <TypographyH1 className="text-center"><Balancer>{strategy?.title ?? 'No strategy found'}</Balancer></TypographyH1>
                        <TypographyLead className="text-center mt-4"><Balancer>{strategy?.description}</Balancer></TypographyLead>
                    </>
                )}
            </div>
        </form>
    )
}