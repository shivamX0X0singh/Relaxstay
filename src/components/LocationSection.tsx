import { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Building, Train, Car } from 'lucide-react';
import { usePGData } from '../context/PGDataContext';

interface LocationSectionProps {
  onOpenVisitModal: () => void;
}

export default function LocationSection({ onOpenVisitModal }: LocationSectionProps) {
  const { branches, selectedBranchId, setSelectedBranchId } = usePGData();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="location" className="py-16 sm:py-20 bg-neutral-50/60 border-b border-neutral-200/80">
      <div id="branches" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-emerald-700 mb-2">
            2 Strategic Noida Locations
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
            Our Branches in Sector 104 & Sector 53
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Choose the branch closest to your workplace or university. Both properties offer identical luxury amenities,
            3 homestyle meals, high-speed Wi-Fi, and 100% DG power backup.
          </p>
        </div>

        {/* 2 Branches Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {branches.map((branch) => {
            const isSelected = selectedBranchId === branch.id;
            const isSector104 = branch.id === 'sector-104';

            return (
              <div
                key={branch.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-xs flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                    : 'border-neutral-200/90 hover:border-neutral-300'
                }`}
              >
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {branch.sector} Branch
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-2">
                        {branch.name}
                      </h3>
                    </div>

                    <button
                      onClick={() => setSelectedBranchId(branch.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Filter by this Branch'}
                    </button>
                  </div>

                  {/* Address Box */}
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm text-neutral-900">
                          {branch.address}
                        </div>
                        <div className="text-neutral-500 mt-0.5">
                          PIN: {branch.pincode} · {branch.landmark}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connectivity Highlights */}
                  <div className="space-y-2 text-xs text-neutral-700">
                    <div className="flex items-center gap-2">
                      <Train className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Metro:</strong> {branch.metroConnectivity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Expressway / IT Hub:</strong> {branch.expresswayDistance}</span>
                    </div>
                  </div>

                  {/* Rates Quick Teaser */}
                  <div className="p-3.5 bg-neutral-50 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="text-neutral-500">2-Sharing with Food:</span>
                      <span className="font-mono font-bold text-neutral-900 ml-1.5">₹13,000/mo</span>
                    </div>
                    <div className="h-4 w-px bg-neutral-200" />
                    <div>
                      <span className="text-neutral-500">Separate Room:</span>
                      <span className="font-mono font-bold text-neutral-900 ml-1.5">₹20,000/mo</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 bg-neutral-50/70 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyAddress(branch.id, `${branch.address}, India - ${branch.pincode}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-white text-xs font-semibold text-neutral-700"
                    >
                      {copiedId === branch.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3 text-emerald-200" />
                    </a>
                  </div>

                  <button
                    onClick={onOpenVisitModal}
                    className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive Map for Active Branch */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>
                {selectedBranchId === 'sector-53'
                  ? 'A-66 Sector 53 Noida (Near Sec 52 Metro Interchange)'
                  : 'HA-90A Sector 104 Noida (Near Expressway & Starling Mall)'}
              </span>
            </div>
            <span className="text-[11px] text-neutral-500">Live Satellite & Directions Map</span>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[24/9] min-h-[300px] w-full bg-neutral-100">
            <iframe
              title="Relaxstay PG Branches Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                selectedBranchId === 'sector-53'
                  ? 'A-66 Sector 53 Noida Uttar Pradesh'
                  : 'HA-90A Sector 104 Noida Uttar Pradesh'
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600 flex flex-wrap items-center justify-between gap-3">
            <div>
              Both branches welcome prospective residents for free in-person visits daily from 9:00 AM to 8:30 PM.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400">·</span>
              <a
                href={
                  selectedBranchId === 'sector-53'
                    ? 'https://www.google.com/maps/search/?api=1&query=A-66+Sector+53+Noida+Uttar+Pradesh'
                    : 'https://www.google.com/maps/search/?api=1&query=HA-90A+Sector+104+Noida+Uttar+Pradesh'
                }
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
