import AvatarIconSrc from "@assets/default-avatar-transparent.svg";
import { Link } from "react-router-dom";

export default function AccountLink() {
    return <>
        <img src={AvatarIconSrc} alt="" draggable={false} className="w-12 h-12" />
        <Link to="/app/account" className="whitespace-nowrap col-span-2">
            Account
        </Link>
    </>;
}
