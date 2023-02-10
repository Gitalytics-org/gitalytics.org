import GitalyticsLogoSrc from "@assets/gitalytics_orange_dropshadow.svg";
import Footer from "~/components/Footer";


export default function ContactPage() {
    return <>
        <div className="grid grid-cols-2 w-screen h-screen">
            <img className="h-full m-auto p-5" src={GitalyticsLogoSrc} alt="logo" />
            <div className="my-auto min-h-[50vh]">
                <h1 className="text-center text-[6vw]">Contact Us</h1>
                <div className="grid grid-cols-2">
                    <span>Email:</span>
                    <a className="hover:underline text-blue-600" href="mailto:developer@gitalytics.org" target="_blank" rel="noreferrer">developer@gitalytics.org</a>
                    <span>Github:</span>
                    <a className="hover:underline text-blue-600" href="https://github.com/konstantinlob/gitalytics.org" target="_blank" rel="noreferrer">konstantinlob/gitalytics.org</a>
                </div>
            </div>
        </div>
        <Footer />
    </>;
}
