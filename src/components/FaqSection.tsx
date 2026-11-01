import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePGData } from '../context/PGDataContext';

export default function FaqSection() {
  const { faqs } = usePGData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-neutral-50/60 border-b border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-emerald-700 mb-2">
            Clear Policies · No Ambiguity
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
            Frequently Asked Questions & House Rules
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl mx-auto">
            Everything you need to know about move-in requirements, security deposits, food timings, and gate rules at Sector 104 & Sector 53.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-neutral-900 hover:text-emerald-800 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
