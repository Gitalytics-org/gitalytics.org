import type { PropsWithChildren } from "react";


export default function BackendLink(props: PropsWithChildren<JSX.IntrinsicElements["a"]>) {
    return <a {...props}>{props.children}</a>;
}
