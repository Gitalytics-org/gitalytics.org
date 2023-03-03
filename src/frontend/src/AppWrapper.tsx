import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter as Router, useLocation } from "react-router-dom";
import axios from "axios";
import App from "~/App";
import RootDarkModeProvider from "~/components/RootDarkModeProvider";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15_000;  // 15s

ChartJS.register(...registerables);
// even if typescript says that 'colors' does not exist. it does!
// @ts-expect-error: fuck chartjs in combination with typescript
ChartJS.defaults.plugins.colors.forceOverride = true;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 300000, // 5min
            staleTime: 60000, // 1min
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});


export default function AppWrapper() {
    return (
        <Router>
            <ScrollToTop />
            <QueryClientProvider client={queryClient}>
                <RootDarkModeProvider>
                    <App />
                </RootDarkModeProvider>
            </QueryClientProvider>
        </Router>
    );
}

// react-router sometimes doesn't scrolls to top after page-change
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({left: 0, top: 0});
    }, [pathname]);

    return null;
}
