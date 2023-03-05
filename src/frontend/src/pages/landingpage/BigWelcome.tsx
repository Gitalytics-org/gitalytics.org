import GitalyticsLogoSrc from "@assets/gitalytics_orange_dropshadow.svg";
import GoToAppPopup from "./GoToAppPopup";


export default function BigWelcome() {
    return <div className="relative w-screen h-screen">
        <img className="absolute left-0 w-auto h-full p-5 -translate-y-1/2 aspect-square top-1/2" src={GitalyticsLogoSrc} alt="" />
        <h1 className="text-[10vw] absolute top-1/2 left-1/2 -translate-y-1/2 backdrop-blur-sm -translate-x-1/2 sm:translate-x-0 select-none rounded-full">Gitalytics</h1>
        <GoToAppPopup />
    </div>;
}
