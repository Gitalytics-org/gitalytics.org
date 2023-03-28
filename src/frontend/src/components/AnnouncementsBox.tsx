import axios from "axios";
import { useQuery } from "react-query";

type Response = Array<{
    title: string
    message: string
    timestamp?: string
}>

export default function AnnouncementsBox() {
    const query = useQuery(
        ["announcements"],
        () => axios.get<Response>("/announcements").then(r => r.data),
    );

    if (!query.isSuccess || !query.data.length) return null;

    return <div className="mx-5 px-2 py-1 rounded-md border-2 border-yellow-500 bg-yellow-300 text-black select-none flex flex-col gap-3">
        {query.data.map(announcement => <div key={announcement.title} className="relative">
            <h2 className="text-xl ml-5">
                {announcement.title}
                {!!announcement.timestamp && <span className="opacity-50 text-xs float-right">{announcement.timestamp}</span>}
            </h2>
            <p className="opacity-90">{announcement.message}</p>
        </div>)}
    </div>;
}
