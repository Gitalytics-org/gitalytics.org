import { Route, Routes } from "react-router-dom";
import AboutPage from "~/pages/about";
import AppPage from "~/pages/app/app";
import ContactPage from "~/pages/contact";
import LandingPage from "~/pages/landingpage";
import LoginPage from "~/pages/login";
import TermsPage from "~/pages/terms";


export default function App() {
    return <div className="bg-primary text-secondary transition-colors duration-500">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
        </Routes>
    </div>;
}
