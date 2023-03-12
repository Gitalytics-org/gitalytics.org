import axios from "axios";
import { useQueries } from "react-query";
import { PolarArea } from "react-chartjs-2";
import { Zero2NArray } from "../../utils";
import YearInputHandler from "~/elements/YearInputHandler";
import useYearSelection from "~/hooks/useYearSelection";


type CommitsPerWeekdayResponse = Record<number, number>
type QueryReturn = [number, CommitsPerWeekdayResponse]

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdays = Zero2NArray(WEEKDAYS.length-1);

export default function CommitsPerWeekdayWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerWeekday />
        </div>
    </div>;
}

export function CommitsPerWeekday() {
    const years = useYearSelection();

    const queries = useQueries(
        years.map(year => ({
            queryKey: ["commits-per-weekday", year],
            queryFn: () => axios
                .get<CommitsPerWeekdayResponse>("/commits-per-weekday", { params: { year } })
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    return <PolarArea data={{
        labels: WEEKDAYS,
        datasets: queries.map(result => {
            if (!result.isSuccess) return {label: "", data: []};
            const [year, data] = result.data;
            return {
                label: years.length > 1 ? `${year}` : "",
                data: weekdays.map(weekday => data[weekday] ?? 0),
            };
        }),
    }} options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Avg Commits per Weekday",
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
                    color: "#6666",
                },
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                },
            },
        },
    }} width="100%" height="100%" />;
}
