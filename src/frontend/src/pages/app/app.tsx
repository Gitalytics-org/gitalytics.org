import AppBody from "./appbody";
import MenuBar from "./menubar";


export default function AppPage() {
    return (
        <div className="bg-white text-black dark:bg-slate-800 dark:text-white transition-colors">
            <div className="w-14 hover:w-[min(250px,100%)] transition-[width] backdrop-blur-sm bg-black bg-opacity-20 h-screen overflow-x-clip fixed top-0 left-0 flex flex-col gap-2 p-1">
                <MenuBar />
            </div>
            <div className="min-h-screen p-2 ml-14">
                <AppBody />
            </div>
        </div>
    );
}
