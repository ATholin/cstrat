"use client"

import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Settings2 } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Side, Map, Lobby } from "@prisma/client";
import { maps } from "~/utils/map-names";
import { sides } from "~/utils/side-names";
import SubmitButton from "~/components/submit-button";
import { setLobbyOptions } from "~/api/lobby";
import { FormEvent, useRef, useTransition } from "react";
import { GetRandomStrategy, GetRandomStrategyOptions } from "~/api/getRandomStrategy";

type Props = {
    lobby: Lobby,
}


export default function LobbyOptions(props: Props) {

    const ref = useRef<HTMLButtonElement | null>(null)
    const [pending, setTransition] = useTransition()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const map = formData.get('map')
        const side = formData.get('side')

        const options: GetRandomStrategyOptions = {
            map: map === "" ? null : map as Map,
            side: side === "" ? null : side as Side,
        }

        setTransition(async () => {
            await setLobbyOptions(options.map, options.side)
            ref.current?.click()
        })
    }

    return (
        <Popover>
            <PopoverTrigger ref={ref} asChild>
                <Button variant="outline" className="w-10 rounded-full p-0">
                    <Settings2 className="h-4 w-4" />
                    <span className="sr-only">Open popover</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Options</h4>
                        <p className="text-sm text-muted-foreground">
                            Set options for the lobby.
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="grid grid-cols-2 items-center gap-3">
                        <Select defaultValue={props.lobby?.map?.toString()} name="map">
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
                        <Select defaultValue={props.lobby?.side?.toString()} name="side">
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
                        <SubmitButton className="col-span-2">Save</SubmitButton>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    )
}