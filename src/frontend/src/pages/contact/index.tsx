import GitalyticsLogoSrc from "@assets/gitalytics.svg";
import Footer from "~/components/Footer";


export default function ContactPage() {
    return <>
        <div className="grid h-screen grid-cols-2">
            <img className="h-full p-5 m-auto" src={GitalyticsLogoSrc} alt="logo" />
            <div className="my-auto min-h-[50vh]">
                <h1 className="text-center text-[6vw] select-none">Contact Us</h1>
                <div className="grid grid-cols-2">
                    {/* <span className="select-none">Email:</span>
                    <a className="text-blue-600 hover:underline" href="mailto:developer@gitalytics.org" target="_blank" rel="noreferrer">developer@gitalytics.org</a> */}
                    <span className="select-none">Github:</span>
                    <a className="text-blue-600 hover:underline" href="https://github.com/Gitalytics-org/gitalytics.org" target="_blank" rel="noreferrer">Gitalytics-org/gitalytics.org</a>
                    <span className="select-none">Report Bug:</span>
                    <a className="text-blue-600 hover:underline" href="https://github.com/Gitalytics-org/gitalytics.org/issues/new/choose" target="_blank" rel="noreferrer">here</a>
                </div>
            </div>
        </div>
        <Footer />
    </>;
}
