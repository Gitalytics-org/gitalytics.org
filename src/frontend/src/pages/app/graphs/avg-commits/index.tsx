import AvgCommitsPerDay from "./per-day";
import AvgCommitsPerMonth from "./per-month";
import AvgCommitsPerWeek from "./per-week";
import AvgCommitsPerWeekday from "./per-weekday";

export default function CombinedAvgCommitsGraph() {
    return <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <div className="overflow-hidden">
            <AvgCommitsPerWeekday />
        </div>
        <div className="overflow-hidden">
            <AvgCommitsPerDay />
        </div>
        <div className="overflow-hidden">
            <AvgCommitsPerWeek />
        </div>
        <div className="overflow-hidden">
            <AvgCommitsPerMonth />
        </div>
    </div>;
}
