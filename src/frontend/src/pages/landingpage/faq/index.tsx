import { FAQList } from "./faqlist";
import QuestionIconSrc from "./icons/question.svg";
import AnswerIconSrc from "./icons/answer.svg";


export default function FAQSection() {
    return <div className="flex flex-col gap-10" id="faq">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold select-none text-center">
                Frequently Asked Questions
            </h2>
            <SeparatorLine />
        </div>
        {FAQList.map((faq, key) => <div className="grid grid-cols-[auto,1fr] gap-2 w-full max-w-3xl mx-auto" key={key}>
            <QuestionIcon />
            <h3 className="text-2xl font-bold">
                {faq.question}
            </h3>
            <AnswerIcon />
            <p className="opacity-80">
                {faq.answer}
            </p>
            <SeparatorLine />
        </div>)}
    </div>;
}


function SeparatorLine() {
    return <div className="h-1 w-32 from-blue-400 via-blue-700 to-blue-400 bg-gradient-to-r mx-auto col-span-2 rounded-full" />;
}


function QuestionIcon() {
    return <img className="h-5 inline dark:invert select-none my-auto" src={QuestionIconSrc} alt="" />;
}

function AnswerIcon() {
    return <img className="h-4 inline dark:invert select-none my-auto" src={AnswerIconSrc} alt="" />;
}
