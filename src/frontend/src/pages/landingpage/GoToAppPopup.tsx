import { Link } from "react-router-dom";
import GraphIconSrc from "@assets/graph-icon.png";
import axios from "axios";
import { useQuery } from "react-query";


export default function GoToAppPopup() {
    const query = useQuery(
        ["is-logged-in"],
        () => axios.get("/auth/am-i-logged-in").then(response => response.data),
    );

    if (!query.isSuccess || !query.data.answer) {
        return null;
    }

    return <Link to="/app" className="rounded-full bg-accent h-10 w-10 hover:w-40 flex fixed left-2 top-2 transition-[width] gap-1 overflow-hidden z-10 border border-primary">
        <img className="h-full aspect-square" src={GraphIconSrc} alt="" />
        <span className="my-auto whitespace-nowrap">Show Statistics</span>
    </Link>;
}
