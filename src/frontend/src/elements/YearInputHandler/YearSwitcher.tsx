import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function getCurrentYear() {
    return new Date().getFullYear();
}

function useYearManipulation(): [number, (y: number) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    function setYear(year: number) {
        setSearchParams((prev) => {
            prev.set("year", `${year}`);
            return prev;
        }, { replace: true });
    }

    const years = searchParams.getAll("year");
    const year = years.length ? parseInt(years.at(-1) as string) : getCurrentYear();

    useEffect(() => {
        if (years.length > 1) {
            setYear(year);
        }
    });

    return [year, setYear];
}

const STARTING_YEAR = 2000;


export default function YearSwitcherInput() {
    const [year, setYear] = useYearManipulation();

    const hasPrevYear = year > STARTING_YEAR;
    const hasNextYear = year < getCurrentYear();

    return <div className="flex gap-5 select-none justify-evenly">
        <button className="w-5 grow" onClick={() => setYear(year - 1)} style={{visibility: hasPrevYear ? "visible" : "hidden"}}>&lt;</button>
        <span>{year}</span>
        <button className="w-5 grow" onClick={() => setYear(year + 1)} style={{visibility: hasNextYear ? "visible" : "hidden"}}>&gt;</button>
    </div>;
}
