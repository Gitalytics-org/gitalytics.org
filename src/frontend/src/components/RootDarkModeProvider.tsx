// see: https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
import React, { useState } from "react";

interface DarkModeValue {
    is: boolean
    set: (is: boolean) => void
    toggle: () => void
}

const initialDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
export const DarkModeContext = React.createContext<DarkModeValue>({
    is: initialDark,
    set: () => undefined,
    toggle: () => undefined,
});
const DARK = "dark";
// const LIGHT = "light";


export default function RootDarkModeProvider(props: React.PropsWithChildren) {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains(DARK));

    function set(is: boolean) {
        if (is) {
            document.documentElement.classList.add(DARK);
        } else {
            document.documentElement.classList.remove(DARK);
        }
        setIsDark(is);
    }

    function toggle() {
        set(!isDark);
    }

    return <DarkModeContext.Provider value={{is: isDark, set: set, toggle: toggle}}>
        {props.children}
    </DarkModeContext.Provider>;
}
