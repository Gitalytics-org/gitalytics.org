import React from "react";
import "./letter-highlight.css";


interface LetterHighlightProps {
    children: string
    delay?: number
    className?: string
}

const STARTING_OFFSET = 0.20;
const LETTER_DELAY = 0.05;
const DURATION = 0.5;

export default function LetterHighlight(props: LetterHighlightProps) {
    return <>
        {Array
            .from(props.children)
            .map((letter, i) => <span key={i} className={`${props.className} letter-highlight`} style={{
                animationDelay: `${(props.delay ?? STARTING_OFFSET) + i * LETTER_DELAY}s`,
                animationDirection: `${DURATION}s`,
            }}>
                {letter}
            </span>)
        }
    </>;
}
