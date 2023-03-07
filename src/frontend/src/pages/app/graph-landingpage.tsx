import PreserveQueryLink from "~/elements/PreserveQueryLink";

export default  function GraphLandingPage() {
    return <div className="grid min-h-screen">
        <div className="m-auto select-none">
            <h1 className="text-[5vw]">Available Graphs</h1>
        </div>
        <PreserveQueryLink to="/app/activity-graph">
            Activity Graph
        </PreserveQueryLink>
        <PreserveQueryLink to="/app/commits">
            Average Commits
        </PreserveQueryLink>
        <PreserveQueryLink to="/app/commits-per-hour">
            Average Commits per Hour
        </PreserveQueryLink>
        <PreserveQueryLink to="/app/commits-per-weekday">
            Average Commits per Weekday
        </PreserveQueryLink>
        <PreserveQueryLink to="/app/commits-per-day-in-month">
            Average Commits per Day
        </PreserveQueryLink>
        <PreserveQueryLink to="/app/commits-per-week">
            Average Commits per Week
        </PreserveQueryLink>
        <PreserveQueryLink to="/app/commits-per-month">
            Average Commits per Month
        </PreserveQueryLink>
    </div>;
}
