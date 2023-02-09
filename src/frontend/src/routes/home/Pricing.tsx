import { Link } from "react-router-dom";
import FadeInBox from "~/elements/FadeInBox";


export default function Pricing() {
    return <div className="flex justify-around">
        <FadeInBox>
            <FreeTier />
        </FadeInBox>
    </div>;
}


function FreeTier() {
    return <div className="border border-slate-300 min-w-[400px] text-center rounded-lg select-none">
        <h2 className="text-3xl text-gitalytics bg-slate-300 p-1">Free Tier</h2>
        <div className="bg-slate-200 p-1">All your Repositories</div>
        <div className="bg-slate-100 p-1">Insights over the full history</div>
        <div className="bg-slate-200 p-1">Many Graphs</div>
        <div className="bg-slate-100 p-1">
            <Link to="/login" className="w-3/4 mx-auto bg-gitalytics bg-opacity-40 hover:bg-opacity-70 rounded-lg block py-1">
                Do it now
            </Link>
        </div>
    </div>;
}
