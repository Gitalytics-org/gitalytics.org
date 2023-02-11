import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter as Router, useLocation } from "react-router-dom";
import App from "./App";
import RootDarkModeProvider from "./components/RootDarkModeProvider";

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
            <Router>
                <RootDarkModeProvider>
                    <ScrollToTop />
                    <App />
                </RootDarkModeProvider>
            </Router>
        </QueryClientProvider>
    );
}

// react-router sometimes doesn't scrolls to top after page-change
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({left: 0, top: 0});
    }, [pathname]);

    return null;
}
