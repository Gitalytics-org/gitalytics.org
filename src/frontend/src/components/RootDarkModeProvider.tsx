// see: https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
import React, { useState } from "react";

interface DarkModeValue {
    is: boolean
    set: (is: boolean) => void
    toggle: () => void
}

const DARK = "dark";
// const LIGHT = "light";
const STORAGE_KEY = "dark-mode";

const initialDark = !!(localStorage.getItem(STORAGE_KEY) ?? window.matchMedia("(prefers-color-scheme: dark)").matches);
if (initialDark) {
    document.documentElement.classList.add(DARK);
}
export const DarkModeContext = React.createContext<DarkModeValue>({
    is: initialDark,
    set: () => undefined,
    toggle: () => undefined,
});


export default function RootDarkModeProvider(props: React.PropsWithChildren) {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains(DARK));

    function set(is: boolean) {
        if (is) {
            document.documentElement.classList.add(DARK);
            localStorage.setItem(STORAGE_KEY, "1");
        } else {
            document.documentElement.classList.remove(DARK);
            localStorage.removeItem(STORAGE_KEY);
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
