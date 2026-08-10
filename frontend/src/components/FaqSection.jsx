import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    id: "item-1",
    q: "Who can register for the Festival of Independence programs?",
    a: "This program is specifically designed for Undergraduate (UG) college students. Any UG student interested in personal transformation, leadership development, and ancient wisdom is welcome to register.",
  },
  {
    id: "item-2",
    q: "Is registration free?",
    a: "The online course is completely free.\n\nHowever, for the in-between off-line camps, if we are not able to collect sufficient sponsorship, we will collect some nominal charges from the students, just before the camp.",
  },
  {
    id: "item-3",
    q: "How do I get my class/program joining link?",
    a: "Other than that, registered students will get the joining links in their mail IDs and college-wise WhatsApp groups.",
  },
  {
    id: "item-4",
    q: "What is the 1-Year Journey program?",
    a: "The 1-Year Journey is a 7-milestone leadership & spiritual values program designed by IYF Kolkata to empower youth with character, clarity, competence, and compassion.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Modern 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-saffron animate-pulse" />
              <span className="text-saffron font-bold text-xs tracking-wider uppercase">
                Frequently asked questions
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Frequently asked <br className="hidden sm:inline" />
              <span className="text-saffron">questions</span>
            </h2>

            <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed pt-1 max-w-md">
              Have questions about registration, eligibility, or the 1-Year Journey program? Find answers to commonly asked questions below.
            </p>
          </div>

          {/* Right Column: Shadcn Radix Accordion */}
          <div className="lg:col-span-7">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="space-y-3.5"
            >
              {faqs.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-2xl border border-gray-200/80 bg-gray-50/50 px-5 sm:px-6 data-[state=open]:border-saffron/40 data-[state=open]:bg-amber-50/20 data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="font-extrabold text-navy text-sm sm:text-base hover:no-underline hover:text-saffron py-4 sm:py-5 leading-snug">
                    <span className="flex items-center gap-3 pr-2">
                      <HelpCircle className="w-4 h-4 text-saffron shrink-0 hidden sm:inline" />
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed pt-1 pb-4">
                    <p className="whitespace-pre-line border-t border-gray-100 pt-3">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}
