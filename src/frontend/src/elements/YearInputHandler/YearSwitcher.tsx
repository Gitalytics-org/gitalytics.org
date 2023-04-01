import { useSelectedYear } from "./hooks/useSelectedYear";
import ChevronRight from "~/icons/ChevronRight";


export default function YearSwitcherInput() {
    const { selectedYear, hasNextYear, hasPreviousYear, incrementYear, decrementYear} = useSelectedYear();

    return (
        <div className="flex justify-center select-none">
            <div className="flex justify-center align-middle">
                <ChevronRight
                    className={"rotate-180 text-fgd " + (hasPreviousYear ? "cursor-pointer" : "opacity-50 cursor-default")}
                    height="60px"
                    width="60px"
                    onClick={decrementYear}
                />
                <span className="font-mono text-6xl">{selectedYear}</span>
                <ChevronRight
                    className={"text-fgd " + (hasNextYear ? "cursor-pointer" : "opacity-50 cursor-default")}
                    height="60px"
                    width="60px"
                    onClick={incrementYear}
                />
            </div>
        </div>
    );
}
