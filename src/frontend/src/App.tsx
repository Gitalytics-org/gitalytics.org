import { QueryClient, QueryClientProvider } from "react-query";
import InfoLetter from "./components/InfoLetter";
import { MenuComponents } from "./menubar";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 300000, // 5min
            staleTime: 60000, // 1min
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
        },
    },
});


export default function AppWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}


export function App() {
    return (
        <div className="flex bg-white text-black dark:bg-slate-800 dark:text-white transition-colors">
            <div className="w-12 hover:w-[min(300px,100%)] transition-[width] backdrop-blur-sm bg-black bg-opacity-20 h-screen overflow-x-clip fixed top-0 left-0 flex flex-col gap-2 p-1">
                {MenuComponents.map((Comp, key) => <Comp key={key} />)}
            </div>
            <div className="w-screen min-h-screen pl-10">
                <h1 className="text-4xl text-center">
                    Hello World
                    <InfoLetter>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </InfoLetter>
                </h1>
            </div>
        </div>
    );
}
