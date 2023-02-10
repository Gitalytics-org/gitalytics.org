import type { PropsWithChildren } from "react";


interface Props extends PropsWithChildren {
    className?: string
    selectable?: boolean
}

// note: if pointer event=none hover is not recognized and the popup disappears
export default function InfoLetter(props: Props) {
    return (
        <span className={`group relative cursor-default mx-1 ${props.className}`}>
            ⓘ
            <div className="bg-accent w-5 h-5 group-hover:visible invisible left-1/2 absolute z-40 rotate-45 top-full -translate-x-1/2" style={{pointerEvents: props.selectable === true ? "initial" : "none"}} />
            <div className="invisible group-hover:visible absolute top-full mt-2 left-1/2 w-max z-50 max-w-[25vw] -translate-x-1/2 text-sm border-2 border-accent border-opacity-50 bg-primary py-1 px-2 rounded-md" style={{pointerEvents: props.selectable === true ? "initial" : "none"}}>
                {props.children}
            </div>
        </span>
    );
}
