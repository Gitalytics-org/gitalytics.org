import { useSelectedYears } from "./hooks/useSelectedYears";
import { useAvailableYears } from "./hooks/useAvailableYears";


export default function YearSelectionInput() {
    const availableYears = useAvailableYears();
    const {selectedYears, addSelectedYear, removeSelectedYear} = useSelectedYears();

    return (
        <div className="flex gap-1 p-1 rounded-lg select-none bg-fgc bg-opacity-10">
            {selectedYears.map(year => (
                <div key={year} className="px-2 rounded-md bg-fgc bg-opacity-10">
                    {year}
                    <button className="pl-1 opacity-40 hover:opacity-100" onClick={() => removeSelectedYear(year)}>X</button>
                </div>
            ))}
            <div className="grow" />
            <div className="relative group">
                <div className="p-1 w-6 h-6 grid place-items-center bg-fgc text-bgc rounded-full text-center align-middle leading-[100%]">+</div>
                <div className="flex-col gap-1 absolute top-[100%] right-0 py-1 px-2 bg-fgc bg-opacity-50 text-bgc rounded-md hidden no-scrollbar group-hover:flex overflow-y-scroll max-h-40">
                    {availableYears.map(year => (
                        <button key={year} className="px-2 bg-black rounded-md even:bg-opacity-10 odd:bg-opacity-5 hover:bg-opacity-30" onClick={() => addSelectedYear(year)}>
                            {year}
                        </button>
                    ))}
                    {availableYears.length === 0 && (
                        <div className="opacity-50 whitespace-nowrap">
                            Nothing Here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
