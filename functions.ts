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
    return toDecimals((sum / length), 5);
}

export function getBaseLog(x: number, y: number) {
    return Math.log(y) / Math.log(x);
}

export const getTipoCurtosis = (curtosis: number) => {
    if (curtosis === 0) return 'MESOCÚRTICA';
    if (curtosis > 0) return 'LEPTOCÚRTICA';
    return 'PLATICÚRTICA';
}

export const get360percentageValue = (map: Record<string, number>): Record<string, number> => {
    return Object.entries(map).reduce((acc: Record<string, number>, [key, value]) => {
        acc[`${key}`] = (Number(value) * 360 / getSumMap(map));
        return acc;
    }, {})
}

export function toDecimals(num: number, decimals: number) {
    const value = Number(1 + ''.padEnd(decimals, '0'));
    return Math.round(num * value) / value;
}
