import MenuBar from "./menubar";
import { Outlet } from "react-router";
import MutationOverlay from "./overlays/MutationOverlay";
import SessionIsInitializingOverlay from "./overlays/SessionIsInitializingOverlay";


export default function AppPage() {
    return <div className="text-black transition-colors bg-white dark:bg-slate-800 dark:text-white">
        <div className="group w-14 hover:w-[min(250px,100%)] transition-[width] backdrop-blur-sm bg-black bg-opacity-20 h-screen overflow-x-clip fixed top-0 left-0 flex flex-col gap-2 p-1 z-20">
            <MenuBar />
        </div>
        <div className="relative min-h-screen ml-14 flex flex-col">
            <Outlet />
        </div>
        <MutationOverlay />
        <SessionIsInitializingOverlay />
    </div>;
}

export * from "./subroutes";
