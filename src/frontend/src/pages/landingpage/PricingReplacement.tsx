import { Link } from "react-router-dom";


export default function PricingReplacement() {
    return <div className="flex flex-col gap-5">
        <Link to={"/login"} className="w-3/4 text-xl mx-auto bg-accent bg-opacity-50 hover:bg-opacity-70 rounded-lg block py-1 text-center duration-300 transition-transform hover:scale-105">
            Login and view your graphs
        </Link>
    </div>;
}
