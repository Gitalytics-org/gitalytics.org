import type { PropsWithChildren } from "react";

export default function InfoLetter(props: PropsWithChildren) {
    return (
        <span className="group relative cursor-default">
            ⓘ
            <div className="bg-black w-5 h-5 group-hover:visible invisible left-1/2 absolute z-40 rotate-45 top-full -translate-x-1/2" />
            <div className="invisible group-hover:visible absolute top-full mt-2 left-1/2 w-max z-50 max-w-[30vw] -translate-x-1/2 text-sm border border-black bg-white">
                {props.children}
            </div>
        </span>
    );
}
