import axios from "axios";
import { useQueries } from "react-query";
import { PolarArea } from "react-chartjs-2";
import { Zero2NArray } from "../../utils";
import YearInputHandler from "~/elements/YearInputHandler";
import useYearSelection from "~/hooks/useYearSelection";


type CommitsPerWeekdayResponse = Record<number, number>
type QueryReturn = [number, CommitsPerWeekdayResponse]

const HOURS_PER_DAY = 24;
const HOURS = Zero2NArray(HOURS_PER_DAY-1);

export default function CommitsPerHourWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerHour />
        </div>
    </div>;
}

export function CommitsPerHour() {
    const years = useYearSelection();

    const queries = useQueries(
        years.map(year => ({
            queryKey: ["commits-per-hour", year],
            queryFn: () => axios
                .get<CommitsPerWeekdayResponse>("/commits-per-hour", { params: { year } })
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    // const maxValue = Math.max(...queries.map(result => Object.values(result.data?.[1]).flat()));
    // const maxValue = Math.max(...Object.values(query.data!));

    return <PolarArea data={{
        labels: HOURS.map(h => `${h} o Clock`),
        datasets: queries.map(result => {
            if (result.isLoading) return {label: "loading...", data: []};
            if (!result.isSuccess) return {label: "failed", data: []};
            const [year, data] = result.data;
            return {
                label: `${year}`,
                data: HOURS.map(hour => data[hour] ?? 0),
            };
        }),
    }} options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Avg Commits per Hour",
            },
            legend: {
                display: false,
            },
        },
        interaction: {
            axis: "r",
            intersect: false,
        },
        scales: {
            r: {
                ticks: {
                    display: false,
                },
                grid: {
                    color: "white",
                },
            },
        },
    }} width="100%" height="100%" />;
}
