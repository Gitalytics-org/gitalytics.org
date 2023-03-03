import { Link } from "react-router-dom";
import GraphIconSrc from "@assets/graph-icon.png";
import axios from "axios";
import { useQuery } from "react-query";


// const request = axios.create({
//     baseURL: "/api",
//     withCredentials: true,
//     timeout: 10_000,  // 10s
// });
// request.interceptors.request.use((ka) => {
//     console.log(ka)
//     return ka;
// });
// request.interceptors.response.use(response => {
//     console.log(response);
//     return response;
// }, error => {
//     console.log(error);
//     return error;
// });


export default function GoToAppPopup() {
    const query = useQuery(
        ["raw", "me"],
        () => axios.get("/raw/me"),
    );

    if (!query.isSuccess) {
        return null;
    }

    return <Link to="/app" className="rounded-full bg-accent h-10 w-10 hover:w-40 flex fixed left-2 top-2 transition-[width] gap-1 overflow-hidden z-10 border border-primary">
        <img className="h-full aspect-square" src={GraphIconSrc} alt="" />
        <span className="whitespace-nowrap my-auto">Show Statistics</span>
    </Link>;
}
