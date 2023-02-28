import YearSelectionInput from "~/elements/YearSelection";
import YearSwitcher from "~/elements/YearSwitcher";
import useYearSelection from "~/hooks/useYearSelection";


export default function TestPage() {
    const years = useYearSelection();

    return <div>
        <div className="px-2 py-1">
            <YearSelectionInput />
            <YearSwitcher />
        </div>
        Your Selected Years are
        <div className="flex flex-col gap-5">
            {years.map(y => <span key={y}>{y}</span>)}
        </div>
    </div>;
}
