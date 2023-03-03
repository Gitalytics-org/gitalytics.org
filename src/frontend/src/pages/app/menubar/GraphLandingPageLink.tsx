import GraphIconSrc from "@assets/graph-icon.png";
import PreserveQueryLink from "~/elements/PreserveQueryLink";


export default function GraphLandingPageLink() {
    return <>
        <img src={GraphIconSrc} alt="" className="w-12 h-12 dark:invert" />
        <PreserveQueryLink to="/app" className="whitespace-nowrap col-span-2">
            Select Graph
        </PreserveQueryLink>
    </>;
}
