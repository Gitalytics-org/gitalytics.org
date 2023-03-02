import MenuBar from "./menubar";
import { Outlet } from "react-router";


export default function AppPage() {
    return <div className="bg-white text-black dark:bg-slate-800 dark:text-white transition-colors">
        <div className="w-14 hover:w-[min(250px,100%)] transition-[width] backdrop-blur-sm bg-black bg-opacity-20 h-screen overflow-x-clip fixed top-0 left-0 flex flex-col gap-2 p-1 z-20">
            <MenuBar />
        </div>
        <div className="min-h-screen ml-14 relative flex flex-col">
            <Outlet />
        </div>
    </div>;
}

export * from "./subroutes";
