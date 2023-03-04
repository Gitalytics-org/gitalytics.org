import { useState } from "react";
import { useLocation } from "react-router-dom";
import YearSelectionInput from "./YearSelection";
import YearSwitcherInput from "./YearSwitcher";

export enum YearInputModes {
    switcher,
    selection,
}

const modeMap = {
    [YearInputModes.switcher]: YearSwitcherInput,
    [YearInputModes.selection]: YearSelectionInput,
};

export default function YearInputHandler() {
    const location = useLocation();
    const defaultMode = (new URLSearchParams(location.search).getAll("year").length <= 1) ? YearInputModes.switcher : YearInputModes.selection;
    const [mode, setMode] = useState<YearInputModes>(defaultMode);

    const InputComponent = modeMap[mode];

    return <div className="flex flex-col gap-1 p-1">
        <Switch currentMode={mode} setMode={setMode} />
        <InputComponent key={mode} />
    </div>;
}


interface SwitchProps {
    currentMode: YearInputModes
    setMode: (m: YearInputModes) => void
}

function Switch({ currentMode, setMode }: SwitchProps) {
    const options: Array<[number, string]> = [
        [YearInputModes.selection, "Advanced"],
        [YearInputModes.switcher, "Simple"],
    ];

    return <div className="flex gap-2 py-px overflow-hidden text-xs rounded-lg justify-evenly bg-secondary bg-opacity-20">
        {options.map(([mode, text]) => {
            const isCurrent = mode === currentMode;
            return <button key={text} className="relative grid grow place-content-center" onClick={() => setMode(mode)} style={{cursor: isCurrent ? "default" : "pointer"}}>
                <div className="absolute inset-0 bg-secondary bg-opacity-20" style={{visibility: isCurrent ? "initial" : "hidden"}} />
                <div className="z-10">
                    {text}
                </div>
            </button>;
        })}
    </div>;
}
