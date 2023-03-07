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

export function getDayCountOfYear(year: number) {
    // eslint-disable-next-line no-magic-numbers
    return (((year % 4) === 0 && (year % 100) > 0) || (year % 400) === 0) ? 366 : 365;
}

export function getWeekOfYearNumber(date: Date){
    /* eslint-disable no-magic-numbers */
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
