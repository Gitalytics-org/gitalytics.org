import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function getCurrentYear() {
    return new Date().getFullYear();
}

const LAST = -1;
const ONE = 1;

function useYearManipulation(): [number, (y: number) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    function setYear(year: number) {
        setSearchParams((prev) => {
            prev.set("year", `${year}`);
            return prev;
        }, { replace: false });
    }

    const years = searchParams.getAll("year");
    const year = years.length ? parseInt(years.at(LAST)!) : getCurrentYear();

    useEffect(() => {
        if (years.length > ONE) {
            setYear(year);
        }
    });

    return [year, setYear];
}

const STARTING_YEAR = 2000;


export default function YearSwitcherInput() {
    const [year, setYear] = useYearManipulation();

    return <div className="flex select-none justify-evenly gap-5">
        <button className="w-5 grow" onClick={() => setYear(year - ONE)} style={{visibility: year > STARTING_YEAR ? "visible" : "hidden"}}>&lt;</button>
        <span>{year}</span>
        <button className="w-5 grow" onClick={() => setYear(year + ONE)} style={{visibility: year < getCurrentYear() ? "visible" : "hidden"}}>&gt;</button>
    </div>;
}
