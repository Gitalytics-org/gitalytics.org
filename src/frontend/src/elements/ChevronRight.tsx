const ChevronRight = (props: JSX.IntrinsicElements["svg"]) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentcolor" {...props}>
        <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"/>
    </svg>
);


ChevronRight.defualtProps = {
    width: "48px",
    height: "48px",
};

export default ChevronRight;
