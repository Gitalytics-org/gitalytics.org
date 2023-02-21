import { Route } from "react-router-dom";
import GraphLandingPage from "~/pages/app/graph-landingpage";
import GraphNotFound from "./graph-not-found";
import GraphCommitsPerDay from "./graphs/commit-per-day";

export function getAppRoutes() {
    return <>
        <Route index element={<GraphLandingPage />} />

        <Route path="commits-per-day" element={<GraphCommitsPerDay />} />

        <Route path="*" element={<GraphNotFound />} />
    </>;
}
