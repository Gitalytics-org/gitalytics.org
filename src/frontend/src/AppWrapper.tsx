import { Chart as ChartJS, registerables } from "chart.js";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";

ChartJS.register(...registerables);

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
