import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAvailableYears } from "./useAvailableYears";


function getCurrentYear() {
    return new Date().getFullYear();
}

type useSelectedYearReturnType = {
    selectedYear: number,
    hasNextYear: boolean,
    hasPreviousYear: boolean,
    incrementYear: () => void,
    decrementYear: () => void,
};

export function useSelectedYear(): useSelectedYearReturnType {
    const [searchParams, setSearchParams] = useSearchParams();
    const availableYears = useAvailableYears();

    function setYear(year: number) {
        setSearchParams((prev) => {
            prev.set("year", `${year}`);
            return prev;
        }, { replace: true });
    }

    const years = searchParams.getAll("year");
    const year = years.length > 0 ? parseInt(years.at(-1) as string) : getCurrentYear();

    useEffect(() => {
        if (years.length > 1) {
            setYear(year);
        }
    });

    const hasNextYear = availableYears.includes(year + 1);
    const hasPreviousYear = availableYears.includes(year - 1);

    const incrementYear = () => {
        if (hasNextYear) {
            setYear(year + 1);
        }
    };

    const decrementYear = () => {
        if (hasPreviousYear) {
            setYear(year - 1);
        }
    };

    return {
        selectedYear: year,
        hasNextYear,
        hasPreviousYear,
        incrementYear,
        decrementYear,
    };
}
