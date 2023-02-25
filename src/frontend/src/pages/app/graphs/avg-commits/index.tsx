import AvgCommitsPerDay from "./per-day";
import AvgCommitsPerHour from "./per-hour";
import AvgCommitsPerMonth from "./per-month";
import AvgCommitsPerWeek from "./per-week";
import AvgCommitsPerWeekday from "./per-weekday";

export default function CombinedAvgCommitsGraph() {
    return <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <div>
            <AvgCommitsPerHour />
        </div>
        <div>
            <AvgCommitsPerWeekday />
        </div>
        <div>
            <AvgCommitsPerDay />
        </div>
        <div>
            <AvgCommitsPerWeek />
        </div>
        <div>
            <AvgCommitsPerMonth />
        </div>
    </div>;
}
