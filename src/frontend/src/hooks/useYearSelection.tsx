import { useState } from "react";


interface YearSelectionProps {
    className?: string
    popupClassName?: string
    options: number[]
    selected: number[]
    setSelected: (x: number[]) => void
}

type useConfig = Omit<YearSelectionProps, "options" | "selected" | "setSelected">;

interface useReturnType {
    selected: number[]
    Component: () => JSX.Element
}


function getCurrentYear() {
    return new Date().getFullYear();
}

export default function useYearSelection(options: number[] | undefined, config?: useConfig): useReturnType {
    const [selected, setSelected] = useState(() => [getCurrentYear()]);

    return {
        selected: selected,
        Component: () => <YearSelection options={options ?? [getCurrentYear()]} selected={selected} setSelected={setSelected} {...config} />,
    };
}


export function YearSelection(props: YearSelectionProps) {
    const inactive = props.options
        .filter(e => !props.selected.includes(e))
        .sort((a, b) => b-a);

    return <div className="flex gap-1 select-none p-1 bg-secondary bg-opacity-10 rounded-lg">
        {props.selected
            .sort((a, b) => a-b)
            .map(year => <div key={year} className="px-2 bg-secondary bg-opacity-10 rounded-md">
                {year}
                <button className="opacity-40 hover:opacity-100 pl-1" onClick={() => props.setSelected(props.selected.filter(e => e !== year))}>X</button>
            </div>)
        }
        <div className="grow" />
        <div className="relative group">
            <div className="p-1 w-6 h-6 grid place-items-center bg-secondary text-primary rounded-full text-center align-middle leading-[100%]">+</div>
            <div className="flex-col gap-1 absolute top-[100%] right-0 py-1 px-2 bg-secondary bg-opacity-50 text-primary rounded-md hidden no-scrollbar group-hover:flex overflow-y-scroll max-h-40">
                {inactive.map(year => <button key={year} className="even:bg-opacity-10 odd:bg-opacity-5 hover:bg-opacity-30 bg-black px-2 rounded-md" onClick={() => props.setSelected(props.selected.concat(year))}>
                    {year}
                </button>)}
                {!inactive.length && <div className="opacity-50 whitespace-nowrap">
                    Nothing Here
                </div>}
            </div>
        </div>
    </div>;
}
