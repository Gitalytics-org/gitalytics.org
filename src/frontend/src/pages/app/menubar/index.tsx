import AppIcon from "./AppIcon";
import UserIcon from "./UserIcon";
import SpaceSeparator from "./SpaceSeparator";
import LogoutButton from "./LogoutButton";
import DarkLightToggle from "./DarkLightToggle";


export default function MenuBar() {
    return <>
        <AppIcon />
        <UserIcon />
        <SpaceSeparator />
        <LogoutButton />
        <DarkLightToggle />
    </>;
}
