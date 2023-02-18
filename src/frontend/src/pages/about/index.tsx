import { type PropsWithChildren } from "react";
import Footer from "~/components/Footer";

export default function AboutPage() {
    return <>
        <div className="w-screen min-h-screen">
            <h1 className="text-[5vw] text-center">About us and this project</h1>
            <p className="px-5 text-xl max-w-5xl mx-auto">
                This project was created as part of a semester course. Therefore it is possible that it still contains slight errors, may not be extended and feedback on problems or responses to questions may take longer.
            </p>
            <div className="h-10" />
            <h2 className="text-[4vw] text-center">Developers</h2>
            <div className="flex flex-col gap-5 max-w-xs mx-auto">
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
        <a className="flex items-center mx-auto gap-2 hover:underline" href={`https://github.com/${props.name}`} rel="noreferrer">
            <img className="h-10 w-10 object-contain rounded-full" src={props.icon} alt="icon" />
            <span className="text-xl">{props.name}</span>
        </a>
        <p>
            {props.children}
        </p>
    </div>;
}