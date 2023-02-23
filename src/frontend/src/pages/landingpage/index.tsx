import Footer from "~/components/Footer";
import BigWelcome from "./BigWelcome";
import FAQSection from "./faq";
import PricingReplacement from "./PricingReplacement";
import WhatIsThis from "./WhatIsThis";


export default function LandingPage() {
    return <div className="flex flex-col gap-10 overflow-hidden">
        <BigWelcome />
        <WhatIsThis />
        <PricingReplacement />
        <FAQSection />
        <Footer />
    </div>;
}
