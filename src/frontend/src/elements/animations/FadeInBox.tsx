import React, { type PropsWithChildren } from "react";


type Direction = "top" | "right" | "bottom" | "left"
interface Props extends PropsWithChildren {
    from?: Direction
    delay?: number
    duration?: number
    className?: string
}


function getTranslate(direction?: Direction) {
    switch (direction) {
    // case "top"
    case "right":
        return "translateX(40vh)";
    case "bottom":
        return "translateY(-20vh)";
    case "left":
        return "translateX(-40vh)";
    default:
        return "translateY(20vh)";
    }
}


const DEFAULT_DURATION = 1.2;
const TWO_THIRD = 2/3;  // eslint-disable-line no-magic-numbers

export default function FadeInBox(props: Props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const divElement = domRef.current!;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(divElement);
        return () => observer.unobserve(divElement);
    }, []);

    const delay = props.delay ?? 0;
    const duration = props.duration ?? DEFAULT_DURATION;

    const style: React.CSSProperties = {
        opacity: 0,
        transform: getTranslate(props.from),
        visibility: "hidden",
        transition: `opacity ${duration * TWO_THIRD}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        willChange: "opacity, visibility",
    };
    const visibleStyle: React.CSSProperties = {
        opacity: 1,
        transform: "none",
        visibility: "visible",
    };

    return (
        <div className={props.className} style={{...style, ...(isVisible ? visibleStyle : {})}} ref={domRef}>
            {props.children}
        </div>
    );
}
