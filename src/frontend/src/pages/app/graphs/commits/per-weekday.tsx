import axios from "axios";
import { useQueries } from "react-query";
import { PolarArea } from "react-chartjs-2";
import YearInputHandler from "~/elements/YearInputHandler";
import useYearSelection from "~/hooks/useYearSelection";


const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type CommitsPerWeekdayResponse = {
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number,
}
type QueryReturn = [number, CommitsPerWeekdayResponse]

export default function CommitsPerWeekdayWrapper() {
    return <div className="flex flex-col h-screen">
        <YearInputHandler />
        <div className="grow">
            <CommitsPerWeekday />
        </div>
    </div>;
}

export function CommitsPerWeekday() {
    const years = useYearSelection();

    const queries = useQueries(
        years.map(year => ({
            queryKey: ["data", "commits-per-weekday", year],
            queryFn: () => axios
                .get<CommitsPerWeekdayResponse>("/commits-per-weekday", { params: { year } })
                .then<QueryReturn>(response => [year, response.data]),
        })),
    );

    return <PolarArea data={{
        labels: WEEKDAYS,
        datasets: queries.map(result => {
            if (!result.isSuccess) return {label: "", data: []};
            const [year, countPerWeekday] = result.data;
            const lowerCaseWeekdays = WEEKDAYS.map(s => s.toLowerCase());
            return {
                label: years.length > 1 ? `${year}` : "",
                data: Object.keys(countPerWeekday)
                    .sort((a, b) => lowerCaseWeekdays.indexOf(b) - lowerCaseWeekdays.indexOf(a))
                    // @ts-ignore: key is garanteed to be a valid key, not just any string. TS isn't smart enough
                    .map((key: string) => countPerWeekday[key]),
            };
        }),
    }} options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Commits per Weekday",
            },
            legend: {
                display: false,
            },
        },
        interaction: {
            axis: "r",
            intersect: false,
        },
        scales: {
            r: {
                ticks: {
                    display: false,
                },
                grid: {
                    color: "#6666",
                },
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                },
            },
        },
    }} width="100%" height="100%" />;
}
