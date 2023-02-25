import axios from "axios";
import { useQuery } from "react-query";
import { PolarArea } from "react-chartjs-2";
import { ZeroToNArray } from "../../utils";
import colorLib, { Color } from "@kurkle/color";


type AvgCommitsPerWeekdayResponse = Record<number, number>

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const ZERO = 0;


export default function AvgCommitsPerWeekday() {
    const query = useQuery<AvgCommitsPerWeekdayResponse>(
        ["avg-commits-per-weekday"],
        () => axios.get("/avg-commits-per-weekday").then(response => response.data),
    );
    if (query.isLoading) {
        return <>Loading...</>;
    }
    if (query.isError) {
        return <>Error...</>;
    }

    const weekdays = ZeroToNArray(WEEKDAYS.length);
    const maxValue = Math.max(...Object.values(query.data!));

    return <PolarArea data={{
        labels: WEEKDAYS,
        datasets: [{
            label: "Avg Commits per Weekday",
            data: weekdays.map(i => query.data![i] ?? ZERO),
            backgroundColor: weekdays.map(
                i => colorLib("#F05133")
                    .alpha((query.data![i] ?? ZERO) / maxValue)
                    .rgbString(),
            ),
        }],
    }} options={{
        // maintainAspectRatio: false,
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
            intersect: false,
        },
        scales: {
            r: {
                ticks: {
                    display: false,
                },
            },
        },
    }} width="100%" height="100%" className="w-full max-h-screen" />;
}
