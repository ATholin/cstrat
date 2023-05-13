"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "~/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { Map } from "@prisma/client"

export function MapSelect() {
    const [open, setOpen] = React.useState(false)
    const [maps, setMaps] = React.useState<Set<Map>>(new Set())

    const mapArray = [...maps]

    return (
        <>
            {mapArray.map(m => (
                <input key={m} type="hidden" hidden name="maps" value={m} />
            ))}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[400px] justify-between"
                    >
                        {mapArray.length === 0 && 'Select maps...'}
                        {mapArray.length === 1 && mapArray[0]}
                        {mapArray.length > 1 && `${mapArray.length} maps`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search map..." />
                        <CommandEmpty>No maps found.</CommandEmpty>
                        <CommandGroup>
                            {Object.keys(Map).map((map) => (
                                <CommandItem
                                    key={map}
                                    onSelect={(currentValue) => {
                                        const cvm = currentValue.toUpperCase() as Map
                                        setMaps(p => {
                                            if (p.has(cvm))
                                                p.delete(cvm)
                                            else
                                                p.add(cvm)

                                            return new Set([...p])
                                        })
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            maps.has(map as Map) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {map}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}
