import GraphIconSrc from "@assets/graph-icon.png";
import PreserveQueryLink from "~/elements/PreserveQueryLink";


export default function GraphLandingPageLink() {
    return <div className="flex select-none gap-2 group items-center">
        <img src={GraphIconSrc} alt="" className="w-12 h-12 dark:invert" />
        <PreserveQueryLink to="/app" className="whitespace-nowrap grow">
            Select Graph
        </PreserveQueryLink>
    </div>;
}
