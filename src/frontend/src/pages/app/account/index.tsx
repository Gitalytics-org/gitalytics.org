import RemoveAccessLink from "./RemoveAccessLink";
import UserInfo from "./UserInfo";

export default function AccountInformation() {
    return <div className="flex flex-col gap-5 p-2">
        <UserInfo />
        <RemoveAccessLink />
    </div>;
}
