import { Link } from "react-router-dom";
import GraphIconSrc from "@assets/graph-icon.png";
import useUser from "~/hooks/useUser";


export default function GoToAppPopup() {
    const user = useUser();

    if (!user) {
        return null;
    }

    return <Link to="/app" className="rounded-full bg-accent h-10 w-10 hover:w-40 flex fixed left-2 top-2 transition-[width] gap-1 overflow-hidden z-10 border border-primary">
        <img className="h-full aspect-square" src={GraphIconSrc} alt="" />
        <span className="whitespace-nowrap my-auto">Show Statistics</span>
    </Link>;
}
