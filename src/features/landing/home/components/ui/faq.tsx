import { PlusIcon } from "lucide-react";
import SectionHeading from "./section-heading";

type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
};

/** Dados estruturados para o Google exibir as perguntas no resultado da busca */
const toFaqJsonLd = (items: FaqItem[]) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
    // Evita que um "</script>" no texto feche a tag
  }).replace(/</g, "\\u003c");

const Faq = ({ id, eyebrow, title, description, items }: FaqProps) => {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-12 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                {item.question}
                <PlusIcon
                  aria-hidden="true"
                  className="size-icon-sm shrink-0 text-fg-muted transition-transform duration-(--duration-base) group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-5 leading-relaxed text-pretty text-fg-secondary">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toFaqJsonLd(items) }}
      />
    </section>
  );
};

export default Faq;
