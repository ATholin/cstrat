"use client"
import { Strategy, Map } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import like from "~/api/like"
import LikeStrategy from "~/components/like-strategy-button"
import { maps } from "~/utils/map-names"

export const columns: ColumnDef<Strategy>[] = [
    {
        accessorKey: "title",
        header: "Strategy",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "maps",
        header: "Map",
        cell: ({ row }) => {
            return row.getValue<string[]>('maps').map((m) => maps[m as Map]).join(', ')
        }
    },
    {
        accessorKey: "side",
        header: "Side",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <LikeStrategy id={row.original.id} like={like} />
            )
        }
    },
]
