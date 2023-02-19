import LogoutIconSrc from "@assets/logout-icon.png";
import AppLink from "~/elements/AppLink";


export default function LogoutButton() {
    return <div className="flex select-none gap-2 group items-center">
        <img src={LogoutIconSrc} alt="" className="w-10 h-10 m-1 dark:invert" />
        <AppLink href="/api/auth/logout" target="_blank" rel="noreferrer" className="whitespace-nowrap grow">
            Logout
        </AppLink>
    </div>;
}
