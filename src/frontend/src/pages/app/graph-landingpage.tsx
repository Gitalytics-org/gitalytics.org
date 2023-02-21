import { Link } from "react-router-dom";

export default  function GraphLandingPage() {
    return <div className="min-h-screen grid grid-cols-[repeat(auto-fit, minmax(250px,1fr))]">
        <div className="mx-auto select-none">
            <h1 className="text-[5vw]">Available Graphs</h1>
        </div>
        <Link to="./commits-per-day">Commit per Day</Link>
    </div>;
}
