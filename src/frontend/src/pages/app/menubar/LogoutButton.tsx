import LogoutIconSrc from "@assets/logout-icon.png";
import Anchor from "~/elements/BackendLink";


export default function LogoutButton() {
    return <>
        <img src={LogoutIconSrc} alt="" draggable={false} className="w-10 h-10 m-1 dark:invert" />
        <Anchor href="/api/auth/logout" className="col-span-2 whitespace-nowrap">
            Logout
        </Anchor>
    </>;
}
