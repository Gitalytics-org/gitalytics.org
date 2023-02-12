import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter as Router, useLocation } from "react-router-dom";
import axios from "axios";
import App from "~/App";
import RootDarkModeProvider from "~/components/RootDarkModeProvider";
import { baseUrl, isProduction } from "./common";

axios.defaults.baseURL = `${baseUrl}/api`;
axios.defaults.withCredentials = !isProduction;
axios.defaults.timeout = 30_000;  // 30s

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
