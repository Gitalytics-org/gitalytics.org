import { Route } from "react-router-dom";
import GraphLandingPage from "~/pages/app/graph-landingpage";
import GraphNotFound from "./graph-not-found";
import CombinedAvgCommitsGraph from "./graphs/avg-commits";
import AvgCommitsPerDay from "./graphs/avg-commits/per-day";
import AvgCommitsPerHour from "./graphs/avg-commits/per-hour";
import AvgCommitsPerMonth from "./graphs/avg-commits/per-month";
import AvgCommitsPerWeek from "./graphs/avg-commits/per-week";
import AvgCommitsPerWeekday from "./graphs/avg-commits/per-weekday";

export function getAppRoutes() {
    return <>
        <Route index element={<GraphLandingPage />} />

        <Route path="avg-commits" element={<CombinedAvgCommitsGraph />} />
        <Route path="avg-commits-per-hour" element={<AvgCommitsPerHour />} />
        <Route path="avg-commits-per-weekday" element={<AvgCommitsPerWeekday />} />
        <Route path="avg-commits-per-day" element={<AvgCommitsPerDay />} />
        <Route path="avg-commits-per-week" element={<AvgCommitsPerWeek />} />
        <Route path="avg-commits-per-month" element={<AvgCommitsPerMonth />} />

        <Route path="*" element={<GraphNotFound />} />
    </>;
}
