import AppIcon from "./AppIcon";
import UserIcon from "./UserIcon";
import SpaceSeparator from "./SpaceSeparator";
import LogoutButton from "./LogoutButton";
import DarkLightToggle from "./DarkLightToggle";
import GraphLandingPageLink from "./GraphLandingPageLink";


export default function MenuBar() {
    return <>
        <AppIcon />
        <UserIcon />
        <GraphLandingPageLink />
        <SpaceSeparator />
        <LogoutButton />
        <DarkLightToggle />
    </>;
}
