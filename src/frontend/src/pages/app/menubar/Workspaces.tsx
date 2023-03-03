import GitIconSrc from "@assets/Github_Logo_Black.svg";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";


interface Workspace {
    name: string
    logo_url: string
}
interface GetWorkspaceResponse {
    active_workspace: Workspace
    other_workspaces: Workspace[]
}

export default function Workspaces() {
    const queryClient = useQueryClient();
    const query = useQuery<GetWorkspaceResponse>(
        ["get-workspaces"],
        () => axios
            .get<GetWorkspaceResponse>("/get-workspaces")
            .then(response => response.data),
    );
    const setWorkspace = useMutation(
        (workspace_name: string) => axios.put("/set-active-workspace", null, { params: { workspace_name } }),
        { onSuccess: () => {
            queryClient.invalidateQueries();
        } },
    );

    if (query.isLoading) {
        return null;
    }
    if (query.isError) {
        return <div className="col-span-3">Failed to load Workspaces</div>;
    }
    if (setWorkspace.isLoading) {
        return <div className="col-span-3">Changing Workspace</div>;
    }

    const Workspace = (ws: Workspace) => <>
        <img src={ws.logo_url} alt="" className="w-12 h-12 object-contain mix-blend-color-burn rounded-full" />
        <button className="whitespace-nowrap w-full text-left" onClick={() => setWorkspace.mutate(ws.name)}>
            {ws.name}
        </button>
        <a href={"https://github.com"} target="_blank" rel="noreferrer"  className="cursor-pointer">
            <img src={GitIconSrc} alt="" className="h-6 dark:invert pl-2" />
        </a>
    </>;

    return <>
        <Workspace {...query.data!.active_workspace} />
        {query.data?.other_workspaces.map(ws => <Workspace key={ws.name} {...ws} />)}
    </>;
}
