import axios from "axios";
import { useQueries } from "react-query";
import { Radar } from "react-chartjs-2";
import { One2NArray } from "../../utils";
import YearInputHandler from "~/elements/YearInputHandler";
import useYearSelection from "~/hooks/useYearSelection";


type CommitsPerMonthResponse = Record<number, number>
type QueryReturn = [number, CommitsPerMonthResponse]

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const months = One2NArray(MONTHS.length);

export default function CommitsPerMonthWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerMonth />
        </div>
    </div>;
}

export function CommitsPerMonth() {
    const years = useYearSelection();

    const queries = useQueries(
        years.map(year => ({
            queryKey: ["commits-per-month", year],
            queryFn: () => axios
                .get<CommitsPerMonthResponse>(`/commits-per-month/${year}`)
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    return <Radar data={{
        labels: MONTHS,
        datasets: queries.map(result => {
            if (result.isLoading) return {label: "loading...", data: []};
            if (!result.isSuccess) return {label: "failed", data: []};
            const [year, data] = result.data;
            return {
                label: `${year}`,
                data: months.map(month => data[month] ?? 0),
            };
        }),
    }} options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Avg Commits per Month",
            },
        },
        interaction: {
            axis: "r",
            intersect: false,
        },
        elements: {
            line: {
                tension: 0.25,
            },
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
