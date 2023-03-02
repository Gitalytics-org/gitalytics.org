import { Route } from "react-router-dom";
import GraphLandingPage from "~/pages/app/graph-landingpage";
import GraphNotFound from "./graph-not-found";
import CombinedCommitsGraph from "./graphs/commits";
import CommitsPerDay from "./graphs/commits/per-day";
import CommitsPerHour from "./graphs/commits/per-hour";
import CommitsPerMonth from "./graphs/commits/per-month";
import CommitsPerWeek from "./graphs/commits/per-week";
import CommitsPerWeekday from "./graphs/commits/per-weekday";

export function getAppRoutes() {
    return <>
        <Route index element={<GraphLandingPage />} />

        <Route path="commits" element={<CombinedCommitsGraph />} />
        <Route path="commits-per-hour" element={<CommitsPerHour />} />
        <Route path="commits-per-weekday" element={<CommitsPerWeekday />} />
        <Route path="commits-per-day" element={<CommitsPerDay />} />
        <Route path="commits-per-week" element={<CommitsPerWeek />} />
        <Route path="commits-per-month" element={<CommitsPerMonth />} />

        <Route path="*" element={<GraphNotFound />} />
    </>;
}
