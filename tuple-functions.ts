import {GroupedTuple, Tuple} from "./types";
import {get360percentageValue, getBaseLog, getMapFromArray, getSumMap, toDecimals} from "./functions";

export const getTuples = (map: Record<string, number>, media: number): Tuple[] => {
    const percentageValue360 = get360percentageValue(map);
    let fa = 0;
    return Object.entries(map).map(([key, value]) => {
        fa += value;
        const tmp = {
            xi: Number(key),
            fi: value,
            fa,
            'xi*fi': Number(key) * value,
            'xi-media': Math.abs(Number(key) - media),
            '(xi-media)^2': 0,
            'fi*(xi-media)^2': 0,
            fg: percentageValue360[key],
            fr: toDecimals(Number(value) / getSumMap(map), 4),
            'fr%': toDecimals(Number(value) * 100 / getSumMap(map), 4)
        }

        tmp['(xi-media)^2'] = toDecimals((tmp['xi-media'] ** 2), 5);
        tmp['fi*(xi-media)^2'] = toDecimals(value * (tmp['(xi-media)^2']), 5);
        return tmp;
    })
}

function sumOfRange(min: number, max: number, map: Record<string, number>) {
    let sum = 0;
    for (let i = min; i <= max; i++) {
        sum += map[i] || 0;
    }
    return sum;
}

export function getGroupedDataFromArray(data: number[]) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const k = Math.round(3.3 * getBaseLog(10, data.length)) + 1;
    const interval = Math.round(range / k);

    const arr: GroupedTuple[] = [];
    for (let i = 0; (i * interval) + (min) < max + interval; i += 1) {
        const limiteInferior = (i * interval) + (min);
        const limiteSuperior = ((i + 1) * interval) + (min - 1);
        const frecuenciaAbsoluta = sumOfRange(limiteInferior, limiteSuperior, getMapFromArray(data));
        arr.push({
            limiteInferior,
            limiteSuperior,
            frecuenciaAbsoluta
        })
    }
    return arr;
}
