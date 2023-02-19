import { Route } from "react-router-dom";
import GraphLandingPage from "~/pages/app/graph-landingpage";
import GraphNotFound from "./graph-not-found";

export function getAppRoutes() {
    return <>
        <Route index element={<GraphLandingPage />} />

        <Route path="*" element={<GraphNotFound />} />
    </>;
}
