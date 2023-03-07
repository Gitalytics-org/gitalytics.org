import { Link, type LinkProps, useLocation } from "react-router-dom";

interface Props extends Omit<LinkProps, "to"> {
    to: string,
}

export default function PreserveQueryLink(props: Props) {
    const location = useLocation();

    return <Link {...props} to={{pathname: props.to, search: location.search}}>{props.children}</Link>;
}
