import axios from "axios";
import { useQuery } from "react-query";
import { Radar } from "react-chartjs-2";
import { OneToNArray } from "../../utils";


type AvgCommitsPerWeekResponse = Record<number, number>

const WEEKS_PER_YEAR = 52;
const ZERO = 0;


export default function AvgCommitsPerDay() {
    const query = useQuery<AvgCommitsPerWeekResponse>(
        ["avg-commits-per-week"],
        () => axios.get("/avg-commits-per-week").then(response => response.data),
    );
    if (query.isLoading) {
        return <>Loading...</>;
    }
    if (query.isError) {
        return <>Error...</>;
    }

    return <Radar data={{
        labels: Array.from(Array(WEEKS_PER_YEAR).keys()),
        datasets: [{
            label: "Avg Commits per Week",
            data: OneToNArray(WEEKS_PER_YEAR).map(i => query.data![i] ?? ZERO),
        }],
    }} options={{
        // maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Avg Commits per Week",
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
