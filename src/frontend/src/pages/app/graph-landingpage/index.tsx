import PreserveQueryLink from "~/elements/PreserveQueryLink";
import ActivityGraphSrc from "./images/activity-graph.png";
import CommitsPerHourSrc from "./images/commits-per-hour.png";
import CommitsPerWeekdaySrc from "./images/commits-per-weekday.png";
import CommitsPerDaySrc from "./images/commits-per-day.png";
import CommitsPerWeekSrc from "./images/commits-per-week.png";
import CommitsPerMonthSrc from "./images/commits-per-month.png";
import AnnouncementsBox from "~/components/AnnouncementsBox";


export default  function GraphLandingPage() {
    return <div className="min-h-screen p-5 select-none">
        <AnnouncementsBox />
        <h1 className="text-[5vw] text-center"><span className="text-accent">Gitalytics</span> Graphs</h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] mx-auto gap-5 px-5 text-center">
            <GraphLink name="activity-graph" assetSrc={ActivityGraphSrc}>Activity Graph</GraphLink>
            <GraphLink name="commits-per-hour" assetSrc={CommitsPerHourSrc}>Commits per Hour</GraphLink>
            <GraphLink name="commits-per-weekday" assetSrc={CommitsPerWeekdaySrc}>Commits per Weekday</GraphLink>
            <GraphLink name="commits-per-day-in-month" assetSrc={CommitsPerDaySrc}>Commits per Day</GraphLink>
            <GraphLink name="commits-per-week" assetSrc={CommitsPerWeekSrc}>Commits per Week</GraphLink>
            <GraphLink name="commits-per-month" assetSrc={CommitsPerMonthSrc}>Commits per Month</GraphLink>
        </div>
    </div>;
}

type GraphLinkProps = {
    children: string
    name: string
    assetSrc: string
}
function GraphLink(props: GraphLinkProps) {
    return <PreserveQueryLink to={`/app/${props.name}`} className="flex flex-col gap-1 transition-transform hover:scale-110">
        <img className="object-contain max-w-xs mx-auto border rounded-lg border-fgc grow bg-slate-800" src={props.assetSrc} alt="" />
        <span>{props.children}</span>
    </PreserveQueryLink>;
}
