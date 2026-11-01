import { Star, Quote, Building2, UserCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/pgData';

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-emerald-700 mb-2">
            Resident Community
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
            Hear from Noida Tech Professionals Living at Relaxstay
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Our residents work at top tech parks in Sectors 126, 135, and 142, enjoying quiet work-from-home days,
            healthy homestyle food, and zero landlord interference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60">
                <div className="font-bold text-neutral-900 text-sm">{t.name}</div>
                <div className="text-xs text-neutral-600 font-medium">{t.role}</div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  {t.companyOrCollege}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">
                  {t.roomType} · {t.stayDuration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
