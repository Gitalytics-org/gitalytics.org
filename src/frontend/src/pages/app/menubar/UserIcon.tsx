import GitIconSrc from "@assets/Github_Logo_Black.svg";
import useUser from "~/hooks/useUser";


export default function UserIcon() {
    const user = useUser();

    if (!user) {
        return null;
    }

    return <div className="flex select-none gap-2 group items-center">
        <img src={user.avatar_url} alt="" className="w-12 h-12 object-contain mix-blend-color-burn rounded-full" />
        <a href={user.html_url} target="_blank" rel="noreferrer"  className="whitespace-nowrap hover:underline grow">
            {user.login}
            <img src={GitIconSrc} alt="" className="h-6 dark:invert inline pl-2" />
        </a>
    </div>;
}
