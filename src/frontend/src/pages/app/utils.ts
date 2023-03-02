export function M2NArray(m: number, n: number): number[] {
    return Array.from(Array(n-m+1).keys()).map(v => v + m);
}

export const Zero2NArray = (length: number) => M2NArray(0, length);
export const One2NArray = (length: number) => M2NArray(1, length);
