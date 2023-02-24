import axios from "axios";
import { useQuery } from "react-query";
import { Radar } from "react-chartjs-2";
import { ZeroToNArray } from "../../utils";


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

    return <Radar data={{
        labels: WEEKDAYS,
        datasets: [{
            label: "Avg Commits per Weekday",
            data: ZeroToNArray(WEEKDAYS.length).map(i => query.data![i] ?? ZERO),
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
    }} width="100%" height="100%" className="w-full" />;
}
