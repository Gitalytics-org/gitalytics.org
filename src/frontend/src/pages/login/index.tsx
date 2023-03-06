import Footer from "~/components/Footer";
import BackendLink from "~/elements/BackendLink";
import GithubIconSrc from "@assets/github.png";
import BitbucketIconSrc from "@assets/bitbucket.png";
import GitlabIconSrc from "@assets/gitlab.png";


export default function LoginPage() {
    return <>
        <div className="flex flex-col w-screen h-screen">
            <h1 className="text-center text-[10vw] select-none">Login to <span className="text-accent">Gitalytics</span></h1>
            <p className="text-center opacity-50 select-none">Please log in with your git platform of choice</p>
            <div className="flex justify-around gap-20 px-5 grow">
                <BackendLink className="my-auto" href="/api/auth/github/login">
                    <img className="dark:invert" src={GithubIconSrc} alt="github" />
                    <p className="text-center opacity-50">Login via Github</p>
                </BackendLink>
                <BackendLink className="my-auto cursor-not-allowed grayscale" href="/api/auth/bitbucket/login" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={BitbucketIconSrc} alt="bitbucket" />
                    <p className="text-center line-through opacity-50">Login via Bitbucket</p>
                </BackendLink>
                <BackendLink className="my-auto cursor-not-allowed grayscale" href="/api/auth/gitlab/login" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={GitlabIconSrc} alt="gitlab" />
                    <p className="text-center line-through opacity-50">Login via Gitlab</p>
                </BackendLink>
            </div>
        </div>
        <Footer />
    </>;
}
