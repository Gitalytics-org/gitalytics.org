import axios from "axios";
import { useQuery } from "react-query";


interface UserMeType {
    login: string
    avatar_url: string
    html_url: string
    type: "User"
    blog: string
}

export default function useUser() {
    const query = useQuery<UserMeType>(
        ["raw", "me"],
        () => axios.get<UserMeType>("/raw/me").then(response => response.data),
    );
    if (!query.isSuccess) {
        return null;
    }
    return query.data;
}
