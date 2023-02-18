import FadeInBox from "~/elements/FadeInBox";
import GitGraph from "./images/git-graph.png";
import ChartGraph from "./images/line-graph.png";


export default function WhatIsThis() {
    return <div className="grid grid-cols-2 gap-5 p-2">
        <FadeInBox from="left">
            <img src={GitGraph} alt="git-graph" />
        </FadeInBox>
        <div className="grid">
            <p className="text-center m-auto">
                See how many commits you had last year and all the years before
            </p>
        </div>

        <div className="grid">
            <p className="text-center m-auto">
                View some other stuff
            </p>
        </div>
        <FadeInBox from="right">
            <img className="bg-blend-color-burn" src={ChartGraph} alt="chart-graph" />
        </FadeInBox>
    </div>;
}