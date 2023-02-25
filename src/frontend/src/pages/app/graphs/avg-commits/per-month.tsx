import axios from "axios";
import { useQuery } from "react-query";
import { Radar } from "react-chartjs-2";
import { OneToNArray } from "../../utils";


type AvgCommitsPerMonthResponse = Record<number, number>

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ZERO = 0;


export default function AvgCommitsPerMonth() {
    const query = useQuery<AvgCommitsPerMonthResponse>(
        ["avg-commits-per-month"],
        () => axios.get("/avg-commits-per-month").then(response => response.data),
    );
    if (query.isLoading) {
        return <>Loading...</>;
    }
    if (query.isError) {
        return <>Error...</>;
    }

    return <Radar data={{
        labels: MONTHS,
        datasets: [{
            label: "Avg Commits per Month",
            data: OneToNArray(MONTHS.length).map(i => query.data![i] ?? ZERO),
            borderColor: "#F05133",
        }],
    }} options={{
        // maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Avg Commits per Month",
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
    }} width="100%" height="100%" className="w-full" />;
}
