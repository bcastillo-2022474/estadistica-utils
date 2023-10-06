import {Tuple} from "./types";

export const getSortedData = (data: number[]) => [...data].sort((a, b) => a - b);

export const getMapFromArray = (data: number[]): Record<string, number> => {
    const map: Record<string, number> = {}
    data.forEach(num => {
        map[`${num}`] = (map[`${num}`] || 0) + 1;
    })
    return map;
}

export const getArrayFromMap = (map: Record<string, number>): number[] => {
    const array: number[] = [];
    Object.entries(map).forEach(([key, value]) => {
        for (let i = 0; i < value; i++) {
            array.push(Number(key));
        }
    })
    return array;
}

export const getKeyTimesFrequency = (map: Record<string, number>): Record<string, number> => {
    return Object.entries(map).reduce((acc: Record<string, number>, [key, value]) => {
        acc[`${key}`] = Number(key) * value;
        return acc;
    }, {})
}
export const getModa = (map: Record<string, number>) => {
    // more frequent number
    const mostFrequentNumber = Math.max(...Object.values(map));

    const modas = Object.entries(map).filter(([key, value]) => value === mostFrequentNumber).map(([key, value]) => Number(key));
    return {modas, mostFrequentNumber};
}

export const getArrayAndRecordData = (data: number[] | Record<string, number>): [number[], Record<string, number>] => {
    if (Array.isArray(data)) {
        return [data as number[], getMapFromArray(data)];
    }
    return [getArrayFromMap(data), data];

}


export const getSumMap = (map: Record<string, number>): number => Object.values(map).reduce((acc, curr) => acc + curr);

export const getVarianza = (tuples: Tuple[], length: number): number => {
    const sum = tuples.reduce((acc, curr) => acc + curr['fi*(xi-media)^2'], 0)
    return Math.round((sum / length) * 100000) / 100000;
}

export const getTipoCurtosis = (curtosis: number) => {
    if (curtosis === 0) return 'MESOCURTICA';
    if (curtosis > 0) return 'LEPTOCURTICA';
    if (curtosis < 0) return 'PLATICURTICA';
}

export const get360percentageValue = (map: Record<string, number>): Record<string, number> => {
    return Object.entries(map).reduce((acc: Record<string, number>, [key, value]) => {
        acc[`${key}`] = (Number(value) * 360 / getSumMap(map));
        return acc;
    }, {})
}
