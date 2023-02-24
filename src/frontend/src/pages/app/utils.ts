export function ZeroToNArray(length: number): number[] {
    return Array.from(Array(length).keys());
}

const OFFSET1 = 1;
export function OneToNArray(length: number): number[] {
    return Array.from(Array(length + OFFSET1).keys()).slice(OFFSET1);
}
