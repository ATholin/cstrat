"use client"
import { Map, Side, Strategy } from "@prisma/client"
import { ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { FormEvent, useState } from "react"
import { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyP } from "./ui/typography"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { maps } from "~/utils/map-names"
import { sides } from "~/utils/side-names"
import { GetRandomStrategy, GetRandomStrategyOptions } from "~/api/getRandomStrategy"
import Balancer from 'react-wrap-balancer'

type Props = {
    getRandomStrategy: typeof GetRandomStrategy,
    initialStrategy: Strategy | null
}

export default function StrategyCard({ getRandomStrategy, initialStrategy }: Props) {
    const { toast } = useToast()
    const [strategy, setStrategy] = useState<Strategy | null>(initialStrategy);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const map = formData.get('map')
        const side = formData.get('side')
        
        const options: GetRandomStrategyOptions = {
            map: map === "" ? undefined : map as Map,
            side: side === "" ? undefined : side as Side,
        }

        const result = await getRandomStrategy(options);
        setStrategy(result);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="container max-w-lg mt-4 flex justify-between space-x-4">
                        <Select name="map">    
                            <SelectTrigger className="w-[180px]">
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
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Side" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="">Any</SelectItem>
                                    {Object.keys(Side).map(s => <SelectItem value={s} key={s}>{sides[s as Side]}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button>New strategy</Button>
                    </div> 
            <div className="mt-8">
                    <TypographyH1 className="text-center"><Balancer>{strategy?.title ?? 'No strategy found'}</Balancer></TypographyH1>
                    <TypographyLead className="text-center mt-4"><Balancer>{strategy?.description}</Balancer></TypographyLead>
                </div>                
        </form>
    )
}