import {
    getArrayAndRecordData,
    getKeyTimesFrequency,
    getModa,
    getSortedData,
    getSumMap,
    getTipoCurtosis,
    getVarianza
} from "./functions";
import {State} from "./types";
import {getTuples} from "./tuple-functions";


function main(data: number[] | Record<string, number>) {
    const [arr, map] = getArrayAndRecordData(data);

    const {length} = arr;
    const sortedData = getSortedData(arr);
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min;
    const moda = getModa(map);
    const media = Math.round((getSumMap(getKeyTimesFrequency(map)) / length) * 100) / 100;
    const mediana = sortedData[Math.round(length / 2) - 1]

    const tuples = getTuples(map, media)
    const varianza = getVarianza(tuples, length);
    const desviacionEstandar = Math.round(Math.sqrt(varianza) * 10000) / 10000;
    const quartiles = {
        Q1: sortedData[Math.round((length * 1) / 4) - 1],
        Q2: sortedData[Math.round((length * 2) / 4) - 1],
        Q3: sortedData[Math.round((length * 3) / 4) - 1],
        Q4: sortedData[Math.round((length * 4) / 4) - 1]
    }

    const percentiles = {
        P10: sortedData[Math.round((length * 10) / 100) - 1],
        P90: sortedData[Math.round((length * 90) / 100) - 1]
    };

    const sesgo = (quartiles['Q3'] - (2 * quartiles['Q2']) + quartiles['Q1']) / (quartiles['Q3'] - quartiles['Q1'])
    const curtosis = (quartiles['Q3'] - quartiles['Q1']) / (2 * (percentiles['P90'] - percentiles['P10']))

    const state: State = {
        arr,
        sortedData,
        map,
        max,
        min,
        length,
        range,
        moda,
        media,
        mediana,
        tuples,
        varianza,
        'desviacion-estandar': desviacionEstandar,
        'coeficiente-variacion': Math.round(((desviacionEstandar / media) * 100) * 10000) / 10000,
        'rango-68%': [media - desviacionEstandar, media + desviacionEstandar],
        'rango-95%': [media - (desviacionEstandar * 2), media + (desviacionEstandar * 2)],
        'rango-99%': [media - (desviacionEstandar * 3), media + (desviacionEstandar * 3)],
        percentiles,
        quartiles,
        sesgo,
        curtosis,
        'tipo-sesgo': sesgo > 0 ? 'POSITIVO' : 'NEGATIVO',
        'tipo-curtosis': getTipoCurtosis(curtosis),
    }
    console.table(state.tuples);
    console.log({max, min, range, length})
    console.log({moda, media, mediana})
    console.log({quartiles, percentiles})
    console.log({varianza, desviacionEstandar, coeficienteVariacion: state['coeficiente-variacion']})
    console.log({sesgo, curtosis, tipoSesgo: state['tipo-sesgo'], tipoCurtosis: state['tipo-curtosis']})
    console.log({rango68: state['rango-68%'], rango95: state['rango-95%'], rango99: state['rango-99%']})
}

// main([77, 75, 79, 78, 75, 79, 77, 79, 76, 77, 78, 76, 77, 78, 79, 79, 77, 77, 78, 77, 77, 79, 76, 78, 76])
main({
    1005: 18,
    1008: 27,
    1011: 33,
    1014: 48,
    1017: 33,
    1020: 9,
})

main({
    30: 1,
    33: 10,
    35: 7,
    36: 4,
    38: 3,
})
