import YearInputHandler from "~/elements/YearInputHandler";
import useYearSelection from "~/hooks/useYearSelection";


export default function TestPage() {
    const years = useYearSelection();

    return <div>
        <YearInputHandler />
        Your Selected Years are
        <div className="flex flex-col gap-5">
            {years.map(y => <span key={y}>{y}</span>)}
        </div>
    </div>;
}
