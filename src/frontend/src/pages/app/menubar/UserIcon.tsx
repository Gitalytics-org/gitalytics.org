import GitIconSrc from "@assets/Github_Logo_Black.svg";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";


interface UserMeType {
    login: string
    avatar_url: string
    html_url: string
    type: "User"
    blog: string
}

const request = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 15_000,  // 15s
});

export default function UserIcon() {
    const navigate = useNavigate();

    const query = useQuery(
        ["raw", "me"],
        () => request
            .get<UserMeType>("/raw/me")
            .then(
                response => response.data,
                () => navigate("/login"),
            ),
    );

    if (!query.isSuccess) {
        return null;
    }
    const user = query.data!;

    return <div className="flex select-none gap-2 group items-center">
        <img src={user.avatar_url} alt="" className="w-12 h-12 object-contain mix-blend-color-burn rounded-full" />
        <a href={user.html_url} target="_blank" rel="noreferrer"  className="whitespace-nowrap hover:underline grow">
            {user.login}
            <img src={GitIconSrc} alt="" className="h-6 dark:invert inline pl-2" />
        </a>
    </div>;
}
