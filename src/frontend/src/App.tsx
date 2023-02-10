import { Route, Routes } from "react-router-dom";
import AboutPage from "./routes/about";
import AppPage from "./routes/app/app";
import ContactPage from "./routes/contact";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import TermsPage from "./routes/terms";


export default function App() {
    return <div className="bg-primary text-secondary transition-colors duration-500">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
        </Routes>
    </div>;
}
