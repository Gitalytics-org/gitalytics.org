import axios from "axios";
import { useQuery } from "react-query";


export default function TestPage() {
    const query = useQuery(
        ["test"],
        () => axios.get("/commits-per-hour", { params: { year: 2023 } }),
    );
    // const query = useQuery(
    //     ["test"],
    //     () => axios.put("/set-active-workspace", null, { params: { workspace_name: "PlayerG9" } }),
    // );

    if (query.isLoading) {
        return <p>Loading...</p>;
    }
    return <p>
        <p>Error: {`${query.error}`}</p>
        <p>{JSON.stringify(query.data)}</p>
    </p>;
}
