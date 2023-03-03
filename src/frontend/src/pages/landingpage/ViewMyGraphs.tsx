import { Link } from "react-router-dom";
import GraphIconSrc from "@assets/graph-icon.png";
import axios from "axios";
import { useQuery } from "react-query";


export default function ViewMyGraphs() {
    const query = useQuery(
        ["is-logged-in"],
        () => axios.get("/auth/am-i-logged-in").then(response => response.data),
    );

    if (!query.isSuccess || !query.data.answer) {
        return null;
    }

    return <div>
        <Link to="/app" className="rounded-full bg-accent w-fit h-14 mx-auto flex gap-2 text-2xl p-1">
            <img className="h-full aspect-square" src={GraphIconSrc} alt="" />
            <span className="whitespace-nowrap my-auto">Show Statistics</span>
            <img className="h-full aspect-square" src={GraphIconSrc} alt="" />
        </Link>
    </div>;
}
