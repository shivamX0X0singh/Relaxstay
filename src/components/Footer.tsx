import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { usePGData } from '../context/PGDataContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const { branches } = usePGData();

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand & Address Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="text-2xl font-display font-extrabold text-white tracking-tight hover:text-emerald-400 transition-colors"
              >
                Relaxstay
              </a>
              <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                2 Noida Branches
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Premium Paying Guest & Co-Living accommodation for professionals and students in Noida.
              13k 2-sharing, 20k separate room with all 3 daily meals, AC, 100% DG backup & zero brokerage.
            </p>

            <div className="space-y-3 pt-2 text-xs text-neutral-300">
              {branches.map((b) => (
                <div key={b.id} className="p-3 rounded-lg bg-neutral-800/60 border border-neutral-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider">
                      {b.sector} Branch
                    </span>
                    <a
                      href={b.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-neutral-200 font-medium">{b.address}</div>
                  <div className="text-[11px] text-neutral-400">
                    Phone / WhatsApp: <a href={`tel:${b.phone}`} className="text-white hover:underline">{b.phoneDisplay}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Accommodation & Pricing
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  ₹13,000 /mo 2-Sharing (with Food)
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  ₹20,000 /mo Separate Room (with Food)
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  ₹9,500 /mo Triple Sharing (with Food)
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Girls Exclusive Wing (Biometric Floor)
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Live Rent & Deposit Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Facilities & Admin Access */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Website & Admin Controls
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#branches" className="hover:text-white transition-colors">
                  Sector 104 (HA-90A) & Sector 53 (A-66)
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  7-Day Homestyle Mess Menu
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  House Rules & 1-Month Deposit Terms
                </a>
              </li>
            </ul>

            {/* Prominent Admin Access Button */}
            <div className="pt-3">
              <button
                onClick={onOpenAdmin}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 hover:border-neutral-600 transition-colors shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin Access Portal (Edit Rates, Branches & Menu)</span>
              </button>
              <div className="text-[11px] text-neutral-500 text-center mt-1.5">
                For property owner & staff · Passcode protected
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Relaxstay PG. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>HA-90A Sec 104 & A-66 Sec 53, Noida, UP</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-neutral-400 hover:text-white underline"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
