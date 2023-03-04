import { useContext } from "react";
import DarkSrc from "@assets/dark.png";
import LightSrc from "@assets/light.png";
import { DarkModeContext } from "~/components/RootDarkModeProvider";


export default function DarkLightToggle() {
    const darkMode = useContext(DarkModeContext);

    return <>
        <img src={darkMode.is ? DarkSrc : LightSrc} alt="" draggable={false} className="w-10 h-10 m-1 dark:invert" />
        <button className="w-full col-span-2 text-left whitespace-nowrap" onClick={darkMode.toggle}>
            {darkMode.is ? "Dark-Mode" : "Light-Mode"}
        </button>
    </>;
}
