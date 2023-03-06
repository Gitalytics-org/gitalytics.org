import axios from "axios";
import { useQuery } from "react-query";
import useYearSelection from "~/hooks/useYearSelection";
import Color from "@kurkle/color";

type Response = Record<string, number>;

const BASE_COLOR = "#F05133";


function getCurrentYear() {
    return new Date().getFullYear();
}

// setTimeout(() => {
//     axios.put("/set-active-workspace", null, { params: { workspace_name: "PlayerG9" } });
// }, 200);

// function One2NArray(n: number) {
//     return Array.from(Array(n).keys());
// }

const DAYS_PER_WEEK = 7;
const RANDOM_NUMBER = 86400000;
function getWeekNumber(date: string){
    const d = new Date(date);
    const dayNum = d.getUTCDay() || DAYS_PER_WEEK;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / RANDOM_NUMBER) + 1) / DAYS_PER_WEEK);
}

export default function ActivityGraph() {
    const year = useYearSelection()[0] ?? getCurrentYear();

    const query = useQuery<Response>(
        ["commits-per-day", year],
        () => axios.get<Response>("/commits-per-day", { params: { year } }).then(response => response.data),
        { enabled: !!year },
    );

    if (query.isIdle) return null;
    if (query.isLoading) return null;
    if (query.isError) return null;

    const maxCount = Math.max(...Object.values(query.data));

    return <div className="w-full h-40">
        <div className="grid grid-rows-[repeat(7,1fr)] grid-cols-[repeat(52,1fr)] grid-flow-row w-full h-fit gap-1">
            {Object.entries(query.data).map(
                ([date, count]) => <div key={date} className="w-full aspect-square" style={{
                    backgroundColor: Color(BASE_COLOR).alpha((count / maxCount) * 0.8 + 0.2).rgbString(),
                    gridColumn: getWeekNumber(date),
                    gridRow: new Date(date).getDay(),
                }} title={`${count} Commits`} />,
            )}
        </div>
    </div>;
}
