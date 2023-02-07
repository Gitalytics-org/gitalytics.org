import { useState } from "react";
import DarkSrc from "@assets/dark.png";
import LightSrc from "@assets/light.png";


export default function DarkLightToggle() {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

    function toggle() {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }

    return <button className="flex gap-2 select-none items-center" onClick={toggle}>
        <img src={isDark ? DarkSrc : LightSrc} alt="" className="w-10 h-10 m-1 dark:invert" />
        <span className="whitespace-nowrap">
            {isDark ? "Dark-Mode" : "Light-Mode"}
        </span>
    </button>;
}
