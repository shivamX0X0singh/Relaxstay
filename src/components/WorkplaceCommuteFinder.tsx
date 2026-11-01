import { useState } from 'react';
import { usePGData } from '../context/PGDataContext';
import { Briefcase, Building2, MapPin, Navigation, ArrowRight, Train, Car, GraduationCap, CheckCircle } from 'lucide-react';

interface WorkplaceCommuteFinderProps {
  onSelectBranchRooms: (branchId: string) => void;
  onOpenVisitModal: () => void;
}

interface DestinationHub {
  id: string;
  name: string;
  sector: string;
  companies: string;
  bestBranchId: 'sector-104' | 'sector-53';
  bestBranchName: string;
  commuteTime: string;
  commuteMode: string;
  whyBest: string;
}

const NOIDA_HUBS: DestinationHub[] = [
  {
    id: 'advant-navis',
    name: 'Advant Navis Business Park',
    sector: 'Sector 142',
    companies: 'KPMG, British Telecom, Samsung R&D, Regus',
    bestBranchId: 'sector-104',
    bestBranchName: 'Sector 104 (HA-90A)',
    commuteTime: '8 mins drive',
    commuteMode: 'Direct via Expressway',
    whyBest: 'Closest branch. Direct signal-free drive via Noida-Greater Noida Expressway.',
  },
  {
    id: 'candor-135',
    name: 'Candor TechSpace / Oxygen Park',
    sector: 'Sector 135',
    companies: 'Cognizant, Genpact, MetLife, Accenture, Sopra',
    bestBranchId: 'sector-104',
    bestBranchName: 'Sector 104 (HA-90A)',
    commuteTime: '10 mins drive',
    commuteMode: 'Via Dadri Main Rd / Expressway',
    whyBest: 'Just 5 km away. Frequent shared cabs and auto connectivity available right outside.',
  },
  {
    id: 'sec-62-it',
    name: 'Sector 62 & 63 IT Park',
    sector: 'Sector 62/63',
    companies: 'Barclays, IBM, Ericsson, Tech Mahindra, Birlasoft',
    bestBranchId: 'sector-53',
    bestBranchName: 'Sector 53 (A-66)',
    commuteTime: '6 mins drive',
    commuteMode: 'Via Captain Shashi Kant Marg',
    whyBest: 'Sector 53 is right next to Sector 62. Quick 6-minute commute without Expressway toll/traffic.',
  },
  {
    id: 'blue-line-metro',
    name: 'Sector 52 Metro Interchange',
    sector: 'Sector 52/51',
    companies: 'Direct Blue Line to Connaught Place / Cyber City & Aqua Line to Greater Noida',
    bestBranchId: 'sector-53',
    bestBranchName: 'Sector 53 (A-66)',
    commuteTime: '3 mins walk / e-rickshaw',
    commuteMode: 'Walking or E-rickshaw',
    whyBest: 'Only 700 meters from A-66 Sector 53. Unmatched metro connectivity across NCR.',
  },
  {
    id: 'hcl-adobe-126',
    name: 'Tech Boulevard & HCL Campus',
    sector: 'Sector 126/127',
    companies: 'HCL Technologies, Adobe, Oracle, Paytm HQ',
    bestBranchId: 'sector-104',
    bestBranchName: 'Sector 104 (HA-90A)',
    commuteTime: '7 mins drive',
    commuteMode: 'Via Expressway Slip Road',
    whyBest: 'Located 3.5 km away. Effortless daily morning commute without cross-city jams.',
  },
  {
    id: 'amity-university',
    name: 'Amity University Noida',
    sector: 'Sector 125',
    companies: 'Undergraduate & Masters Campus',
    bestBranchId: 'sector-104',
    bestBranchName: 'Sector 104 (HA-90A)',
    commuteTime: '9 mins drive',
    commuteMode: 'Via Dadri Main Road',
    whyBest: 'Popular student residential hub. Peaceful study environment with all 3 meals included.',
  },
];

export default function WorkplaceCommuteFinder({ onSelectBranchRooms, onOpenVisitModal }: WorkplaceCommuteFinderProps) {
  const [selectedHubId, setSelectedHubId] = useState<string>(NOIDA_HUBS[0].id);
  const { setSelectedBranchId } = usePGData();

  const currentHub = NOIDA_HUBS.find((h) => h.id === selectedHubId) || NOIDA_HUBS[0];

  const handleApplyHub = (hub: DestinationHub) => {
    setSelectedHubId(hub.id);
    setSelectedBranchId(hub.bestBranchId);
    onSelectBranchRooms(hub.bestBranchId);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Noida Commute Search
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-2">
            Find the Best Relaxstay Branch from Your Office / Campus
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Pick your workplace or college in Noida to discover which branch gives you the shortest daily commute.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-500 shrink-0 font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Both Branches: ₹13k 2-sharing & ₹20k separate room</span>
        </div>
      </div>

      {/* Hub Pill Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {NOIDA_HUBS.map((hub) => {
          const isSelected = selectedHubId === hub.id;
          return (
            <button
              key={hub.id}
              onClick={() => handleApplyHub(hub)}
              className={`p-3 rounded-xl border text-left transition-all shrink-0 min-w-[210px] ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900 shadow-xs'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="text-[10px] font-bold uppercase text-neutral-400">
                {hub.sector}
              </div>
              <div className="text-xs font-bold text-neutral-900 mt-0.5 truncate">
                {hub.name}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                ⏱ {hub.commuteTime}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Match Card */}
      <div className="mt-4 p-5 rounded-xl bg-neutral-50 border border-neutral-200/90 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
            <Briefcase className="w-4 h-4 text-neutral-700" />
            <span>Target Destination: {currentHub.name} ({currentHub.sector})</span>
          </div>
          <div className="text-xs text-neutral-600">
            Prominent Companies: <strong className="text-neutral-800">{currentHub.companies}</strong>
          </div>

          <div className="p-3 bg-white rounded-lg border border-neutral-200 text-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Recommended Branch: Relaxstay {currentHub.bestBranchName}</span>
            </div>
            <div className="text-neutral-600 pl-6">
              {currentHub.whyBest} ({currentHub.commuteMode} · <strong>{currentHub.commuteTime}</strong>)
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="#rooms"
            onClick={() => handleApplyHub(currentHub)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Show Rooms at {currentHub.bestBranchName.split('(')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenVisitModal}
            className="px-4 py-2.5 rounded-lg border border-neutral-300 hover:border-neutral-400 bg-white text-neutral-800 text-xs font-semibold transition-colors"
          >
            Book Free Visit
          </button>
        </div>
      </div>
    </div>
  );
}
