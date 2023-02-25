import axios from "axios";
import { useQuery } from "react-query";
import { Bar } from "react-chartjs-2";
import { OneToNArray } from "../../utils";


type AvgCommitsPerWeekResponse = Record<number, number>

const WEEKS_PER_YEAR = 52;
const ZERO = 0;


export default function AvgCommitsPerWeek() {
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

    const weeks = OneToNArray(WEEKS_PER_YEAR);

    return <Bar data={{
        labels: weeks,
        datasets: [{
            label: "Avg Commits per Week",
            data: weeks.map(i => query.data![i] ?? ZERO),
            backgroundColor: "#F05133",
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
            intersect: true,
        },
    }} width="100%" height="100%" className="w-full max-h-screen" />;
}
