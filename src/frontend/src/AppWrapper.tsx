import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter as Router, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import App from "~/App";
import RootDarkModeProvider from "~/components/RootDarkModeProvider";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15_000;  // 15s
// export const axiosRedirectInterceptor = axios.interceptors.response.use(null, (error) => {
//     if (error.response?.status === HTTP_401_UNAUTHORIZED) {
//         window.location.assign("/#/login");
//     }
//     return Promise.reject(error);
// });
// export const axiosRedirectInterceptor = axios.interceptors.response.use(null, (error) => {
//     console.log("Fucking what?")
//     return Promise.reject(error);
// });

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
            <AxiosRedirectInterceptor>
                <QueryClientProvider client={queryClient}>
                    <RootDarkModeProvider>
                        <App />
                    </RootDarkModeProvider>
                </QueryClientProvider>
            </AxiosRedirectInterceptor>
        </Router>
    );
}

function AxiosRedirectInterceptor({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            null,
            function(error){
                console.log("Hey", error);
                if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
                    navigate("/login");
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    return children;
}


// react-router sometimes doesn't scrolls to top after page-change
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({left: 0, top: 0});
    }, [pathname]);

    return null;
}
