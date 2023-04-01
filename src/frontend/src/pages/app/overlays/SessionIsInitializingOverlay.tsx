import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import LogoSrc from "@assets/gitalytics.svg";
import CrossSrc from "./cross.svg";


export default function SessionIsInitializingOverlay() {
    const [ignoreThis, setIgnore] = useState(false);
    const queryClient = useQueryClient();

    const query = useQuery(
        ["is-session-ready"],
        () => axios.get("/is-session-ready"),
        { retryDelay: 5_000, onSuccess: () => queryClient.resetQueries({
            predicate: (query) => query.queryKey[0] !== "is-session-ready",
        }) },
    );

    if (ignoreThis || query.isSuccess) return null;

    return <div className="fixed inset-0 z-50 grid bg-black bg-opacity-40 backdrop-blur-sm place-content-center">
        <button className="absolute w-5 h-5 transition-opacity top-5 right-5 opacity-30 hover:opacity-100 dark:invert" title="close at your own risk" onClick={() => setIgnore(true)}>
            <img src={CrossSrc} alt="X" />
        </button>
        {query.isError ?
            <div className="flex flex-col gap-1">
                <span className="text-[4vw] max-w-[50vw] text-center">
                    Oops, something went wrong.
                </span>
                <span className="text-[2vw] max-w-[50vw] text-center opacity-50">
                    This is on us. Don&apos;t worry, it&apos;s not your fault.<br/>
                    Try reloading the page and please contact us if that doesn&apos;t work.
                </span>
            </div>
            :
            <div>
                <img className="h-[10vh] animate-pulse mx-auto" src={LogoSrc} alt="" />
                <span className="text-[4vw] max-w-[50vw] text-center">
                    Please wait while your data is being loaded
                </span>
            </div>
        }
    </div>;
}
