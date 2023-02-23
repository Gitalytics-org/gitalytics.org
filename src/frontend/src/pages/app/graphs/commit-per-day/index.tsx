import axios from "axios";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { DateAdd, OneToNArray, toDateString } from "../../utils";


type ApiDate = Record<string, number>;


export default function QueryWrapper() {
    const query = useQuery<ApiDate>(
        ["test-data"],
        () => axios.get<ApiDate>("/test-data").then(r => r.data),
    );
    if (query.isLoading) {
        return null;
    }
    if (query.isError) {
        return <p>Error: {`${query.error}`}</p>;
    }
    return <GraphCommitsPerDay data={query.data!} />;
}

const NO_COMMITS = 0;

export function GraphCommitsPerDay({ data }: { data: ApiDate }) {
    const YEARS = 3;
    const DAY_PER_YEAR = 365;
    const DAY_COUNT = YEARS * DAY_PER_YEAR;

    const dayIter = OneToNArray(DAY_COUNT).map((delta) => DateAdd(new Date(), -(DAY_COUNT - delta)));

    return <div className="w-full max-h-screen">
        <Line data={{
            labels: dayIter.map(date => date.toLocaleDateString()),
            datasets: [{
                data: dayIter.map(date => data[toDateString(date)] ?? NO_COMMITS),
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
