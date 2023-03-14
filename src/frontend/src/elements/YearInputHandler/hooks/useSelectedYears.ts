import { useSearchParams } from "react-router-dom";
import { useAvailableYears } from "./useAvailableYears";

type useSelectedYearsReturnType = {
    availableYears: number[],
    selectedYears: number[],
    addSelectedYear: (year: number) => void,
    removeSelectedYear: (year: number) => void,
}

export function useSelectedYears(): useSelectedYearsReturnType {
    const [searchParams, setSearchParams] = useSearchParams();
    const availableYears = useAvailableYears();

    const setYears = (years: number[]) => {
        setSearchParams((prev) => {
            prev.delete("year");
            years.sort((a, b) => a-b)
                .forEach(y => prev.append("year", `${y}`));
            return prev;
        }, { replace: true });
    };

    const selectedYears = searchParams.getAll("year").map(y => parseInt(y));

    const addSelectedYear = (year: number) => {
        if (!selectedYears.includes(year)) {
            setYears(selectedYears.concat(year));
        }
    };

    const removeSelectedYear = (year: number) => setYears(selectedYears.splice(selectedYears.indexOf(year), 1));

    return {
        availableYears: availableYears.filter(y => !selectedYears.includes(y)),
        selectedYears,
        addSelectedYear,
        removeSelectedYear,
    };
}
