import { type PropsWithChildren } from "react";
import Footer from "~/components/Footer";

export default function AboutPage() {
    return <>
        <div className="w-screen min-h-screen">
            <h1 className="text-[5vw] text-center">About us and this project</h1>
            <p className="max-w-5xl px-5 mx-auto text-xl">
                This project was created as part of a semester course. Therefore it is possible that it still contains slight errors, may not be extended and feedback on problems or responses to questions may take longer.
            </p>
            <div className="h-10" />
            <h2 className="text-[4vw] text-center">Developers</h2>
            <div className="flex flex-col max-w-xs gap-5 mx-auto">
                <Member name="roriwa" icon="https://avatars.githubusercontent.com/u/103991412?s=64&v=4">
                    Role: Frontend
                </Member>
                <Member name="JuliusJaenchen" icon="https://avatars.githubusercontent.com/u/48837000?v=4">
                    Role: Architecture
                </Member>
                <Member name="konstantinlob" icon="https://avatars.githubusercontent.com/u/23258120?s=64&v=4">
                    Role: Data Mining
                </Member>
                <Member name="Benni0706" icon="https://avatars.githubusercontent.com/u/61964978?s=64&v=4">
                    Role: Rest-API
                </Member>
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
