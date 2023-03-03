import LogoutIconSrc from "@assets/logout-icon.png";
import BackendLink from "~/elements/BackendLink";


export default function LogoutButton() {
    return <>
        <img src={LogoutIconSrc} alt="" className="w-10 h-10 m-1 dark:invert" />
        <BackendLink href="/api/auth/logout" className="whitespace-nowrap col-span-2">
            Logout
        </BackendLink>
    </>;
}
