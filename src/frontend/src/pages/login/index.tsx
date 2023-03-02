import Footer from "~/components/Footer";
import BackendLink from "~/elements/BackendLink";
import GithubIconSrc from "@assets/github.png";
import BitbucketIconSrc from "@assets/bitbucket.png";
import GitlabIconSrc from "@assets/gitlab.png";


export default function LoginPage() {
    return <>
        <div className="w-screen h-screen flex flex-col">
            <h1 className="text-center text-[10vw] select-none">Login to <span className="text-gitalytics">Gitalytics</span></h1>
            <p className="opacity-50 text-center select-none">Please log in with your git platform of choice</p>
            <div className="grow flex justify-around gap-20 px-5">
                <BackendLink className="my-auto" href="/api/auth/github/login">
                    <img className="dark:invert" src={GithubIconSrc} alt="github" />
                    <p className="text-center opacity-50">Login via Github</p>
                </BackendLink>
                <BackendLink className="my-auto grayscale cursor-not-allowed" href="/api/auth/bitbucket/login" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={BitbucketIconSrc} alt="bitbucket" />
                    <p className="text-center opacity-50 line-through">Login via Bitbucket</p>
                </BackendLink>
                <BackendLink className="my-auto grayscale cursor-not-allowed" href="/api/auth/gitlab/login" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={GitlabIconSrc} alt="gitlab" />
                    <p className="text-center opacity-50 line-through">Login via Gitlab</p>
                </BackendLink>
            </div>
        </div>
        <Footer />
    </>;
}
