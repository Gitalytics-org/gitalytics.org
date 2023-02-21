import { Line } from "react-chartjs-2";
import demoData from "./demo-data.json";


const indexed: Record<number, number> = {};
for (const el of demoData) {
    const date = new Date(el.date);
    indexed[new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf()] = el.count;
}

export default function GraphCommitsPerDay() {
    // const dayIter = Array.from(Array(3 * 365).keys()).map(delta => new Date(Date.now() - (new Date(0, 0, (3*365)-delta)).valueOf()));
    const dayIter = Array.from(Array(365).keys()).map(delta => {
        const date = new Date(Date.now());
        date.setDate(date.getDate() - (365 - delta));
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

    return <div className="w-full max-h-screen">
        <Line data={{
            labels: dayIter.map(date => date.toLocaleDateString()),
            // labels: dayIter.map(date => `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`),
            datasets: [{
                data: dayIter.map(date => indexed[date.valueOf()] ?? 0),
                label: "roriwa",
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
