import { useSelectedYear } from "./hooks/useSelectedYear";
import ChevronRight from "~/icons/ChevronRight";


export default function YearSwitcherInput() {
    const { selectedYear, hasNextYear, hasPreviousYear, incrementYear, decrementYear} = useSelectedYear();

    return (
        <div className="flex select-none justify-center">
            <div className="flex align-middle justify-center">
                <ChevronRight
                    className={"rotate-180 dark:invert " + (hasPreviousYear ? "text-white cursor-pointer" : "text-gray-600 cursor-default")}
                    height="60px"
                    width="60px"
                    onClick={decrementYear}
                />
                <span className="text-6xl font-mono">{selectedYear}</span>
                <ChevronRight
                    className={"dark:invert " + (hasNextYear ? "text-white cursor-pointer" : "text-gray-600 cursor-default")}
                    height="60px"
                    width="60px"
                    onClick={incrementYear}
                />
            </div>
        </div>
    );
}
