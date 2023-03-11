import axios from "axios";
import { useQueries } from "react-query";
import { Bar } from "react-chartjs-2";
import { One2NArray } from "../../utils";
import useYearSelection from "~/hooks/useYearSelection";
import YearInputHandler from "~/elements/YearInputHandler";


type CommitsPerDayInMonthResponse = Record<number, number>
type QueryReturn = [number, CommitsPerDayInMonthResponse]

const DAYS_PER_MONTH = 31;
const DAYS = One2NArray(DAYS_PER_MONTH);


export default function CommitsPerDayInMonthWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerDayInMonth />
        </div>
    </div>;
}


export function CommitsPerDayInMonth() {
    const years = useYearSelection();

    const queries = useQueries(
        years.map(year => ({
            queryKey: ["commits-per-day", year],
            queryFn: () => axios
                .get<CommitsPerDayInMonthResponse>("/commits-per-day-in-month", { params: { year } })
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    return <Bar data={{
        labels: DAYS,
        datasets: queries.map(result => {
            if (!result.isSuccess) return {label: "", data: []};
            const [year, data] = result.data;
            return {
                label: years.length > 1 ? `${year}` : "",
                data: DAYS.map(day => data[day] ?? 0),
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
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Day of the Month",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Commits",
                },
            },
        },
        interaction: {
            axis: "x",
            intersect: false,
        },
    }} width="100%" height="100%" />;
}
