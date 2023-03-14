import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAvailableYears } from "./useAvailableYears";


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

    const queryParamYears = searchParams.getAll("year").map(parseInt);
    const selectedYear = queryParamYears.at(-1) ?? availableYears[0];

    useEffect(() => {
        if (queryParamYears.length > 1) {
            setYear(selectedYear);
        }
    });

    const largerYears = availableYears.filter(y => y > selectedYear);
    const smallerYears = availableYears.filter(y => y < selectedYear);

    const hasNextYear = largerYears.length > 0;
    const hasPreviousYear = smallerYears.length > 0;

    const incrementYear = () => {
        if (hasNextYear) {
            setYear(smallerYears[smallerYears.length - 1]);
        }
    };

    const decrementYear = () => {
        if (hasPreviousYear) {
            setYear(largerYears[0]);
        }
    };

    return {
        selectedYear,
        hasNextYear,
        hasPreviousYear,
        incrementYear,
        decrementYear,
    };
}
