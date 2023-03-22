import AppIcon from "./AppIcon";
import LogoutButton from "./LogoutButton";
import DarkLightToggle from "./DarkLightToggle";
import GraphLandingPageLink from "./GraphLandingPageLink";
import Workspaces from "./Workspaces";
import AccountLink from "./AccountLink";


export default function MenuBar() {
    const MenuGrid = ({ children }: { children: JSX.Element[] }) => <div className="grid grid-cols-[3.5rem,1fr,auto] items-center gap-2">{children}</div>;
    const EmptySpace = () => <div className="grow" />;

    return <div className="flex flex-col h-full select-none">
        <MenuGrid>
            <AppIcon />
            <GraphLandingPageLink />
            <Workspaces />
        </MenuGrid>
        <EmptySpace />
        <MenuGrid>
            <AccountLink />
            <LogoutButton />
            <DarkLightToggle />
        </MenuGrid>
    </div>;
}
