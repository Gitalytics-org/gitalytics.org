import FadeInBox from "~/elements/animations/FadeInBox";
import { type PropsWithChildren } from "react";
import GitHubIconSrc from "@assets/github.png";
import BitbucketIconSrc from "@assets/bitbucket.png";
import GitLabIconSrc from "@assets/gitlab.png";
import CodeBoxSrc from "./images/code-box.svg";
import GitGraph from "./images/activity-graph.png";
// import ChartGraph from "./images/line-graph.png";


export default function WhatIsThis() {
    return <div className="grid grid-cols-2 gap-10 p-2">
        <FadeInBox from="left">
            <ProviderGroupIcon />
        </FadeInBox>
        <TextSection>
            We offer workspace analysis for GitHub, Bitbucket and GitLab*<br/>
            <small className="opacity-50">*Bitbucket and GitLab are under development</small>
        </TextSection>

        <TextSection>
            Instead of analyzing only one repository, we can analyze an entire workspace <span className="opacity-5">A feature, that many other products lack</span>
        </TextSection>
        <FadeInBox from="right">
            <img className="mx-auto max-h-64" src={CodeBoxSrc} alt="Code-Box" />
        </FadeInBox>

        <FadeInBox from="left">
            <img className="mx-auto" src={GitGraph} alt="git-graph" />
        </FadeInBox>
        <TextSection>
            Our variety of graphs help you analyze your coding behavior in your Workspaces.<br />
            Moreover, you can compare your statistics between years.
        </TextSection>

        {/* <TextSection>
            Currently wee offer many different graphs so your can gain the most insight
        </TextSection>
        <FadeInBox from="right">
            <img className="mx-auto" src={ChartGraph} alt="chart-graph" />
        </FadeInBox> */}
    </div>;
}


function TextSection(props: PropsWithChildren) {
    return <div className="grid text-center place-content-center">
        {props.children}
    </div>;
}


function ProviderGroupIcon() {
    return <div className="flex gap-2 justify-evenly">
        <img className="w-1/4 dark:invert" src={GitHubIconSrc} alt="GitHub" />
        <img className="w-1/4 cursor-not-allowed grayscale" src={BitbucketIconSrc} alt="Bitbucket" title="Not Available yet" />
        <img className="w-1/4 cursor-not-allowed grayscale" src={GitLabIconSrc} alt="GitLab" title="Not Available yet" />
    </div>;
}
