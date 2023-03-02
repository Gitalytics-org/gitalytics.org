import axios from "axios";
import { useQuery } from "react-query";
import { PolarArea } from "react-chartjs-2";
import { Zero2NArray } from "../../utils";
import colorLib from "@kurkle/color";
import YearInputHandler from "~/elements/YearInputHandler";


type CommitsPerWeekdayResponse = Record<number, number>

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const ZERO = 0;

export default function CommitsPerWeekdayWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerWeekday />
        </div>
    </div>;
}

export function CommitsPerWeekday() {
    const query = useQuery<CommitsPerWeekdayResponse>(
        ["commits-per-weekday"],
        () => axios.get("/commits-per-weekday").then(response => response.data),
    );
    if (query.isLoading) {
        return <>Loading...</>;
    }
    if (query.isError) {
        return <>Error...</>;
    }

    const weekdays = Zero2NArray(WEEKDAYS.length);
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
                grid: {
                    color: "white",
                },
            },
        },
    }} width="100%" height="100%" className="w-full max-h-screen" />;
}
