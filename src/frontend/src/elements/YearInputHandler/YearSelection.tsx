import { useSearchParams } from "react-router-dom";

const STARTING_YEAR = 2000;

function M2NArray(m: number, n: number) {
    return Array.from(Array(n-m+1).keys()).map(v => v + m);
}


const allYears = M2NArray(STARTING_YEAR, new Date().getFullYear());


function useYearManipulation(): [number[], (y: number[]) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    function setYears(years: number[]) {
        setSearchParams((prev) => {
            prev.delete("year");
            years.sort((a, b) => a-b)
                .forEach(y => prev.append("year", `${y}`));
            return prev;
        }, { replace: true });
    }

    const years = searchParams.getAll("year").map(y => parseInt(y));

    return [years, setYears];
}


export default function YearSelectionInput() {
    const [years, setYears] = useYearManipulation();

    const inactive = allYears
        .filter(e => !years.includes(e))
        .sort((a, b) => b-a);

    return <div className="flex gap-1 p-1 rounded-lg select-none bg-fgc bg-opacity-10">
        {years
            .sort((a, b) => a-b)
            .map(year => <div key={year} className="px-2 rounded-md bg-fgc bg-opacity-10">
                {year}
                <button className="pl-1 opacity-40 hover:opacity-100" onClick={() => setYears(years.filter(e => e !== year))}>X</button>
            </div>)
        }
        <div className="grow" />
        <div className="relative group">
            <div className="p-1 w-6 h-6 grid place-items-center bg-fgc text-bgc rounded-full text-center align-middle leading-[100%]">+</div>
            <div className="flex-col gap-1 absolute top-[100%] right-0 py-1 px-2 bg-fgc bg-opacity-50 text-bgc rounded-md hidden no-scrollbar group-hover:flex overflow-y-scroll max-h-40">
                {inactive.map(year => <button key={year} className="px-2 bg-black rounded-md even:bg-opacity-10 odd:bg-opacity-5 hover:bg-opacity-30" onClick={() => setYears(years.concat(year))}>
                    {year}
                </button>)}
                {!inactive.length && <div className="opacity-50 whitespace-nowrap">
                    Nothing Here
                </div>}
            </div>
        </div>
    </div>;
}
