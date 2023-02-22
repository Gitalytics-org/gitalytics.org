import { Link } from "react-router-dom";

export default  function GraphLandingPage() {
    return <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-[repeat(auto-fill,minmax(250px,auto))]">
        <div className="mx-auto select-none col-span-full">
            <h1 className="text-[5vw]">Available Graphs</h1>
        </div>
        <div className="border border-black grid">
            <Link className="m-auto" to="./commits-per-day">Commit per Day</Link>
        </div>
    </div>;
}
