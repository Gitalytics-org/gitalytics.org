import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ChevronRight from "~/icons/ChevronRight";


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

    const incrementYear = () => {
        if (hasNextYear) {
            setYear(year + 1);
        }
    };


    const decrementYear = () => {
        if (hasPrevYear) {
            setYear(year - 1);
        }
    };


    return (
        <div className="flex justify-center select-none">
            <div className="flex justify-center align-middle">
                <ChevronRight
                    className={"rotate-180 " + (hasPrevYear ? "text-white cursor-pointer" : "text-gray-600 cursor-default")}
                    height="60px"
                    width="60px"
                    onClick={decrementYear}
                />
                <span className="font-mono text-6xl">{year}</span>
                <ChevronRight
                    className={hasNextYear ? "text-white cursor-pointer" : "text-gray-600 cursor-default"}
                    height="60px"
                    width="60px"
                    onClick={incrementYear}
                />
            </div>
        </div>
    );
}
