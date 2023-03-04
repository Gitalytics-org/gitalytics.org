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
    const Element = (props: PropsWithChildren) => <div className="bg-fgc even:bg-opacity-5 odd:bg-opacity-10 p-1">{props.children}</div>;

    return <div className="border border-fgc min-w-[400px] text-center rounded-lg select-none">
        <h2 className="text-3xl p-1 bg-fgc bg-opacity-20 text-accent">
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
            <Link to={user ? "/app" : "/login"} className="w-3/4 mx-auto bg-accent bg-opacity-60 hover:bg-opacity-80 hover:w-4/5 transition-[width] rounded-lg block py-1">
                Do it now
            </Link>
        </Element>
    </div>;
}
