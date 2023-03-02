import YearInputHandler from "~/elements/YearInputHandler";
import {CommitsPerDay} from "./per-day";
import {CommitsPerHour} from "./per-hour";
import {CommitsPerMonth} from "./per-month";
import {CommitsPerWeek} from "./per-week";
import {CommitsPerWeekday} from "./per-weekday";

export default function CombinedCommitsGraph() {
    return <>
        <YearInputHandler />
        <div className="grid grid-cols-2 gap-5 grid-rows-3 grow">
            <div>
                <CommitsPerHour />
            </div>
            <div>
                <CommitsPerWeekday />
            </div>
            <div>
                <CommitsPerDay />
            </div>
            <div>
                <CommitsPerWeek />
            </div>
            <div>
                <CommitsPerMonth />
            </div>
        </div>
    </>;
}
