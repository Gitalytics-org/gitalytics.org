import type { PropsWithChildren } from "react";


const Link = ({href, children}: PropsWithChildren<{ href: string }>) => <a className="text-blue-700 dark:text-blue-400 hover:underline" href={href}>{children}</a>;


export const FAQList: Array<{question: string, answer: string | JSX.Element}> = [
    {
        question: "What is the difference to other git analysis sites?",
        answer: "We offer analysis over all your repositories and not just one repository at a time",
    },
    {
        question: "How secure is this site?",
        answer: "We use OAuth for your login. Also our cookies and securely encrypted",
    },
    {
        question: "How can I delete all my Data here?",
        answer: <>
            you cant. lol <br/>
            Jokes aside. We currently don&apos;t have a builtin feature for that. Contact us in any way and we will do it manually.
        </>,
    },
    {
        question: "Where can I report Bugs or propose Ideas",
        answer: <>
            We currently don&apos;t have a builtin feature for that.
            Please create an issue <Link href="https://github.com/konstantinlob/gitalytics.org/issues/new/choose">here</Link> until we implemented that.
        </>,
    },
];
