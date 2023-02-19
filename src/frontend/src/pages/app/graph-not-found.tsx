import { Link } from "react-router-dom";

export default function GraphNotFound() {
    return <div className="grid min-h-screen">
        <div className="m-auto text-center select-none">
            <h1 className="text-[5vw]">
                Graph Not Found
            </h1>
            <Link to="/app" className="hover:underline">
                Select Graph
            </Link>
        </div>
    </div>;
}
