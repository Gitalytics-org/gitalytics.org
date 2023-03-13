import { useSearchParams } from "react-router-dom";

type useSelectedYearsReturnType = {
    selectedYears: number[],
    addSelectedYear: (year: number) => void,
    removeSelectedYear: (year: number) => void,
}

export function useSelectedYears(): useSelectedYearsReturnType {
    const [searchParams, setSearchParams] = useSearchParams();

    function setYears(years: number[]) {
        setSearchParams((prev) => {
            prev.delete("year");
            years.sort((a, b) => a-b)
                .forEach(y => prev.append("year", `${y}`));
            return prev;
        }, { replace: true });
    }

    const getYears = () => searchParams.getAll("year").map(y => parseInt(y));

    function addSelectedYear(year: number) {
        const newYears = getYears();
        newYears.push(year);
        setYears(getYears().concat(year));
    }

    function removeSelectedYear(year: number) {
        const newYears = getYears();
        newYears.splice(newYears.indexOf(year), 1);
        setYears(newYears);
    }

    return {
        selectedYears: getYears(),
        addSelectedYear,
        removeSelectedYear,
    };
}
