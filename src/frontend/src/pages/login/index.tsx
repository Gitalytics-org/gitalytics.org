import Footer from "~/components/Footer";
import Anchor from "~/elements/BackendLink";
import FadeInBox from "~/elements/animations/FadeInBox";
import GitHubIconSrc from "@assets/github.png";
import BitbucketIconSrc from "@assets/bitbucket.png";
import GitLabIconSrc from "@assets/gitlab.png";
import HomeIconSrc from "@assets/home-icon.png";
import { Link } from "react-router-dom";


export default function LoginPage() {
    return <>
        <div className="relative flex flex-col h-screen">
            <h1 className="text-center text-[10vw] select-none">Login to <span className="text-accent">Gitalytics</span></h1>
            <p className="text-center opacity-50 select-none">Please log in with your git platform of choice</p>
            <div className="flex justify-around gap-20 px-5 grow">
                <FadeInBox from="bottom" duration={1.0} delay={0} className="my-auto">
                    <Anchor className="my-auto" href="/api/auth/github/login">
                        <img className="dark:invert" src={GitHubIconSrc} alt="github" />
                        <p className="text-center opacity-50">Login via Github</p>
                    </Anchor>
                </FadeInBox>
                <FadeInBox from="bottom" duration={1.0} delay={0.1} className="my-auto">
                    <Anchor className="my-auto cursor-not-allowed grayscale" href="/api/auth/bitbucket/login" onClick={(e) => e.preventDefault()} title="not available yet">
                        <img src={BitbucketIconSrc} alt="bitbucket" />
                        <p className="text-center line-through opacity-50">Login via Bitbucket</p>
                    </Anchor>
                </FadeInBox>
                <FadeInBox from="bottom" duration={1.0} delay={0.2} className="my-auto">
                    <Anchor className="my-auto cursor-not-allowed grayscale" href="/api/auth/gitlab/login" onClick={(e) => e.preventDefault()} title="not available yet">
                        <img src={GitLabIconSrc} alt="gitlab" />
                        <p className="text-center line-through opacity-50">Login via Gitlab</p>
                    </Anchor>
                </FadeInBox>
            </div>
            <Link to="/" className="w-10 border border-white rounded-full p-1 absolute left-1 bottom-1 opacity-50 hover:opacity-100">
                <img className="w-full dark:invert" src={HomeIconSrc} alt="" />
            </Link>
        </div>
        <Footer />
    </>;
}
