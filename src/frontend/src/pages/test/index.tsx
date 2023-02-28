import useYearSelection from "~/hooks/useYearSelection";

function M2NArray(m: number, n: number): number[] {
    return Array.from(Array(n-m).keys()).map(v => v + m);
}

export default function TestPage() {
    const years = useYearSelection(M2NArray(2000, 2024));

    return <div>
        <div className="px-2 py-1">
            <years.Component />
        </div>
        Your Selected Years are
        <div className="flex flex-col gap-5">
            {years.selected.map(y => <span key={y}>{y}</span>)}
        </div>
    </div>;
}
