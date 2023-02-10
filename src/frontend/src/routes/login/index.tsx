import Footer from "~/components/Footer";
import GithubIconSrc from "./icons/github.png";
import BitbucketIconSrc from "./icons/bitbucket.png";
import GitlabIconSrc from "./icons/gitlab.png";
import { Link } from "react-router-dom";


export default function LoginPage() {
    return <>
        <div className="w-screen h-screen flex flex-col">
            <h1 className="text-center text-[10vw] select-none">Login to <span className="text-gitalytics">Gitalytics</span></h1>
            <p className="opacity-50 text-center select-none">select the git provider from which you want to login</p>
            <div className="grow flex justify-around gap-20 px-5">
                <Link className="my-auto" to="/api/auth/github/login/">
                    <img className="dark:invert" src={GithubIconSrc} alt="github" />
                    <p className="text-center opacity-50">Login via Github</p>
                </Link>
                <Link className="my-auto grayscale cursor-not-allowed"  to="/api/auth/bitbucket/login/" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={BitbucketIconSrc} alt="bitbucket" />
                    <p className="text-center opacity-50 line-through">Login via Bitbucket</p>
                </Link>
                <Link className="my-auto grayscale cursor-not-allowed"  to="/api/auth/gitlab/login/" onClick={(e) => e.preventDefault()} title="not available yet">
                    <img src={GitlabIconSrc} alt="gitlab" />
                    <p className="text-center opacity-50 line-through">Login via Gitlab</p>
                </Link>
            </div>
        </div>
        <Footer />
    </>;
}
