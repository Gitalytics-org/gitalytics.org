import GitalyticsLogoSrc from "@assets/gitalytics_orange_dropshadow.svg";
import GoToAppPopup from "./GoToAppPopup";


export default function BigWelcome() {
    return <div className="w-screen h-screen relative">
        <img className="h-full w-auto aspect-square absolute left-0 top-1/2 -translate-y-1/2 p-5" src={GitalyticsLogoSrc} alt="" />
        <h1 className="text-[10vw] absolute top-1/2 left-1/2 -translate-y-1/2 backdrop-blur-sm -translate-x-1/2 sm:translate-x-0 select-none rounded-full">Gitalytics</h1>
        <GoToAppPopup />
    </div>;
}
