import { useState } from 'react';
import { Menu, X, PhoneCall, ShieldCheck, MapPin } from 'lucide-react';
import { usePGData } from '../context/PGDataContext';

interface NavbarProps {
  onOpenVisitModal: (prefillRoom?: string) => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenVisitModal, onOpenAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branches, selectedBranchId, setSelectedBranchId, currentBranch } = usePGData();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            {/* Zone 1: Single text element wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#"
                className="text-2xl font-display font-extrabold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 hover:text-emerald-700 transition-colors"
              >
                Relaxstay
              </a>

              {/* Branch quick toggle */}
              <div className="hidden lg:flex items-center p-0.5 bg-neutral-100 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setSelectedBranchId('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                    selectedBranchId === 'all'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Both Branches
                </button>
                <button
                  onClick={() => setSelectedBranchId('sector-104')}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                    selectedBranchId === 'sector-104'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Sec 104
                </button>
                <button
                  onClick={() => setSelectedBranchId('sector-53')}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                    selectedBranchId === 'sector-53'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Sec 53
                </button>
              </div>
            </div>

            {/* Zone 2: 4–5 clean single-line text navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
              <a href="#rooms" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
                Rooms & Pricing
              </a>
              <a href="#branches" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
                Branches
              </a>
              <a href="#menu" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
                Mess Menu
              </a>
              <a href="#calculator" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
                Rent Calculator
              </a>
              <a href="#location" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
                Locations
              </a>
            </nav>

            {/* Zone 3: 1 primary action + Admin Link */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                title="Admin Control Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin</span>
              </button>

              <a
                href={`tel:${currentBranch.phone}`}
                className="hidden xl:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors whitespace-nowrap shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentBranch.phoneDisplay}</span>
              </a>

              <button
                onClick={() => onOpenVisitModal()}
                className="px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                Schedule Visit
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenAdmin}
                className="p-1.5 text-neutral-600 hover:text-neutral-900 text-xs font-semibold rounded bg-neutral-100"
              >
                Admin
              </button>
              <button
                onClick={() => onOpenVisitModal()}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-md"
              >
                Visit
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-18 bg-white border-b border-neutral-200 z-30 shadow-lg px-6 py-6 space-y-4">
          <div className="pb-3 border-b border-neutral-100">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Select Branch
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedBranchId('all')}
                className={`py-1.5 text-xs font-semibold rounded ${
                  selectedBranchId === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                Both
              </button>
              <button
                onClick={() => setSelectedBranchId('sector-104')}
                className={`py-1.5 text-xs font-semibold rounded ${
                  selectedBranchId === 'sector-104'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                Sec 104
              </button>
              <button
                onClick={() => setSelectedBranchId('sector-53')}
                className={`py-1.5 text-xs font-semibold rounded ${
                  selectedBranchId === 'sector-53'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                Sec 53
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-800">
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-700 transition-colors"
            >
              Rooms & Rates (13k & 20k with food)
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-700 transition-colors"
            >
              Our 2 Noida Branches
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-700 transition-colors"
            >
              Weekly Mess Menu
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-700 transition-colors"
            >
              Rent Calculator
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-700 transition-colors"
            >
              Addresses & Maps
            </a>
          </nav>

          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-neutral-800 bg-neutral-100 rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Open Admin Panel (Edit Website)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVisitModal();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-neutral-900 rounded-lg shadow-sm"
            >
              Schedule a Free In-Person Visit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
