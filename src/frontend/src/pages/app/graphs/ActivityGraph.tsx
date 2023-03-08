import axios from "axios";
import { useQueries } from "react-query";
import useYearSelection from "~/hooks/useYearSelection";
import Color from "@kurkle/color";
import YearInputHandler from "~/elements/YearInputHandler";
import { getCalenderWeek, One2NArray, getDayCountOfYear } from "../utils";


type Response = Record<string, number>;
type QueryReturn = [number, Response]

const BASE_COLOR = "#F05133";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS = ["Monday", "Wednesday", "Friday"];

export default function ActivityGraphWrapper() {
    return <>
        <YearInputHandler />
        <ActivityGraphHandler />
    </>;
}


export function ActivityGraphHandler() {
    const years = useYearSelection();

    const queries = useQueries(
        years.sort((a, b) => b-a).map(year => ({
            queryKey: ["commits-per-day", year],
            queryFn: () => axios
                .get<Response>("/commits-per-day", { params: { year } })
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    return <>
        {queries.map(result => {
            if (!result.isSuccess) return null;
            const [year, data] = result.data;
            return <ActivityGraph key={year} year={year} data={data} />;
        })}
    </>;
}

type ActivityGraphProps = { year: number, data: Response }
export function ActivityGraph({ year, data }: ActivityGraphProps) {
    const maxCount = Math.max(...Object.values(data));

    return <div className="w-full grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] gap-1 select-none p-1">
        <div className="">
            <h2 className="text-center text-[1.5vw]">{year}</h2>
        </div>
        <div className="flex flex-row justify-around my-auto">
            {MONTHS.map(month => <div key={month} className="text-[1vw] text-center">
                {month}
            </div>)}
        </div>
        <div className="flex flex-col justify-evenly">
            {WEEKDAYS.map(day => <div key={day} className="text-[1vw]">
                {day}
            </div>)}
        </div>
        <div className="p-1">
            <div className="grid gap-1" style={{gridTemplateColumns: "repeat(53, 1fr)", gridTemplateRows: "repeat(7, 1fr)"}}>
                {One2NArray(getDayCountOfYear(year)).map(dayOffset => {
                    const date = new Date(year, 0, dayOffset);
                    const dateStr = date.toISOString().split("T")[0];
                    const count = data[dateStr] ?? 0;
                    const column = getCalenderWeek(date);
                    const row = date.getUTCDay();
                    return <div key={dateStr} className="w-full aspect-square border border-black border-opacity-10" style={{
                        backgroundColor: Color(BASE_COLOR)
                            .alpha(count / maxCount)
                            .rgbString(),
                        gridColumn: column,
                        gridRow: row,
                    }} title={`${dateStr}\n${count} Commits`} />;
                })}
            </div>
        </div>
    </div>;
}
