import axios from "axios";
import { useQueries, type UseQueryResult } from "react-query";
import { Bar } from "react-chartjs-2";
import { One2NArray } from "../../utils";
import useYearSelection from "~/hooks/useYearSelection";
import YearInputHandler from "~/elements/YearInputHandler";


type CommitsPerDayResponse = Record<number, number>
type QueryReturn = [number, CommitsPerDayResponse]

const DAYS_PER_MONTH = 31;


export default function CommitsPerDayWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerDay />
        </div>
    </div>;
}


export function CommitsPerDay() {
    const years = useYearSelection();

    const queries = useQueries<QueryReturn[]>(
        years.map(year => ({
            queryKey: ["commits-per-day", year],
            queryFn: () => axios
                .get<CommitsPerDayResponse>(`/commits-per-day/${year}`)
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    const days = One2NArray(DAYS_PER_MONTH);

    return <Bar data={{
        labels: days,
        datasets: (queries as Array<UseQueryResult<QueryReturn>>).map(result => {
            if (result.isLoading) return {label: "loading...", data: []};
            if (!result.isSuccess) return {label: "failed", data: []};
            const [year, data] = result.data;
            return {
                label: `${year}`,
                data: days.map(d => data[d] ?? 0),
            };
        }),
    }} options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Commits per Day",
            },
            legend: {
                display: true,
            },
        },
        interaction: {
            axis: "x",
            intersect: false,
        },
    }} width="100%" height="100%" />;
}
