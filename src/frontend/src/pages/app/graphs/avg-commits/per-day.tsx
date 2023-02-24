import axios from "axios";
import { useQuery } from "react-query";
import { Radar } from "react-chartjs-2";
import { OneToNArray } from "../../utils";


type AvgCommitsPerDayResponse = Record<number, number>

const DAYS_PER_MONTH = 31;
const ZERO = 0;


export default function AvgCommitsPerDay() {
    const query = useQuery<AvgCommitsPerDayResponse>(
        ["avg-commits-per-day"],
        () => axios.get("/avg-commits-per-day").then(response => response.data),
    );
    if (query.isLoading) {
        return <>Loading...</>;
    }
    if (query.isError) {
        return <>Error...</>;
    }

    const days = OneToNArray(DAYS_PER_MONTH);

    return <Radar data={{
        labels: days,
        datasets: [{
            label: "Avg Commits per Day",
            data: days.map(i => query.data![i] ?? ZERO),
        }],
    }} options={{
        // maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Avg Commits per Day",
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
