import axios from "axios";
import { useQuery } from "react-query";
import Anchor from "~/elements/Anchor";

type RawMeType = {
    login: string
    avatar_url: string
    blog: string
}

export default function UserInfo() {
    const query = useQuery(
        ["raw", "me"],
        () => axios.get<RawMeType>("/raw/me").then(response => response.data),
    );

    return <div className="flex gap-x-2">
        <img src={query.data?.avatar_url} alt="Avatar" className="object-contain w-20 h-20 rounded-full" />
        <div className="grow grid grid-cols-[auto,1fr] gap-x-1">
            <span>User:</span>
            <span>{query.data?.login}</span>
            <span>Blog:</span>
            <span>
                {query.data?.blog ?
                    <Anchor href={query.data?.blog} className="text-blue-500 break-words hover:underline">{query.data?.blog}</Anchor>
                    :
                    <span className="opacity-50">There is no blog</span>
                }
            </span>
        </div>
    </div>;
}
