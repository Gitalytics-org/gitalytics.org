import LogoutIconSrc from "@assets/logout-icon.png";
import AppLink from "~/elements/AppLink";


export default function LogoutButton() {
    return <div className="flex items-center gap-2 select-none group">
        <img src={LogoutIconSrc} alt="" className="w-10 h-10 m-1 dark:invert" />
        <AppLink href="/api/auth/logout" className="whitespace-nowrap grow">
            Logout
        </AppLink>
    </div>;
}
