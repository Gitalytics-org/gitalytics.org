import { useSearchParams } from "react-router-dom";


function getCurrentYear() {
    return new Date().getFullYear();
}

const LAST = -1;


function useYearManipulation(): [number, (y: number) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    function setYear(year: number) {
        setSearchParams((prev) => {
            prev.set("year", `${year}`);
            return prev;
        });
    }

    const years = searchParams.getAll("year");
    const year = years.length ? parseInt(years.at(LAST)!) : getCurrentYear();

    return [year, setYear];
}

const ONE = 1;
const STARTING_YEAR = 2000;


export default function YearSwitcher() {
    const [year, setYear] = useYearManipulation();

    return <div className="flex select-none justify-evenly gap-5">
        <button className="w-5" onClick={() => setYear(year - ONE)} style={{visibility: year > STARTING_YEAR ? "visible" : "hidden"}}>&lt;</button>
        <span>{year}</span>
        <button className="w-5" onClick={() => setYear(year + ONE)} style={{visibility: year < getCurrentYear() ? "visible" : "hidden"}}>&gt;</button>
    </div>;
}
