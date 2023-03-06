import GitHubIconSrc from "@assets/github.png";
import BitbucketIconSrc from "@assets/bitbucket-alt.png";
import GitLabIconSrc from "@assets/gitlab-alt.png";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Fragment } from "react";


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

    const currentWorkspace = query.data!.active_workspace;

    return <>
        {/* active workspace */}
        <img src={currentWorkspace.logo_url} alt="" draggable={false} className="object-contain w-12 h-12 rounded-full mix-blend-color-burn" />
        <p className="w-full text-left select-none whitespace-nowrap">
            {currentWorkspace.name}
        </p>
        <a href={"https://github.com"} target="_blank" rel="noreferrer"  className="cursor-pointer">
            <ProviderIcon provider="GITHUB" className="h-6 pl-2 dark:invert" />
        </a>
        {/* small (optional) separator line */}
        {query.data!.other_workspaces.length > 0 && <div className="invisible w-4/5 h-px col-span-3 mx-auto bg-opacity-50 rounded-full group-hover:visible bg-secondary" />}
        {/* other workspaces */}
        {query.data!.other_workspaces
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(workspace => <Fragment key={workspace.name}>
                <img src={workspace.logo_url} alt="" draggable={false} className="object-contain w-12 h-12 rounded-full mix-blend-color-burn" />
                <button className="w-full text-left whitespace-nowrap" onClick={() => setWorkspace.mutate(workspace.name)}>
                    {workspace.name}
                </button>
                <a href={"https://github.com"} target="_blank" rel="noreferrer"  className="cursor-pointer">
                    <ProviderIcon provider="GITHUB" className="h-6 pl-2 dark:invert" />
                </a>
            </Fragment>)
        }
    </>;
}

type Provider = "GITHUB" | "BITBUCKET" | "GITLAB"

const providerIconMap: Record<string, string> = {
    GITHUB: GitHubIconSrc,
    BITBUCKET: BitbucketIconSrc,
    GITLAB: GitLabIconSrc,
};
interface ProviderIconProps extends Omit<JSX.IntrinsicElements["img"], "src" | "alt"> {
    provider: Provider
}

function ProviderIcon(props: ProviderIconProps) {
    return <img {...props} src={providerIconMap[props.provider]} alt="" draggable={false} />;
}
