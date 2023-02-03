import AppIconSrc from "./icons/gitalytics_orange_dropshadow.svg";
import GitIconSrc from "./icons/Github_Logo_Black.svg";


export default function AppIcon() {
    return <div className="flex select-none gap-2 group items-center">
        <img src={AppIconSrc} alt="" className="w-12 h-12 " />
        <a href="https://github.com/konstantinlob/gitalytics.org#readme" target="_blank" rel="noreferrer"  className="whitespace-nowrap hover:underline grow">
            gitalytics.org
            <img src={GitIconSrc} alt="" className="h-6 dark:invert inline pl-2" />
        </a>
    </div>;
}
