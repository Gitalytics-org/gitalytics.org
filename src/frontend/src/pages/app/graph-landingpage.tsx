import { Link } from "react-router-dom";

export default  function GraphLandingPage() {
    return <div className="grid min-h-screen">
        <div className="m-auto select-none">
            <h1 className="text-[5vw]">Available Graphs</h1>
        </div>
        <Link to="/app/activity-graph">Activity Graph</Link>
    </div>;
}
