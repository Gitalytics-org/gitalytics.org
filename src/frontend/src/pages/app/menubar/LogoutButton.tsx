import LogoutIconSrc from "@assets/logout-icon.png";
import BackendLink from "~/elements/BackendLink";


export default function LogoutButton() {
    return <div className="flex select-none gap-2 group items-center">
        <img src={LogoutIconSrc} alt="" className="w-10 h-10 m-1 dark:invert" />
        <BackendLink href="/api/auth/logout" className="whitespace-nowrap grow">
            Logout
        </BackendLink>
    </div>;
}
