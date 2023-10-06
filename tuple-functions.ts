import {Tuple} from "./types";
import {get360percentageValue} from "./functions";

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
            fr: percentageValue360[key],
        }

        tmp['(xi-media)^2'] = Math.round((tmp['xi-media'] ** 2) * 1000) / 1000;
        tmp['fi*(xi-media)^2'] = value * (tmp['(xi-media)^2']);
        return tmp;
    })
}
