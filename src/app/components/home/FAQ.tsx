import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import FAQItem from "../common/FAQItem";

import { faqs } from "@/app/constants/home/faq";

const FAQ = () => {
    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <SectionTitle
                    badge="Frequently Asked Questions"
                    title="Everything You Need to Know"
                    description="Find answers to the most common questions about LearnSphere, our courses, and the learning experience."
                    center
                />

                <div className="mx-auto mt-12 w-full max-w-5xl space-y-4">
                    {faqs.map((faq) => (
                        <FAQItem
                            key={faq.question}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default FAQ;