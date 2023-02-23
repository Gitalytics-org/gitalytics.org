import axios from "axios";
import { useQuery } from "react-query";


type GitalyticsStats = {
    total_workspaces: number
    total_repositories: number
    total_commits: number
}


export default function GitalyticsStatistics() {
    const query = useQuery<GitalyticsStats>(
        ["gitalytics-stats"],
        () => axios.get("/gitalytics-stats").then(response => response.data),
    );
    if (query.isError) {
        return <div>
            <p className="text-center">
                Failed to load stats about gitalytics
            </p>
        </div>;
    }

    return <div className="text-center select-none">
        <h2 className="text-[3vw]">Gitalytics Statistics</h2>
        <div className="flex justify-evenly">
            <div>
                <p className="text-[min(1rem,2vw)] opacity-50">Total Workspaces</p>
                <p className="text-[5vw]">{query.data?.total_workspaces.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-[min(1rem,2vw)] opacity-50">Total Repositories</p>
                <p className="text-[5vw]">{query.data?.total_repositories.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-[min(1rem,2vw)] opacity-50">Total Commits</p>
                <p className="text-[5vw]">{query.data?.total_commits.toLocaleString()}</p>
            </div>
        </div>
    </div>;
}
