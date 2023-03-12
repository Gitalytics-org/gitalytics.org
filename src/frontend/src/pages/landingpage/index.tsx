import Footer from "~/components/Footer";
import BigWelcome from "./BigWelcome";
import FAQSection from "./faq";
import Pricing from "./Pricing";
import VideoTrailer from "./VideoTrailer";
import ViewMyGraphs from "./ViewMyGraphs";
import WhatIsThis from "./WhatIsThis";


export default function LandingPage() {
    return <div className="flex flex-col gap-10 overflow-hidden">
        <BigWelcome />
        <ViewMyGraphs />
        <WhatIsThis />
        <Pricing />
        <VideoTrailer />
        <FAQSection />
        <Footer />
    </div>;
}
