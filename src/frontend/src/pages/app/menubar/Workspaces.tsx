import GitHubIconSrc from "@assets/github.png";
import BitbucketIconSrc from "@assets/bitbucket-alt.png";
import GitLabIconSrc from "@assets/gitlab-alt.png";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";


enum GitPlatform {
    GITHUB = "GITHUB",
    BITBUCKET = "BITBUCKET",
    GITLAB = "GITLAB",
}

type WorkspaceType = {
    name: string
    logo_url: string
    platform: GitPlatform
}
type GetWorkspaceResponse = {
    active_workspace: WorkspaceType
    other_workspaces: WorkspaceType[]
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
        // eslint-disable-next-line camelcase
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

    return <>
        <ActiveWorkspace workspace={query.data!.active_workspace} />
        {query.data!.other_workspaces.length > 0 && <SeparatorLine />}
        {query.data!.other_workspaces
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(workspace => <OtherWorkspace key={workspace.name} workspace={workspace} activate={() => setWorkspace.mutate(workspace.name)} />)
        }
    </>;
}

type ActiveWorkspaceProps = { workspace: WorkspaceType }
function ActiveWorkspace({ workspace }: ActiveWorkspaceProps) {
    return <>
        <img src={workspace.logo_url} alt="" draggable={false} className="object-contain w-12 h-12 rounded-full mix-blend-color-burn" />
        <p className="w-full text-left select-none whitespace-nowrap">
            {workspace.name}
        </p>
        <a href={getGitPlatformLink(workspace.platform, workspace.name)} target="_blank" rel="noreferrer"  className="cursor-pointer">
            <GitPlatformIcon provider={workspace.platform} className="h-6 pl-2 dark:invert" />
        </a>
    </>;
}

function SeparatorLine() {
    return <div className="invisible w-4/5 h-px col-span-3 mx-auto bg-opacity-50 rounded-full group-hover:visible bg-fgc" />;
}

type OtherWorkspaceProps = { workspace: WorkspaceType, activate: () => void }
function OtherWorkspace({ workspace, activate }: OtherWorkspaceProps) {
    return <>
        <img src={workspace.logo_url} alt="" draggable={false} className="object-contain w-12 h-12 rounded-full mix-blend-color-burn" />
        <button className="w-full text-left whitespace-nowrap" onClick={activate}>
            {workspace.name}
        </button>
        <a href={getGitPlatformLink(workspace.platform, workspace.name)} target="_blank" rel="noreferrer"  className="cursor-pointer">
            <GitPlatformIcon provider={workspace.platform} className="h-6 pl-2 dark:invert" />
        </a>
    </>;
}

const providerIconMap: Record<string, string> = {
    [GitPlatform.GITHUB]: GitHubIconSrc,
    [GitPlatform.BITBUCKET]: BitbucketIconSrc,
    [GitPlatform.GITLAB]: GitLabIconSrc,
};
interface ProviderIconProps extends Omit<JSX.IntrinsicElements["img"], "src" | "alt"> {
    provider: GitPlatform
}

function GitPlatformIcon(props: ProviderIconProps) {
    return <img {...props} src={providerIconMap[props.provider]} alt="" draggable={false} />;
}

function getGitPlatformLink(provider: GitPlatform, workspace: string) {
    switch (provider) {
    case GitPlatform.GITHUB:
        return `https://github.com/${workspace}`;
    case GitPlatform.BITBUCKET:
        return `https://bitbucket.org/${workspace}`;
    case GitPlatform.GITLAB:
        return `https://gitlab.com/${workspace}`;
    default:
        return "";
    }
}
