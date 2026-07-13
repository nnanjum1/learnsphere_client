"use client";

import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between p-5 text-left"
            >
                <span className="font-semibold">{question}</span>

                {open ? <HiMinus size={20} /> : <HiPlus size={20} />}
            </button>

            {open && (
                <div className="border-t border-slate-200 px-5 py-4">
                    <p className="leading-7 text-slate-600">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FAQItem;