export function M2NArray(m: number, n: number): number[] {
    return Array.from(Array(n-m+1).keys()).map(v => v + m);
}

export function Zero2NArray(length: number) {
    return M2NArray(0, length);
}
export function One2NArray(length: number){
    return M2NArray(1, length);
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getDayCountOfYear(year: number): number {
    // eslint-disable-next-line no-magic-numbers
    return (((year % 4) === 0 && (year % 100) > 0) || (year % 400) === 0) ? 366 : 365;
}

export function getCalenderWeek(date: Date): number {
    /* eslint-disable no-magic-numbers */
    const calcDate = new Date(date);
    const dayNum = calcDate.getUTCDay() || 7;
    calcDate.setUTCDate(calcDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(calcDate.getUTCFullYear(), 0, 1));
    return Math.ceil((((calcDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
