import axios from "axios";
import { useQuery } from "react-query";
import { PolarArea } from "react-chartjs-2";
import { Zero2NArray } from "../../utils";
import colorLib from "@kurkle/color";
import YearInputHandler from "~/elements/YearInputHandler";


type CommitsPerWeekdayResponse = Record<number, number>

const HOURS_PER_DAY = 24;
const ZERO = 0;

export default function CommitsPerHourWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerHour />
        </div>
    </div>;
}

export function CommitsPerHour() {
    const query = useQuery<CommitsPerWeekdayResponse>(
        ["commits-per-hour"],
        () => axios.get("/commits-per-hour").then(response => response.data),
    );
    if (query.isLoading) {
        return <>Loading...</>;
    }
    if (query.isError) {
        return <>Error...</>;
    }

    const hours = Zero2NArray(HOURS_PER_DAY);
    const maxValue = Math.max(...Object.values(query.data!));

    return <PolarArea data={{
        labels: hours.map(h => `${h} o Clock`),
        datasets: [{
            label: "Avg Commits per Hour",
            data: hours.map(i => query.data![i] ?? ZERO),
            backgroundColor: hours.map(
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
                text: "Avg Commits per Hour",
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
