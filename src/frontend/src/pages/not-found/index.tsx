import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
    const location = useLocation();

    return <div className="w-screen h-screen grid">
        <div className="m-auto text-center select-none flex flex-col gap-5">
            <h1 className="text-[8vw]">404 Not Found</h1>
            <p className="opacity-50">
                {location.pathname} was not found on this server
            </p>
            <Link to="/" className="hover:underline">
                Go Home
            </Link>
        </div>
    </div>;
}
