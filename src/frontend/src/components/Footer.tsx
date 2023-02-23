import { Link } from "react-router-dom";
import GitalyticsLogoSrc from "@assets/gitalytics_orange_dropshadow.svg";
import DarkSrc from "@assets/dark.png";
import LightSrc from "@assets/light.png";
import { useContext } from "react";
import { DarkModeContext } from "./RootDarkModeProvider";


export default function Footer() {
    return <div className="flex flex-col justify-center from-transparent to-slate-300 dark:to-slate-700 bg-gradient-to-b relative">
        <SeparatorLine />
        <Links />
        <CopyRight />
        <DarkLightToggle />
    </div>;
}

function SeparatorLine() {
    return <div className="bg-secondary bg-opacity-50 h-1 rounded-md mx-5 my-2" />;
}

function Links() {
    const Dot = () => <div className="w-1 h-1 rounded-full my-auto bg-accent" />;

    return <div className="flex gap-1 justify-center">
        <Link to="/" className="hover:underline">
            Home
        </Link>
        {/* <Dot />
        <Link to={{pathname: "/", hash: "faq"}} className="hover:underline">
            FAQ
        </Link> */}
        <Dot />
        <Link to="/about" className="hover:underline">
            About
        </Link>
        <Dot />
        <Link to="/contact" className="hover:underline">
            Contact
        </Link>
        <Dot />
        <Link to="/terms" className="hover:underline">
            Terms
        </Link>
    </div>;
}

function CopyRight() {
    const Github = () => <Link to="https://github.com" className="hover:underline">Github</Link>;
    const Bitbucket = () => <Link to="https://bitbucket.org/" className="hover:underline">Bitbucket</Link>;
    const Gitlab = () => <Link to="https://about.gitlab.com/" className="hover:underline">Gitlab</Link>;

    return <div>
        <p className="text-center">
            Gitalytics is a tool to analyze all your Repositories from <Github />, <Bitbucket /> and <Gitlab />
        </p>
        <img className="w-10 h-10 mx-auto" src={GitalyticsLogoSrc} alt="logo" />
    </div>;
}


function DarkLightToggle() {
    const darkMode = useContext(DarkModeContext);

    return <button className="absolute left-5 bottom-5 w-10 h-10 dark:invert rounded-full cursor-pointer" onClick={darkMode.toggle} title="toggle dark-mode">
        <img src={darkMode.is ? DarkSrc : LightSrc} alt="" />
    </button>;
}
