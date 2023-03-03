import AppIconSrc from "@assets/gitalytics_orange_dropshadow.svg";
import GitIconSrc from "@assets/Github_Logo_Black.svg";
import { Link } from "react-router-dom";


export default function AppIcon() {
    return <>
        <img src={AppIconSrc} alt="" className="w-12 h-12" />
        <Link to="/"  className="whitespace-nowrap">
            gitalytics.org
        </Link>
        <a href="https://github.com/konstantinlob/gitalytics.org#readme" target="_blank" rel="noreferrer"  className="cursor-pointer">
            <img src={GitIconSrc} alt="" className="h-6 dark:invert" />
        </a>
    </>;
}
