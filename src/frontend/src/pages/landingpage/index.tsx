import Footer from "~/components/Footer";
import BigWelcome from "./BigWelcome";
import FAQSection from "./faq";
import GitalyticsStatistics from "./GitalyticsStatistics";
import Pricing from "./Pricing";
import WhatIsThis from "./WhatIsThis";


export default function LandingPage() {
    return <div className="flex flex-col gap-10 overflow-hidden">
        <BigWelcome />
        <GitalyticsStatistics />
        <WhatIsThis />
        <Pricing />
        <FAQSection />
        <Footer />
    </div>;
}
