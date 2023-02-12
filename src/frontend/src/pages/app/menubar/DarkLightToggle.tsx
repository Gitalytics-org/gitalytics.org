import { useContext } from "react";
import DarkSrc from "@assets/dark.png";
import LightSrc from "@assets/light.png";
import { DarkModeContext } from "~/components/RootDarkModeProvider";


export default function DarkLightToggle() {
    const darkMode = useContext(DarkModeContext);

    return <button className="flex gap-2 select-none items-center" onClick={darkMode.toggle}>
        <img src={darkMode.is ? DarkSrc : LightSrc} alt="" className="w-10 h-10 m-1 dark:invert" />
        <span className="whitespace-nowrap">
            {darkMode.is ? "Dark-Mode" : "Light-Mode"}
        </span>
    </button>;
}
