import { Route, Routes } from "react-router-dom";
import AboutPage from "~/pages/about";
import AppPage, { getAppRoutes } from "~/pages/app";
import ContactPage from "~/pages/contact";
import LandingPage from "~/pages/landingpage";
import LoginPage from "~/pages/login";
import TermsPage from "~/pages/terms";
import NotFound from "~/pages/not-found";
import TestPage from "./pages/test";


export default function App() {
    return <div className="bg-bgc text-fgc transition-colors duration-500 min-h-screen">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/app" element={<AppPage />}>
                {getAppRoutes()}
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/testing" element={<TestPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>;
}
