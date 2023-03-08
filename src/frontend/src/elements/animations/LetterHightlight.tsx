// import { PropsWithChildren } from "react";
import "./style.css";


interface Props {
    children: string
    className?: string
}

const STARTING_OFFSET = 0.20;
const LETTER_DELAY = 0.05;
const DURATION = 0.5;

export default function LetterHighlight(props: Props) {
    return <>
        {Array
            .from(props.children)
            .map((letter, i) => <span key={i} className={`¤${props.className} letter-highlight`} style={{
                animationDelay: `${STARTING_OFFSET + i * LETTER_DELAY}s`,
                animationDirection: `${DURATION}s`,
            }}>
                {letter}
            </span>)
        }
    </>;
}
