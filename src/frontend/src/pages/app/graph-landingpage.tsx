import { Link } from "react-router-dom";

export default  function GraphLandingPage() {
    return <div className="min-h-screen grid">
        <div className="m-auto select-none">
            <h1 className="text-[5vw]">Available Graphs</h1>
        </div>
        <Link to="/app/avg-commits">
            Average Commits
        </Link>
        <Link to="/app/avg-commits-per-weekday">
            Average Commits per Weekday
        </Link>
        <Link to="/app/avg-commits-per-day">
            Average Commits per Day
        </Link>
        <Link to="/app/avg-commits-per-week">
            Average Commits per Week
        </Link>
        <Link to="/app/avg-commits-per-month">
            Average Commits per Month
        </Link>
    </div>;
}
