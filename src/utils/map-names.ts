import { Map } from "@prisma/client";

export const maps = {
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
} as const