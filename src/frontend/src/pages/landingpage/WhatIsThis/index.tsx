import FadeInBox from "~/elements/animations/FadeInBox";
import GitGraph from "./images/git-graph.png";
import ChartGraph from "./images/line-graph.png";


export default function WhatIsThis() {
    return <div className="grid grid-cols-2 gap-5 p-2">
        <FadeInBox from="left">
            <img src={GitGraph} alt="git-graph" />
        </FadeInBox>
        <div className="grid">
            <p className="m-auto text-center">
                See how many commits you had last year and all the years before
            </p>
        </div>

        <div className="grid">
            <p className="m-auto text-center">
                View some other stuff
            </p>
        </div>
        <FadeInBox from="right">
            <img className="bg-blend-color-burn" src={ChartGraph} alt="chart-graph" />
        </FadeInBox>
    </div>;
}
