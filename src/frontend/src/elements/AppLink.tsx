import type { PropsWithChildren } from "react";
import { baseUrl } from "~/common";


export default function AppLink(props: PropsWithChildren<JSX.IntrinsicElements["a"]>) {
    return <a {...props} href={`${baseUrl}${props.href}`}>{props.children}</a>;
}
