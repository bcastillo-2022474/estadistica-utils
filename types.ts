export type State = {
    arr: number[],
    map: Record<string, number>,
    max: number,
    min: number,
    range: number,
    tuples: Tuple[],
    sortedData: number[],
    quartiles: { Q1: number, Q2: number, Q3: number, Q4: number }
    percentiles: { P10: number, P90: number }
    length: number, // n
    media: number,
    moda: { modas: number[], mostFrequentNumber: number },
    mediana: number,
    varianza: number,
    'desviacion-estandar': number,
    'coeficiente-variacion': number,
    sesgo: number,
    curtosis: number,
    'rango-68%': [number, number],
    'rango-95%': [number, number],
    'rango-99%': [number, number],
    'tipo-sesgo': 'POSITIVO' | 'NEGATIVO',
    'tipo-curtosis': 'LEPTOCÚRTICA' | 'MESOCÚRTICA' | 'PLATICÚRTICA',
}

export type Tuple = {
    fi: number,
    xi: number,
    'xi*fi': number,
    'xi-media': number,
    '(xi-media)^2': number,
    'fi*(xi-media)^2': number,
    fg: number;
    fr: number;
    'fr%': number;
}

export type GroupedTuple = { limiteInferior: number, limiteSuperior: number, frecuenciaAbsoluta: number }

export function isGroupedTupleArray(arr: any[]): arr is GroupedTuple[] {
    if (arr.length === 0) return true;
    const [data] = arr
    if (Object.keys(data).length !== 3) return false;
    return Object.keys(data).every(key => key === 'limiteInferior' || key === 'limiteSuperior' || key === 'frecuenciaAbsoluta')
}


