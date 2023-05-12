"use client"
import { Map, Strategy } from "@prisma/client"
import { ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { FormEvent, useState } from "react"
import { TypographyH2, TypographyP } from "./ui/typography"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type Props = {
    getRandomStrategy: (map: Map) => Promise<Strategy | null>
}

const maps = {
    [Map.MIRAGE]: 'Mirage',
    [Map.INFERNO]: 'Inferno',
    [Map.NUKE]: 'Nuke',
    [Map.ANCIENT]: 'Ancient',
    [Map.VERTIGO]: 'Vertigo',
    [Map.OVERPASS]: 'Overpass',
    [Map.ANUBIS]: 'Anubis',
    [Map.DUST2]: 'Dust2',
    [Map.TRAIN]: 'Train',
    [Map.CACHE]: 'Cache',
}

export default function StrategyCard({ getRandomStrategy }: Props) {
    const { toast } = useToast()

    const [strategy, setStrategy] = useState<Strategy | null>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get("map"));
        const result = await getRandomStrategy(formData.get("map") as Map);
        setStrategy(result);
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="mt-4 flex justify-between space-x-4">
                        <Select name="map">    
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a map" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.keys(Map).map(m => <SelectItem value={m} key={m}>{maps[m as Map]}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button>New strategy</Button>
                    </div> 
            <div className="mt-5">  
                    <TypographyH2>{strategy?.title ?? 'No strategy found'}</TypographyH2>
                    <TypographyP>{strategy?.description}</TypographyP>
                </div>                
        </form>
    )
}