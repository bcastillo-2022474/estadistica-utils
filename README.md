# README Estadística Utils CLI

Este repositorio contiene código TypeScript para realizar análisis estadísticos en datos numéricos. El código incluye
funciones para varios cálculos estadísticos y utiliza la interfaz `State` para representar el estado de los datos y sus
propiedades estadísticas asociadas.

## Interfaz State

La interfaz `State` define la estructura de los datos y sus propiedades estadísticas asociadas. Aquí hay una explicación
de cada propiedad en la interfaz `State`:

- `arr`: Un array de números que representa el conjunto de datos.
- `map`: Un registro (objeto) que asigna cada número único en el conjunto de datos a su frecuencia.
- `max`: El valor máximo en el conjunto de datos.
- `min`: El valor mínimo en el conjunto de datos.
- `range`: El rango de valores en el conjunto de datos (la diferencia entre el máximo y el mínimo).
- `tuples`: Un array de objetos `Tuple` que representa la distribución de frecuencias.
- `sortedData`: Un array de números que representa el conjunto de datos ordenado.
- `quartiles`: Un objeto que contiene los valores de los cuartiles (Q1, Q2, Q3 y Q4).
- `percentiles`: Un objeto que contiene los valores percentiles (P10 y P90).
- `length`: El número de puntos de datos en el conjunto (n).
- `media`: El valor medio (promedio) del conjunto de datos.
- `moda`: Un objeto que contiene la(s) moda(s) y el número más frecuente.
- `mediana`: El valor mediano del conjunto de datos.
- `varianza`: La varianza del conjunto de datos.
- `desviacion-estandar`: La desviación estándar del conjunto de datos.
- `coeficiente-variacion`: El coeficiente de variación.
- `sesgo`: La asimetría (sesgo) del conjunto de datos.
- `curtosis`: La curtosis del conjunto de datos.
- `rango-68%`: El intervalo de confianza del 68%.
- `rango-95%`: El intervalo de confianza del 95%.
- `rango-99%`: El intervalo de confianza del 99%.
- `tipo-sesgo`: El tipo de asimetría, ya sea "POSITIVO" o "NEGATIVO".
- `tipo-curtosis`: El tipo de curtosis, ya sea "LEPTOCÚRTICA," "MESOCÚRTICA," o "PLATICÚRTICA."

## Explicación del Código

El código incluye un conjunto de funciones para cálculos estadísticos:

- `getSortedData(data: number[]): number[]`: Devuelve un array ordenado de los datos de entrada.
- `getMapFromArray(data: number[]): Record<string, number>`: Convierte un array de números en un mapa de frecuencias.
- `getArrayFromMap(map: Record<string, number>): number[]`: Convierte un mapa de frecuencias de nuevo en un array de
  números.
- `getKeyTimesFrequency(map: Record<string, number>): Record<string, number>`: Devuelve un mapa donde cada clave se
  multiplica por su frecuencia.
- `getModa(map: Record<string, number>): { modas: number[], mostFrequentNumber: number }`: Calcula la(s) moda(s) y el
  número más frecuente.
- `getArrayAndRecordData(data: number[] | Record<string, number>): [number[], Record<string, number>]`: Separa los datos
  de entrada en un array y un mapa de frecuencias.
- `getSumMap(map: Record<string, number>): number`: Calcula la suma de los valores en un mapa de frecuencias.
- `getVarianza(tuples: Tuple[], length: number): number`: Calcula la varianza.
- `getTipoCurtosis(curtosis: number)`: Determina el tipo de curtosis.
- `get360percentageValue(map: Record<string, number>): Record<string, number>`: Convierte las frecuencias en
  porcentajes.

Además, hay una función llamada `getTuples` que genera objetos `Tuple` para cada valor único en el conjunto de datos.

La función `main` es el punto de entrada del script y muestra cómo se utilizan estas funciones para realizar análisis
estadísticos en un conjunto de datos. Puede llamar a la función `main` con su propio conjunto de datos para calcular y
mostrar diversas propiedades estadísticas.

## Formulas

En este documento, se presentan una serie de fórmulas utilizadas en el código para realizar cálculos estadísticos. Estas
fórmulas se aplican a conjuntos de datos numéricos y ayudan a comprender sus propiedades estadísticas.

Aquí hay una lista de las fórmulas utilizadas en el código:

### Cálculo del número de datos (n)

Número de datos, length. El número de datos en un conjunto se representa como `n` y se calcula utilizando la longitud
del conjunto.

```typescript
const n = length;
``` 

### Cálculo de Cuartiles

Los cuartiles dividen un conjunto de datos en cuatro partes iguales. Se pueden calcular utilizando la siguiente fórmula,
donde `k` representa el cuartil que se desea calcular (1, 2, 3 o 4) y `n` es el número de datos. `k*n/4`

```typescript
const cuartil = (k: number, n: number) => (k * n) / 4;
```

```typescript
const quartiles = {
    Q1: sortedData[Math.round((length * 1) / 4) - 1],
    Q2: sortedData[Math.round((length * 2) / 4) - 1],
    Q3: sortedData[Math.round((length * 3) / 4) - 1],
    Q4: sortedData[Math.round((length * 4) / 4) - 1]
};
```

### Cálculo de Percentiles

Los percentiles representan la posición relativa de un valor en un conjunto de datos. Se pueden calcular de manera
similar a los cuartiles, donde `k` representa el percentil que se desea calcular (por lo general 10 y 90) y `n` es el
número de datos.
`k*n/100`

```typescript
const percentil = (k: number, n: number) => (k * n) / 100;
```

```typescript
const percentiles = {
    P10: sortedData[Math.round((length * 10) / 100) - 1],
    P90: sortedData[Math.round((length * 90) / 100) - 1]
};
```

### Cálculo de la Media

La media (promedio) se calcula sumando el producto de cada valor por su frecuencia y dividiéndolo por el número total de
datos.
`Σfi*xi / n` en donde fi es la frecuencia de cada valor y xi es el valor.
`Σ(key * frequency) / length`

```typescript
const media = Math.round((getSumMap(getKeyTimesFrequency(map)) / length) * 100) / 100;
```

### Cálculo de la Moda

La moda representa el valor más frecuente en un conjunto de datos y se calcula identificando el valor con la frecuencia
más alta.

```typescript
const moda = getModa({'12': 3, '14': 2, '16': 6, '18': 4, '20': 6});
console.log(moda); // {modas: [16, 20], mostFrequentNumber: 6}
```

### Cálculo de la Mediana

La mediana es el valor que se encuentra en el centro de un conjunto de datos ordenado. Es el valor que se encuentra en
la mitad de los datos ordenados.

```typescript
const pos = length / 2
table.getByPosition(pos); 
```

```typescript
const mediana = sortedData[Math.round(n / 2) - 1];
```

### Cálculo de la Varianza

La varianza mide la dispersión de los datos y se calcula utilizando la fórmula:
`(Σfi*((xi - media)^2)) / n` en donde `fi` es la frecuencia de cada valor, `xi` es el valor, `n` la cantidad de
datos, `media`
es la media.

```typescript
const varianza = Math.round((getSumMap(getKeyTimesFrequency(map)) / n) * 100) / 100;
```

### Cálculo de la Desviación Estándar

La desviación estándar es la raíz cuadrada de la varianza.`√varianza`

### Cálculo del Coeficiente de Variación

El coeficiente de variación mide la relación entre la desviación estándar y la media.
`desviacion-estandar / media`

```typescript
const data = {'coeficiente-variacion': (Math.round(((desviacionEstandar / media) * 100) * 10000) / 10000)}
```

### Cálculo del Sesgo

El sesgo mide la asimetría en la distribución de los datos.
`(Q3 - (2 * Q2) + Q1) / (Q3 - Q1)`

```typescript
const sesgo = (quartiles['Q3'] - (2 * quartiles['Q2']) + quartiles['Q1']) / (quartiles['Q3'] - quartiles['Q1'])
```

### Cálculo de la Curtosis

La curtosis mide la forma de la distribución de los datos. `(Q3 - Q1) / (2 * (Q3 - Q2) + (P90 - P10))`

```typescript
const curtosis = (quartiles['Q3'] - quartiles['Q1']) / (2 * (percentiles['P90'] - percentiles['P10']))
```

### Tipo de Curtosis

El tipo de curtosis se clasifica en "LEPTOCÚRTICA" (si es mayor a 0), "PLATICÚRTICA" (si es menor a 0) o "MESOCÚRTICA"
(si es igual a 0).

```typescript
const getTipoCurtosis = (curtosis: number) => {
    if (curtosis === 0) return 'MESOCÚRTICA';
    if (curtosis > 0) return 'LEPTOCÚRTICA';
    if (curtosis < 0) return 'PLATICÚRTICA';
}
```

### Tipo de Sesgo

El tipo de sesgo se clasifica en "POSITIVO" (si es mayor a 0), "NEGATIVO" (si es menor a 0) o "SIMÉTRICO" (si es igual a
0).

### Cálculo del Rango

El rango representa la diferencia entre el valor máximo y el valor mínimo en un conjunto de datos.

```typescript
const rango = max - min;
```

### Regla del 68, 95 y 99.7

Se pueden calcular intervalos de confianza del 68%, 95% y 99.7% utilizando el valor medio y la desviación estándar.

```typescript
const medidasDeTendenciaCentral = {
    'rango-68%':
        [media - desviacionEstandar, media + desviacionEstandar],
    'rango-95%':
        [media - (desviacionEstandar * 2), media + (desviacionEstandar * 2)],
    'rango-99%':
        [media - (desviacionEstandar * 3), media + (desviacionEstandar * 3)],
}
```

### Datos Agrupados

Cuando trabajamos con datos agrupados lo único que debemos hacer es encontrar los intervalos, límites inferiores y
superiores, después de eso podemos sacar xi, teniendo xi, podemos trabajarlo como si de datos simples se tratara

```typescript
function getGroupedDataFromArray(data: number[]) {
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
```

```typescript
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
```

## Uso

Para utilizar este código, siga estos pasos:

1. Asegúrese de tener Node.js instalado en su computadora.

2. Clone este repositorio o descargue el código.

3. Modifique la función `main` al final del script para proporcionar su propio conjunto de datos. Puede pasar un array
   de números o un registro con datos de frecuencia.

4. Ejecute el script usando el comando `npx tsx main.ts`, tambien puede instalar primero tsx con `npm i -g tsx` y luego correr `tsx main.ts`, porfavor intente usar la ultima version de node si no le funciona.

5. El script mostrará resultados estadísticos y propiedades de su conjunto de datos en la consola.
   Actualmente hay algunos datos de ejemplo en main.ts por lo que si corre solo asi el programa deberia poder ver un ejemplo de como se vera la data

Siéntase libre de personalizar y ampliar este código para adaptarlo a sus necesidades específicas de análisis
estadístico.
