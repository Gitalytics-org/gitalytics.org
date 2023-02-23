export function OneToNArray(length: number): number[] {
    return Array.from(Array(length).keys());
}


export function DateAdd(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return new Date(date.toDateString());
}

const FIRST_HALF = 0;
export function toDateString(date: Date): string {
    return date.toISOString().split("T")[FIRST_HALF];
}
