import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import FadeInBox from "~/elements/FadeInBox";
import InfoLetter from "~/elements/InfoLetter";
import useUser from "~/hooks/useUser";


export default function Pricing() {
    return <div className="flex justify-around">
        <FadeInBox>
            <FreeTier />
        </FadeInBox>
    </div>;
}


function FreeTier() {
    const user = useUser();
    const Element = (props: PropsWithChildren) => <div className="p-1 bg-secondary even:bg-opacity-5 odd:bg-opacity-10">{props.children}</div>;

    return <div className="border border-secondary min-w-[400px] text-center rounded-lg select-none">
        <h2 className="p-1 text-3xl text-gitalytics bg-secondary bg-opacity-20 text-accent">
            Free Tier
        </h2>
        <Element>
            All your Repositories
            <InfoLetter>
                You can see information about all of your public repositories.
                (we need access to Analyse them)
            </InfoLetter>
        </Element>
        <Element>
            Insights over the full history
            <InfoLetter>
                we don&apos;t Analyse only your last year or so, but your whole history of your repositories
            </InfoLetter>
        </Element>
        <Element>
            Many Graphs
            <InfoLetter>
                We have many different graphs for you to see information about your activity.
            </InfoLetter>
        </Element>
        <Element>
            <Link to={user ? "/app" : "/login"} className="block w-3/4 py-1 mx-auto rounded-lg bg-accent bg-opacity-40 hover:bg-opacity-70">
                Do it now
            </Link>
        </Element>
    </div>;
}
