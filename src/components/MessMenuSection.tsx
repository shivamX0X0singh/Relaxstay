import { useState } from 'react';
import { usePGData } from '../context/PGDataContext';
import { Utensils, Coffee, Sun, Moon, Sparkles, Check } from 'lucide-react';

export default function MessMenuSection() {
  const { weeklyMenu, isAdminLoggedIn } = usePGData();
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const currentPlan = weeklyMenu[activeDayIndex] || weeklyMenu[0];

  if (!currentPlan) return null;

  return (
    <section id="menu" className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-emerald-700 mb-2">
              Clean Kitchen · Balanced Nutrition · Both Branches
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
              Weekly Rotating Homestyle Mess Menu
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl">
              Cooked fresh three times a day by experienced in-house cooks using Fortune/Dhara oils, Amul dairy,
              and RO purified water. Included in all room plans.
            </p>
          </div>

          <div className="text-xs text-neutral-500 bg-neutral-50 px-4 py-2.5 rounded-xl border border-neutral-200/70">
            <span className="font-semibold text-neutral-800">Office Tiffin Packaging:</span> Hot lunch packed before 8:45 AM daily for corporate professionals.
          </div>
        </div>

        {/* Day Selector Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl overflow-x-auto mb-8 scrollbar-none">
          {weeklyMenu.map((plan, index) => {
            const isActive = activeDayIndex === index;
            return (
              <button
                key={plan.day}
                onClick={() => setActiveDayIndex(index)}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-lg text-xs font-semibold transition-all text-center whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                }`}
              >
                <span>{plan.day}</span>
                {plan.specialItem && (
                  <span className="block text-[10px] text-emerald-600 font-normal truncate mt-0.5">
                    Special
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Day Card */}
        <div className="bg-neutral-50/70 rounded-2xl border border-neutral-200/80 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Menu for
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">{currentPlan.day}</h3>
            </div>
            {currentPlan.specialItem && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Special: {currentPlan.specialItem}</span>
              </div>
            )}
          </div>

          {/* 4 Meals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Breakfast */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-neutral-500">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Breakfast</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">7:30 – 10:00 AM</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {currentPlan.breakfast.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lunch */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-neutral-500">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    <span>Lunch / Tiffin</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">12:30 – 2:30 PM</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {currentPlan.lunch.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Evening Tea */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-neutral-500">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    <span>Evening Snacks & Chai</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">5:30 – 6:30 PM</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {currentPlan.eveningSnacks.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dinner */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-neutral-500">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span>Dinner</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">8:00 – 10:30 PM</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {currentPlan.dinner.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
