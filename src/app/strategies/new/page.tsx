import { Map, Side } from "@prisma/client"
import { redirect } from "next/navigation"
import GenerateStrategyButton from "~/components/generate-strategy-button"
import { MapSelect } from "~/components/map-select"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select"
import { TypographyHeading } from "~/components/ui/typography"
import { prisma } from "~/server/db"

async function createStrategy(formData: FormData) {
    "use server"

    const maps = formData.getAll('maps') as Map[]
    await prisma.strategy.create({
        data: {
            title: formData.get('title')?.toString() ?? "",
            description: formData.get('description')?.toString() ?? "",
            maps: maps,
            side: formData.has('side') ? formData.get('side') as Side : null
        }
    })

    return redirect('/strategies')
}

async function generate() {
    "use server"
    console.log("generate")
}

export default async function AddStrategy() {
    return (
        <div className="container max-w-4xl">
            <div className="flex items-center justify-between">
                <TypographyHeading>Suggest strategy</TypographyHeading>
                <GenerateStrategyButton generate={generate} />
            </div>

            {/* @ts-ignore Server Action */}
            <form action={createStrategy}>
                <div className="mt-4">
                    <Label htmlFor="title">Title</Label>
                    <Input required className="mt-1" name="title" placeholder="Chicken" />
                </div>
                <div className="mt-4">
                    <Label htmlFor="description">Description</Label>
                    <Input required className="mt-1" name="description" placeholder="Kill all chickens before planting the bomb" />
                </div>


                <div className="mt-4 flex justify-between space-x-4">
                    <div>
                        <Label htmlFor="map">Map</Label>
                        <div className="mt-1">
                            <MapSelect />
                        </div>
                    </div>
                    <div className="w-full">
                        <Label htmlFor="map">Side</Label>
                        <div className="mt-1 w-full">
                            <Select required name="side">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a side" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="">Any side</SelectItem>
                                        <SelectItem value={Side.COUNTERTERRORISTS}>Counter-Terrorists</SelectItem>
                                        <SelectItem value={Side.TERRORISTS}>Terrorists</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <Button>Create</Button>
                </div>
            </form>
        </div >
    )
}