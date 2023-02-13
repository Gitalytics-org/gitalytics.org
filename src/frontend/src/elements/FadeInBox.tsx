import React, { type PropsWithChildren } from "react";


type Direction = "top" | "right" | "bottom" | "left"
interface Props extends PropsWithChildren {
    from?: Direction
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


export default function FadeInBox(props: Props) {
    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const divElement = domRef.current!;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(divElement);
        return () => observer.unobserve(divElement);
    }, []);

    const style: React.CSSProperties = {
        opacity: 0,
        transform: getTranslate(props.from),
        visibility: "hidden",
        transition: "opacity 0.8s ease-out, transform 1.2s ease-out",
        willChange: "opacity, visibility",
    };
    const visibleStyle: React.CSSProperties = {
        opacity: 1,
        transform: "none",
        visibility: "visible",
    };

    return (
        <div style={{...style, ...(isVisible ? visibleStyle : {})}} ref={domRef}>
            {props.children}
        </div>
    );
}
