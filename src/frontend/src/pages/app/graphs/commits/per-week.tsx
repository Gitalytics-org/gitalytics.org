import axios from "axios";
import { useQueries } from "react-query";
import { Bar } from "react-chartjs-2";
import { One2NArray } from "../../utils";
import YearInputHandler from "~/elements/YearInputHandler";
import useYearSelection from "~/hooks/useYearSelection";


type CommitsPerWeekResponse = Record<number, number>
type QueryReturn = [number, CommitsPerWeekResponse]

const WEEKS_PER_YEAR = 52;
const WEEKS = One2NArray(WEEKS_PER_YEAR);

export default function CommitsPerWeekWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerWeek />
        </div>
    </div>;
}

export function CommitsPerWeek() {
    const years = useYearSelection();

    const queries = useQueries(
        years.map(year => ({
            queryKey: ["commits-per-week", year],
            queryFn: () => axios
                .get<CommitsPerWeekResponse>("/commits-per-week", { params: { year } })
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    return <Bar data={{
        labels: WEEKS,
        datasets: queries.map(result => {
            if (!result.isSuccess) return {label: "failed", data: []};
            const [year, data] = result.data;
            return {
                label: years.length > 1 ? `${year}` : "",
                data: WEEKS.map(week => data[week] ?? 0),
            };
        }),
    }} options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Avg Commits per Week",
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Week of the Year",
                },
                grid: {
                    color: "#6666",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Commits",
                },
                grid: {
                    color: "#6666",
                },
            },
        },
        interaction: {
            axis: "x",
            intersect: false,
        },
    }} width="100%" height="100%" />;
}
