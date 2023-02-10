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
    return <div className="border border-secondary min-w-[400px] text-center rounded-lg select-none">
        <h2 className="text-3xl text-gitalytics p-1 bg-secondary bg-opacity-20 text-accent">Free Tier</h2>
        <div className="bg-secondary bg-opacity-5 p-1">All your Repositories</div>
        <div className="bg-secondary bg-opacity-10 p-1">Insights over the full history</div>
        <div className="bg-secondary bg-opacity-5 p-1">Many Graphs</div>
        <div className="bg-secondary bg-opacity-10 p-1">
            <Link to="/login" className="w-3/4 mx-auto bg-accent bg-opacity-40 hover:bg-opacity-70 rounded-lg block py-1">
                Do it now
            </Link>
        </div>
    </div>;
}
