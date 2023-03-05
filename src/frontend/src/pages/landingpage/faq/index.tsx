import { FAQList } from "./faqlist";
import QuestionIconSrc from "./icons/question.svg";
import AnswerIconSrc from "./icons/answer.svg";
import { Fragment } from "react";


export default function FAQSection() {
    return <div className="flex flex-col gap-5" id="faq">
        <h2 className="text-3xl font-bold text-center select-none">
            Frequently Asked Questions
        </h2>
        {FAQList.map((faq, key) => <Fragment key={key}>
            <SeparatorLine />
            <div className="grid grid-cols-[auto,1fr] gap-2 w-full max-w-3xl mx-auto">
                <QuestionIcon />
                <h3 className="text-2xl font-bold">
                    {faq.question}
                </h3>
                <AnswerIcon />
                <p className="opacity-80">
                    {faq.answer}
                </p>
            </div>
        </Fragment>)}
    </div>;
}


function SeparatorLine() {
    return <div className="w-1/5 h-1 max-w-xs mx-auto rounded-full from-blue-400 via-blue-700 to-blue-400 bg-gradient-to-r" />;
}


function QuestionIcon() {
    return <img className="inline h-5 my-auto select-none dark:invert" src={QuestionIconSrc} alt="" />;
}

function AnswerIcon() {
    return <img className="inline h-4 my-auto select-none dark:invert" src={AnswerIconSrc} alt="" />;
}
