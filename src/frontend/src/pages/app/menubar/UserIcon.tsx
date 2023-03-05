import GitIconSrc from "@assets/Github_Logo_Black.svg";
import useUser from "~/hooks/useUser";


export default function UserIcon() {
    const user = useUser();

    if (!user) {
        return null;
    }

    return <div className="flex items-center gap-2 select-none group">
        <img src={user.avatar_url} alt="" className="object-contain w-12 h-12 rounded-full mix-blend-color-burn" />
        <a href={user.html_url} target="_blank" rel="noreferrer"  className="whitespace-nowrap hover:underline grow">
            {user.login}
            <img src={GitIconSrc} alt="" className="inline h-6 pl-2 dark:invert" />
        </a>
    </div>;
}
