import AppIconSrc from "./icons/vite.svg";
import GitIconSrc from "./icons/Github_Logo_Black.svg";


export default function AppIcon() {
    return <a href="https://github.com/konstantinlob/gitalytics.org#readme" target="_blank" rel="noreferrer" className="flex select-none gap-2 group items-center">
        <img src={AppIconSrc} alt="" className="w-10 h-10" />
        <div className="whitespace-nowrap group-hover:underline">
            gitalytics.org
        </div>
        <img src={GitIconSrc} alt="" className="h-6 dark:invert" />
    </a>;
}
