import type { PropsWithChildren } from "react";


const Link = ({href, children}: PropsWithChildren<{ href: string }>) => <a className="text-blue-700 dark:text-blue-400 hover:underline" href={href}>{children}</a>;


export const FAQList: Array<{question: string, answer: string | JSX.Element}> = [
    {
        question: "What is the difference to other git analysis sites?",
        answer: "Instead of analyzing only one repository, we can analyze an entire workspace. A feature, that many other products lack.",
    },
    {
        question: "How secure is this site?",
        answer: "We use OAuth 2.0 to authenticate a user, saving you the hassle of creating a new account and a new vulnerability. Furthermore, Gitalytics only has read-only access to your GitHub/GitLab/BitBucket repositories.",
    },
    {
        question: "What exactly is a workspace?",
        answer: <>
            <b>For GitHub</b> it represents either your Account with your personal repositories or an Organization that you are part of.
            (Note: The Organization needs to approve our access to these Repositories)<br/>
            You will be able to select wich of these you want to analyze, if you have more than one Workspace.
            {/* <b>On Bitbucket and GitLab:</b> it means literally a Workspace. */}
        </>,
    },
    {
        question: "How can I delete all my Data here?",
        answer: <>
            you cant. lol <br/>
            Jokes aside. We currently don&apos;t have a builtin feature for that. Contact us in any way and we will do it manually.
        </>,
    },
    {
        question: "Where can I report Bugs or propose Ideas?",
        answer: <>
            We currently don&apos;t have a builtin feature for that.
            Please create an issue <Link href="https://github.com/konstantinlob/gitalytics.org/issues/new/choose">here</Link>.
        </>,
    },
];
