import Footer from "~/components/Footer";
import AppLink from "~/elements/AppLink";
import GithubIconSrc from "./icons/github.png";
import BitbucketIconSrc from "./icons/bitbucket.png";
import GitlabIconSrc from "./icons/gitlab.png";


export default function LoginPage() {
    return <>
        <div className="w-screen h-screen flex flex-col">
            <h1 className="text-center text-[10vw] select-none">Login to <span className="text-gitalytics">Gitalytics</span></h1>
            <p className="opacity-50 text-center select-none">select the git provider from which you want to login</p>
            <div className="grow flex justify-around gap-20 px-5">
                <AppLink className="my-auto" href="/api/auth/github/login/">
                    <img className="dark:invert" src={GithubIconSrc} alt="github" />
                    <p className="text-center opacity-50">Login via Github</p>
                </AppLink>
                <AppLink className="my-auto grayscale cursor-not-allowed" href="/api/auth/bitbucket/login/" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={BitbucketIconSrc} alt="bitbucket" />
                    <p className="text-center opacity-50 line-through">Login via Bitbucket</p>
                </AppLink>
                <AppLink className="my-auto grayscale cursor-not-allowed" href="/api/auth/gitlab/login/" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={GitlabIconSrc} alt="gitlab" />
                    <p className="text-center opacity-50 line-through">Login via Gitlab</p>
                </AppLink>
            </div>
        </div>
        <Footer />
    </>;
}
