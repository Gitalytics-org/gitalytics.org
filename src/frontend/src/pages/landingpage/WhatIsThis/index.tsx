import FadeInBox from "~/elements/animations/FadeInBox";
import { type PropsWithChildren } from "react";
import GitHubIconSrc from "@assets/github.png";
import BitbucketIconSrc from "@assets/bitbucket.png";
import GitLabIconSrc from "@assets/gitlab.png";
import CodeBoxSrc from "./images/code-box.svg";
import GitGraph from "./images/activity-graph.png";
import ChartGraph from "./images/line-graph.png";


export default function WhatIsThis() {
    return <div className="grid grid-cols-2 gap-10 p-2">
        <FadeInBox from="left">
            <ProviderGroupIcon />
        </FadeInBox>
        <TextSection>
            We offer analysis for GitHub, Bitbucket and GitLab
        </TextSection>

        <TextSection>
            Instead of analyzing only one repository, we can analyze an entire workspace. A feature, that many other products lack
        </TextSection>
        <FadeInBox from="right">
            <img className="max-h-64 mx-auto" src={CodeBoxSrc} alt="Code-Box" />
        </FadeInBox>

        <FadeInBox from="left">
            <img className="mx-auto" src={GitGraph} alt="git-graph" />
        </FadeInBox>
        <TextSection>
            For example you can see how many commits you had last year or all the years before.<br />
            On top of that you can also compare your stats from different years.
        </TextSection>

        <TextSection>
            Currently wee offer many different graphs so your can gain the most insight
        </TextSection>
        <FadeInBox from="right">
            <img className="mx-auto" src={ChartGraph} alt="chart-graph" />
        </FadeInBox>
    </div>;
}


function TextSection(props: PropsWithChildren) {
    return <div className="grid place-content-center text-center">
        {props.children}
    </div>;
}


function ProviderGroupIcon() {
    return <div className="flex gap-2 justify-evenly">
        <img className="w-1/4 dark:invert" src={GitHubIconSrc} alt="GitHub" />
        <img className="w-1/4" src={BitbucketIconSrc} alt="Bitbucket" />
        <img className="w-1/4" src={GitLabIconSrc} alt="GitLab" />
    </div>;
}
