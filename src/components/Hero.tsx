import { Search, X, MapPin, Building2, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';
import { usePGData } from '../context/PGDataContext';

interface HeroProps {
  onOpenVisitModal: () => void;
  onOpenAdmin: () => void;
}

export default function Hero({ onOpenVisitModal }: HeroProps) {
  const {
    branches,
    currentBranch,
    searchFilters,
    setSearchFilters,
    resetSearchFilters,
    searchedRooms,
    activeFilterCount,
  } = usePGData();

  const handleQuickTagClick = (updates: Partial<typeof searchFilters>) => {
    setSearchFilters((prev) => ({
      ...prev,
      ...updates,
    }));

    // Smooth scroll down to rooms section
    const el = document.getElementById('rooms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 2-Branch Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 font-medium">
            <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-neutral-900 font-semibold">2 Prime Noida Branches:</span>
            <span>HA-90A Sector 104 (Near Expressway)</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>A-66 Sector 53 (Near Metro)</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
              ₹13k 2-Sharing (Food Included)
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
              ₹20k Separate Room (Food Included)
            </span>
          </div>
        </div>

        {/* 2-Column Split: Editorial & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-10">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-900 tracking-tight leading-[1.12] mb-4 text-balance">
              Find Your Perfect PG & Co-Living Room in Noida
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mb-6">
              Comfortable, fully furnished AC accommodation at{' '}
              <strong className="text-neutral-900">HA-90A Sector 104</strong> and{' '}
              <strong className="text-neutral-900">A-66 Sector 53</strong>.
              Enjoy 3 daily homestyle meals, 300 Mbps Wi-Fi, 100% DG power backup, and zero brokerage.
            </p>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm text-neutral-700 font-medium mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3 Daily Homestyle Meals + Tea</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Brokerage Direct Agreement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% DG Backup for ACs & Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 Month Refundable Deposit</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenVisitModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-all"
              >
                <span>Schedule a Free Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${currentBranch.whatsapp}?text=Hi%20Relaxstay,%20I%20am%20looking%20for%20room%20availability%20in%20Noida%20(13k%202-sharing%20/%2020k%20separate%20room).`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-5 relative flex items-stretch">
            <div className="w-full rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm relative group bg-neutral-100">
              <img
                src="/src/assets/images/hero_pg_room_1793545902277.jpg"
                alt="Modern Furnished Bedroom at Relaxstay Noida"
                className="w-full h-full object-cover min-h-[300px] sm:min-h-[360px] lg:min-h-full"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs uppercase tracking-wider font-semibold text-emerald-300 mb-1">
                  Verified Noida Co-Living
                </div>
                <div className="text-sm font-semibold text-neutral-100">
                  Separate Rooms @ ₹20k & 2-Sharing @ ₹13k (All Meals Included)
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-300 mt-1">
                  <span>Sector 104 (HA-90A)</span>
                  <span aria-hidden="true">·</span>
                  <span>Sector 53 (A-66)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MASTER EASY-SEARCH CONSOLE ================= */}
        <div className="bg-neutral-50/90 rounded-2xl border-2 border-neutral-900/10 p-5 sm:p-6 shadow-md mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Search className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Instant PG Search & Filter
                </span>
                <span className="text-neutral-500 text-xs ml-2 hidden sm:inline">
                  Find by sharing, budget, sector, metro, or landmark
                </span>
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={resetSearchFilters}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters ({activeFilterCount})</span>
              </button>
            )}
          </div>

          {/* Search Inputs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-4">
            {/* Keyword Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search '13k', 'balcony', 'separate', 'girls', 'metro', 'candor'..."
                value={searchFilters.keyword}
                onChange={(e) => setSearchFilters({ ...searchFilters, keyword: e.target.value })}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 shadow-xs"
              />
              {searchFilters.keyword && (
                <button
                  onClick={() => setSearchFilters({ ...searchFilters, keyword: '' })}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Branch Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={searchFilters.branchId}
                onChange={(e) => setSearchFilters({ ...searchFilters, branchId: e.target.value })}
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-xs font-medium text-neutral-800"
              >
                <option value="all">All Branches (Noida)</option>
                <option value="sector-104">Sector 104 (HA-90A)</option>
                <option value="sector-53">Sector 53 (A-66)</option>
              </select>
            </div>

            {/* Occupancy Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={searchFilters.occupancy}
                onChange={(e) => setSearchFilters({ ...searchFilters, occupancy: e.target.value })}
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-xs font-medium text-neutral-800"
              >
                <option value="all">All Sharing Types</option>
                <option value="double">2-Sharing (₹13,000)</option>
                <option value="single">Separate Room (₹20,000)</option>
                <option value="triple">Triple Sharing (₹9,500)</option>
              </select>
            </div>

            {/* Budget Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={searchFilters.maxBudget}
                onChange={(e) => setSearchFilters({ ...searchFilters, maxBudget: Number(e.target.value) })}
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-xs font-medium text-neutral-800"
              >
                <option value={0}>Any Budget</option>
                <option value={10000}>Under ₹10,000/mo</option>
                <option value={15000}>Under ₹15,000/mo</option>
                <option value={22000}>Under ₹22,000/mo</option>
              </select>
            </div>
          </div>

          {/* Quick Search Tags & Live Count Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200/60">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-neutral-500 text-[11px] font-semibold mr-1">Quick Search:</span>

              <button
                onClick={() => handleQuickTagClick({ occupancy: 'double', keyword: '' })}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  searchFilters.occupancy === 'double'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                ⚡ 2-Sharing (₹13k)
              </button>

              <button
                onClick={() => handleQuickTagClick({ occupancy: 'single', keyword: '' })}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  searchFilters.occupancy === 'single'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                🏡 Separate Room (₹20k)
              </button>

              <button
                onClick={() => handleQuickTagClick({ branchId: 'sector-104' })}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  searchFilters.branchId === 'sector-104'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                HA-90A Sec 104
              </button>

              <button
                onClick={() => handleQuickTagClick({ branchId: 'sector-53' })}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  searchFilters.branchId === 'sector-53'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                A-66 Sec 53 (Metro)
              </button>

              <button
                onClick={() => handleQuickTagClick({ genderWing: 'girls' })}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  searchFilters.genderWing === 'girls'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                🌸 Girls Wing
              </button>

              <button
                onClick={() => handleQuickTagClick({ hasBalcony: !searchFilters.hasBalcony })}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  searchFilters.hasBalcony
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                🌿 Balcony
              </button>
            </div>

            {/* Results Match Count & Scroll CTA */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-900">
                {searchedRooms.length} room{searchedRooms.length === 1 ? '' : 's'} available
              </span>
              <a
                href="#rooms"
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>View Results</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
