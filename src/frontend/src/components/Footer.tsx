import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./RootDarkModeProvider";
import GitalyticsLogoSrc from "@assets/gitalytics.svg";
import DarkSrc from "@assets/dark.png";
import LightSrc from "@assets/light.png";
import DiscordIconSrc from "@assets/discord.png";


export default function Footer() {
    return <footer className="relative flex flex-col justify-center gap-1 py-1 from-transparent to-slate-300 dark:to-slate-900 bg-gradient-to-b">
        <SeparatorLine />
        <Links />
        <CopyRight />
        <DarkLightToggle />
    </footer>;
}

function SeparatorLine() {
    return <div className="h-1 mx-5 my-2 bg-opacity-50 rounded-md bg-fgc" />;
}

function Links() {
    const Dot = () => <div className="w-1 h-1 my-auto rounded-full bg-accent" />;

    return <div className="flex justify-center gap-1">
        <Link to="/" className="hover:underline">
            Home
        </Link>
        <Dot />
        <Link to={{pathname: "/", hash: "faq"}} className="hover:underline">
            FAQ
        </Link>
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
        <Dot />
        <Link to="https://discord.gg/vkKPtEtp9p" className="hover:underline">
            <img src={DiscordIconSrc} alt="" className="h-4 inline-block mr-1" />
            Discord
        </Link>
    </div>;
}

function CopyRight() {
    const Gitalytics = () => <Link to="https://github.com/Gitalytics-org/gitalytics.org" className="hover:underline">Gitalytics.org</Link>;
    const Github = () => <Link to="https://github.com" className="hover:underline">Github</Link>;
    const Bitbucket = () => <Link to="https://bitbucket.org/" className="hover:underline">Bitbucket</Link>;
    const GitLab = () => <Link to="https://about.gitlab.com/" className="hover:underline">GitLab</Link>;

    return <div className="text-center">
        <p>
            <Gitalytics /> is a tool to analyze all your Repositories from <Github />, <Bitbucket /> and <GitLab />
        </p>
        <small>&copy; Copyright { new Date().getFullYear() }, <Gitalytics /></small>
        <img className="w-10 h-10 mx-auto" src={GitalyticsLogoSrc} alt="logo" />
    </div>;
}


function DarkLightToggle() {
    const darkMode = useContext(DarkModeContext);

    return <button className="absolute w-10 h-10 rounded-full cursor-pointer left-5 bottom-5 dark:invert" onClick={darkMode.toggle} title="toggle dark-mode">
        <img src={darkMode.is ? DarkSrc : LightSrc} alt="" />
    </button>;
}
