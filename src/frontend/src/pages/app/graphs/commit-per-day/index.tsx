import axios from "axios";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";


export default function GraphCommitsPerDay() {
    const query = useQuery<Record<string, number>>(
        ["test-data"],
        () => axios.get("/test-data").then(r => r.data),
    );
    if (query.isLoading) {
        return null;
    }
    if (query.isError) {
        return <p>Error: {`${query.error}`}</p>;
    }

    const YEARS = 3;
    const DAYPERYEAR = 365;
    const DAYCOUNT = YEARS * DAYPERYEAR;

    const dayIter = Array.from(Array(DAYCOUNT).keys()).map(delta => {
        const date = new Date(Date.now());
        date.setDate(date.getDate() - (DAYCOUNT - delta));
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

    return <div className="w-full max-h-screen">
        <Line data={{
            labels: dayIter.map(date => date.toLocaleDateString()),
            // labels: dayIter.map(date => `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`),
            datasets: [{
                data: dayIter.map(date => query.data?.[`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`] ?? 0),
                label: "PlayerG9",
            }],
        }} options={{
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Commits per Day",
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Commits",
                    },
                },
            },
        }} width="100%" height="100%" className="w-full" />
    </div>;
}
