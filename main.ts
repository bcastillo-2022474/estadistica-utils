import {
    getArrayAndRecordData, getBaseLog,
    getKeyTimesFrequency, getMapFromArray,
    getModa,
    getSortedData,
    getSumMap,
    getTipoCurtosis,
    getVarianza, toDecimals
} from "./functions";
import {GroupedTuple, isGroupedTupleArray, State} from "./types";
import {getGroupedDataFromArray, getTuples} from "./tuple-functions";

function groupedTable(data: GroupedTuple[] | number[]) {
    if (isGroupedTupleArray(data)) {
        const map = (data).reduce((obj: Record<string, number>, {
            limiteInferior,
            limiteSuperior,
            frecuenciaAbsoluta
        }) => {
            obj[`${(limiteInferior + limiteSuperior) / 2}`] = frecuenciaAbsoluta;
            return obj;
        }, {});
        simpleTable(map);
        return
    }
    groupedTable(getGroupedDataFromArray(data));
}

function simpleTable(data: number[] | Record<string, number>) {
    const [arr, map] = getArrayAndRecordData(data);

    const {length} = arr;
    const sortedData = getSortedData(arr);
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min;
    const moda = getModa(map);
    const media = toDecimals(getSumMap(getKeyTimesFrequency(map)) / length, 3);
    const mediana = sortedData[Math.round(length / 2) - 1]

    const tuples = getTuples(map, media)
    const varianza = getVarianza(tuples, length);
    const desviacionEstandar = toDecimals(Math.sqrt(varianza), 4);
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
        'coeficiente-variacion': toDecimals((desviacionEstandar / media * 100), 4),
        'rango-68%': [toDecimals(media - desviacionEstandar, 4), toDecimals(media + desviacionEstandar, 4)],
        'rango-95%': [toDecimals(media - (desviacionEstandar * 2), 4), toDecimals(media + (desviacionEstandar * 2), 4)],
        'rango-99%': [toDecimals(media - (desviacionEstandar * 3), 4), toDecimals(media + (desviacionEstandar * 3), 4)],
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

// simpleTable([77, 75, 79, 78, 75, 79, 77, 79, 76, 77, 78, 76, 77, 78, 79, 79, 77, 77, 78, 77, 77, 79, 76, 78, 76])
simpleTable({
    1005: 18,
    1008: 27,
    1011: 33,
    1014: 48,
    1017: 33,
    1020: 9,
})

simpleTable({
    30: 1,
    33: 10,
    35: 7,
    36: 4,
    38: 3,
})


groupedTable([
    27, 23, 22, 24, 24, 30,
    25, 23, 22, 15, 17, 18,
    29, 28, 27, 27, 23, 19,
    26, 30, 25, 29, 24, 30,
    20, 23, 24, 30, 22, 25,
])

// groupedTable([
//     {
//         limiteInferior: 15,
//         limiteSuperior: 17,
//         frecuenciaAbsoluta: 0
//     },
//     {
//         limiteInferior: 18,
//         limiteSuperior: 20,
//         frecuenciaAbsoluta: 0
//     },
//     {
//         limiteInferior: 21,
//         limiteSuperior: 23,
//         frecuenciaAbsoluta: 0
//     },
//     {
//         limiteInferior: 24,
//         limiteSuperior: 26,
//         frecuenciaAbsoluta: 0
//     },
//     {
//         limiteInferior: 27,
//         limiteSuperior: 29,
//         frecuenciaAbsoluta: 0
//     },
//     {
//         limiteInferior: 30,
//         limiteSuperior: 32,
//         frecuenciaAbsoluta: 0
//     }
// ])
