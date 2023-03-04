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
        <Link to="/app" className="flex gap-2 p-1 mx-auto text-2xl rounded-full bg-accent w-fit h-14">
            <img className="h-full aspect-square" src={GraphIconSrc} alt="" />
            <span className="my-auto whitespace-nowrap">Show Statistics</span>
            <img className="h-full aspect-square" src={GraphIconSrc} alt="" />
        </Link>
    </div>;
}
