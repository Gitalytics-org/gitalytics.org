import { Route } from "react-router-dom";
import NoGraph from "~/pages/app/no-graph";
import GraphNotFound from "./graph-not-found";

export function getAppRoutes() {
    return <>
        <Route index element={<NoGraph />} />

        <Route path="*" element={<GraphNotFound />} />
    </>;
}
