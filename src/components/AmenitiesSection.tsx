import { UtensilsCrossed, Zap, Wifi, ShieldCheck, Sparkles, Shirt, Users, BadgePercent } from 'lucide-react';
import { AMENITIES_LIST } from '../data/pgData';

const ICONS_MAP: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Zap,
  Wifi,
  ShieldCheck,
  Sparkles,
  Shirt,
  Users,
  BadgePercent,
};

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-16 sm:py-20 bg-neutral-50/60 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-emerald-700 mb-2">
            Designed for Modern Living
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
            Every Detail Handled. Zero Daily Hassles.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            From hot homestyle chapatis and high-speed Wi-Fi to backup generators and biometric doors,
            Relaxstay is equipped for working professionals and university scholars in Noida.
          </p>
        </div>

        {/* Bento Grid with Showcase Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Marquee Card 1: Dining & Community Lounge (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-neutral-100 overflow-hidden">
              <img
                src="/src/assets/images/pg_dining_lounge_1793545903856.jpg"
                alt="Modern Dining Hall and Community Lounge at Relaxstay PG Noida Sector 104"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                  In-House Kitchen & Social Space
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  Spacious Dining Hall & Community Terrace
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
                <span>Wholesome 3-Times Daily Meals</span>
                <span aria-hidden="true">·</span>
                <span>Breakfast, Lunch Tiffin & Dinner</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Enjoy home-style, freshly prepared meals served in a clean, sunlit dining hall.
                Working in Noida tech parks? We pack your hot lunch tiffin before you leave.
                In the evening, unwind with table tennis, high-speed Wi-Fi, and hot masala chai.
              </p>
            </div>
          </div>

          {/* Marquee Card 2: Safe & Secure Property Exterior */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
              <img
                src="/src/assets/images/pg_exterior_building_1793545903512.jpg"
                alt="Relaxstay PG Building Facade HA-90A Sector 104 Noida"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                  Prime Location
                </div>
                <h3 className="text-base sm:text-lg font-bold">
                  HA-90A, Sector 104 Noida
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs font-semibold text-emerald-700 mb-2">
                Quiet & Well-Connected Neighborhood
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A peaceful standalone residential building situated right behind the lively Sector 104 market,
                providing both tranquility to sleep/work and immediate walking access to cafes, stores, and gyms.
              </p>
            </div>
          </div>

          {/* Remaining Core Amenities in Clean 3-Grid */}
          {AMENITIES_LIST.map((item, idx) => {
            const Icon = ICONS_MAP[item.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs hover:border-neutral-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                    <Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                    {item.highlight}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
