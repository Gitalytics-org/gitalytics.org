import { Route } from "react-router-dom";
import GraphLandingPage from "~/pages/app/graph-landingpage";
import GraphNotFound from "./graph-not-found";
import ActivityGraph from "./graphs/ActivityGraph";

export function getAppRoutes() {
    return <>
        <Route index element={<GraphLandingPage />} />

        <Route path="activity-graph" element={<ActivityGraph />} />

        <Route path="*" element={<GraphNotFound />} />
    </>;
}
