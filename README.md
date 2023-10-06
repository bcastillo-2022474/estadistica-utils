¡Por supuesto! A continuación, se encuentra un README que explica la interfaz `State` y el código en general en español.

# README del Código de Análisis Estadístico

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
- `tipo-curtosis`: El tipo de curtosis, ya sea "LEPTOCURTICA," "MESOCURTICA," o "PLATICURTICA."

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

## Fórmulas Utilizadas

En este documento, se presentan una serie de fórmulas utilizadas en el código para realizar cálculos estadísticos. Estas
fórmulas se aplican a conjuntos de datos numéricos y ayudan a comprender sus propiedades estadísticas.

### Cálculo del número de datos (n)

El número de datos en un conjunto se representa como "n" y se calcula utilizando la longitud del conjunto.

```typescript
const n = length;
```

### Cálculo de Cuartiles

Los cuartiles dividen un conjunto de datos en cuatro partes iguales. Se pueden calcular utilizando la siguiente fórmula,
donde "k" representa el cuartil que se desea calcular (1, 2, 3 o 4) y "n" es el número de datos.

```typescript
const cuartil = (k: number, n: number) => (k * n) / 4;
```

### Cálculo de Percentiles

Los percentiles representan la posición relativa de un valor en un conjunto de datos. Se pueden calcular de manera
similar a los cuartiles, donde "k" representa el percentil que se desea calcular (10, 90) y "n" es el número de datos.

```typescript
const percentil = (k: number, n: number) => (k * n) / 100;
```

### Cálculo de la Media

La media (promedio) se calcula sumando el producto de cada valor por su frecuencia y dividiéndolo por el número total de
datos.

```typescript
const media = Math.round((getSumMap(getKeyTimesFrequency(map)) / n) * 100) / 100;
```

### Cálculo de la Moda

La moda representa el valor más frecuente en un conjunto de datos y se calcula identificando el valor con la frecuencia
más alta.

```typescript
const moda = getModa({'12': 3, '14': 2, '16': 6, '18': 4, '20': 6});
console.log(moda); // {modas: [16, 20], mostFrequentNumber: 6}
```

### Cálculo de la Mediana

La mediana es el valor que se encuentra en el centro de un conjunto de datos ordenado.

```typescript
const mediana = sortedData[Math.round(n / 2) - 1];
```

### Cálculo de la Varianza

La varianza mide la dispersión de los datos y se calcula utilizando la fórmula:

```typescript
const varianza = Math.round((getSumMap(getKeyTimesFrequency(map)) / n) * 100) / 100;
```

### Cálculo de la Desviación Estándar

La desviación estándar es la raíz cuadrada de la varianza.

```typescript
const desviacionEstandar = Math.sqrt(varianza);
```

### Cálculo del Coeficiente de Variación

El coeficiente de variación mide la relación entre la desviación estándar y la media.

```typescript

const data = {'coeficiente-variacion': (Math.round(((desviacionEstandar / media) * 100) * 10000) / 10000)}
```

### Cálculo del Sesgo

El sesgo mide la asimetría en la distribución de los datos.

```typescript
const sesgo = (quartiles['Q3'] - (2 * quartiles['Q2']) + quartiles['Q1']) / (quartiles['Q3'] - quartiles['Q1'])
```

### Cálculo de la Curtosis

La curtosis mide la forma de la distribución de los datos.

```typescript
const curtosis = (quartiles['Q3'] - quartiles['Q1']) / (2 * (percentiles['P90'] - percentiles['P10']))
```

### Tipo de Curtosis

El tipo de curtosis se clasifica en "LEPTOCURTICA" (si es mayor a 0), "PLATICURTICA" (si es menor a 0) o "MESOCURTICA" (
si es igual a 0).

```typescript
const getTipoCurtosis = (curtosis: number) => {
    if (curtosis === 0) return 'MESOCURTICA';
    if (curtosis > 0) return 'LEPTOCURTICA';
    if (curtosis < 0) return 'PLATICURTICA';
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

Estas fórmulas y cálculos son fundamentales para realizar análisis estadísticos en conjuntos de datos numéricos y ayudan
a comprender diversas propiedades estadísticas de los datos.

## Uso

Para utilizar este código, siga estos pasos:

1. Asegúrese de tener Node.js instalado en su computadora.

2. Clone este repositorio o descargue el código.

3. Modifique la función `main` al final del script para proporcionar su propio conjunto de datos. Puede pasar un array
   de números o un registro con datos de frecuencia.

4. Ejecute el script usando el comando `node script.js`, reemplazando `script.js` por el nombre de su archivo
   TypeScript.

5. El script mostrará resultados estadísticos y propiedades de su conjunto de datos en la consola.

Siéntase libre de personalizar y ampliar este código para adaptarlo a sus necesidades específicas de análisis
estadístico.
