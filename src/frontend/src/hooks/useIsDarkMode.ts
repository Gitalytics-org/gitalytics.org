import { useContext } from "react";
import { DarkModeContext } from "~/components/RootDarkModeProvider";

export default function useIsDarkMode(): boolean {
    return useContext(DarkModeContext).is;
}
