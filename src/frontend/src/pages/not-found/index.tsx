import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// escapes the router and thus forces the static 404.html
export default function NotFound() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.location.assign(pathname);
    }, [pathname]);

    return null;
}
