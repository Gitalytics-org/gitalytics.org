import { type PropsWithChildren } from "react";
import Footer from "~/components/Footer";

export default function AboutPage() {
    return <>
        <div className="min-h-screen flex flex-col gap-4">
            <h1 className="text-[5vw] text-center">About us and this project</h1>
            <p className="max-w-5xl px-5 mx-auto text-xl">
                This project was created as part of a semester course. Therefore it is possible that it still contains slight errors, may not be extended and feedback on problems or responses to questions may take longer.
            </p>
            <h2 className="text-[4vw] text-center">Developers</h2>
            <div className="flex flex-col max-w-sm gap-5 mx-auto">
                <Member name="roriwa" icon="https://avatars.githubusercontent.com/u/103991412?s=64&v=4">
                    Roles: Frontend, Backend - Rest-API
                </Member>
                <Member name="JuliusJaenchen" icon="https://avatars.githubusercontent.com/u/48837000?v=4">
                    Roles: Server Management, Backend - Rest-API
                </Member>
                <Member name="konstantinlob" icon="https://avatars.githubusercontent.com/u/23258120?s=64&v=4">
                    Roles: Backend - Data Mining, Video Editor
                </Member>
                <Member name="Benni0706" icon="https://avatars.githubusercontent.com/u/61964978?s=64&v=4">
                    Roles: Backend - Rest-API
                </Member>
            </div>
            <h2 className="text-[4vw] text-center">Goal of Gitalytics</h2>
            <div className="max-w-3xl mx-auto flex flex-col gap-1">
                <p>In today&apos;s fast-paced business world, corporations must stay on top of their game to remain competitive. But with so much data to manage, it can be hard to gain the insights needed to optimize your company’s collaboration, code, and overall development process.</p>
                <p>Introducing Gitalytics — the only website designed specifically for large corporations with a myriad of repositories looking to gain insights from their Git history data. Our powerful analytics engine makes it easy to visualize your Git data and gain insights that can help you optimize and improve your company&apos;s work.</p>
                <p>With Gitalytics, you can get an in-depth view of your Git data, allowing you to make more informed decisions and optimize your development process. Whether you&apos;re a developer looking to improve your working habits, or an executive looking to identify areas for improvement, Gitalytics has you covered.</p>
                <p>Furthermore, we pride ourselves in our state-of-the-art security measures. We let our users securely log into our product with the help of OAuth 2.0 authentication. This means, you only need to log in via your Git platform provider and don’t have to worry about coming up with yet another secure password you need to memorize.</p>
                <p>So if you&apos;re ready to take your development process to the next level, sign up for Gitalytics today and start analyzing your data like never before.</p>
            </div>
        </div>
        <Footer />
    </>;
}


interface MemberProps extends PropsWithChildren {
    name: string
    icon: string
}


function Member(props: MemberProps) {
    return <div>
        <a className="flex items-center gap-2 mx-auto hover:underline" href={`https://github.com/${props.name}`} rel="noreferrer">
            <img className="object-contain w-10 h-10 rounded-full" src={props.icon} alt="icon" />
            <span className="text-xl">{props.name}</span>
        </a>
        <p>
            {props.children}
        </p>
    </div>;
}
