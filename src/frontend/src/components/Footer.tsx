import { Link, LinkProps } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import GitalyticsLogoSrc from "@assets/gitalytics.svg";
import DarkSrc from "@assets/dark.png";
import LightSrc from "@assets/light.png";
import { useContext } from "react";
import { DarkModeContext } from "./RootDarkModeProvider";


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

// special link to slightly indicate that it is a link
function DotLink(props: LinkProps) {
    return <Link {...props} className={`border-b-[1px] border-dotted hover:border-solid ${props.className}`} />;
}

function Links() {
    const Dot = () => <div className="w-1 h-1 my-auto rounded-full bg-accent" />;

    return <div className="flex justify-center gap-1">
        <DotLink to="/">
            Home
        </DotLink>
        <Dot />
        <HashLink smooth to={{pathname: "/", hash: "faq"}}>
            FAQ
        </HashLink>
        <Dot />
        <DotLink to="/about">
            About
        </DotLink>
        <Dot />
        <DotLink to="/contact">
            Contact
        </DotLink>
        <Dot />
        <DotLink to="/terms">
            Terms
        </DotLink>
        <Dot />
        <DotLink to="https://gitalytics-org.github.io/docs/" target="_blank">
            Docs
        </DotLink>
    </div>;
}

function CopyRight() {
    const Gitalytics = () => <DotLink to="https://github.com/Gitalytics-org/" target="_blank">Gitalytics.org</DotLink>;
    const Github = () => <DotLink to="https://github.com" target="_blank">Github</DotLink>;
    const Bitbucket = () => <DotLink to="https://bitbucket.org/" target="_blank">Bitbucket</DotLink>;
    const GitLab = () => <DotLink to="https://about.gitlab.com/" target="_blank">GitLab</DotLink>;

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
