import { useState, useMemo } from 'react';
import { usePGData } from '../context/PGDataContext';
import { Calculator, Check, ArrowRight, ShieldCheck, Building } from 'lucide-react';

interface RentCalculatorProps {
  onOpenBooking: (roomName: string) => void;
}

export default function RentCalculator({ onOpenBooking }: RentCalculatorProps) {
  const { rooms, branches } = usePGData();
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || 'double-sharing-104');
  const [stayDurationMonths, setStayDurationMonths] = useState<number>(6);
  const [includeParking, setIncludeParking] = useState<boolean>(false);
  const [includePersonalFridge, setIncludePersonalFridge] = useState<boolean>(false);

  const currentRoom = useMemo(() => {
    return rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  }, [rooms, selectedRoomId]);

  if (!currentRoom) return null;

  const currentBranch = branches.find((b) => b.id === currentRoom.branchId);

  // Calculations
  const baseMonthly = currentRoom.monthlyRent;
  const parkingMonthly = includeParking ? 500 : 0;
  const fridgeMonthly = includePersonalFridge && !currentRoom.specs?.refrigerator?.includes('Personal') ? 600 : 0;

  // Discounts: 6 months = 5% off, 12 months = 10% off
  const discountPercent = stayDurationMonths >= 12 ? 10 : stayDurationMonths >= 6 ? 5 : 0;
  const grossMonthly = baseMonthly + parkingMonthly + fridgeMonthly;
  const monthlyDiscount = Math.round((grossMonthly * discountPercent) / 100);
  const effectiveMonthly = grossMonthly - monthlyDiscount;
  const securityDeposit = baseMonthly; // exactly 1 month refundable
  const totalUpfrontMoveIn = effectiveMonthly + securityDeposit;

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs uppercase tracking-wider font-semibold text-emerald-700 mb-2">
            No Hidden Fees · Food & AC Included
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
            Transparent Rent & Move-In Cost Calculator
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Calculate your exact monthly rent and 1-month refundable move-in deposit for Sector 104 and Sector 53.
            All plans include 3 daily homestyle meals, AC, and Wi-Fi.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-neutral-50/70 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 space-y-6">
            {/* Step 1: Select Room Tier */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-3">
                1. Select Room & Branch
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rooms.map((room) => {
                  const bObj = branches.find((b) => b.id === room.branchId);
                  return (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        selectedRoomId === room.id
                          ? 'border-neutral-900 bg-white shadow-xs ring-1 ring-neutral-900'
                          : 'border-neutral-200 bg-white/70 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                          {bObj?.sector || 'Noida'}
                        </span>
                        <span className="text-[10px] text-neutral-400 capitalize">
                          {room.occupancy === 'single' ? 'Separate' : '2-Sharing'}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-neutral-900 mt-0.5 line-clamp-1">
                        {room.name}
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-sm font-bold font-mono text-neutral-900 tabular-nums">
                          ₹{room.monthlyRent.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium">/mo with food</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Stay Duration & Rebate */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-wider font-bold text-neutral-800">
                  2. Planned Stay Duration
                </label>
                {discountPercent > 0 && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {discountPercent}% Long-Stay Savings Applied
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { months: 1, label: '1 Month', note: 'Standard' },
                  { months: 6, label: '6 Months', note: '5% Off Rent' },
                  { months: 12, label: '12 Months', note: '10% Off Rent' },
                ].map((item) => (
                  <button
                    key={item.months}
                    onClick={() => setStayDurationMonths(item.months)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all ${
                      stayDurationMonths === item.months
                        ? 'border-neutral-900 bg-white shadow-xs font-semibold text-neutral-900'
                        : 'border-neutral-200 bg-white/70 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Optional Add-ons */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-neutral-800 mb-3">
                3. Optional Resident Add-ons
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200 cursor-pointer hover:border-neutral-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeParking}
                      onChange={(e) => setIncludeParking(e.target.checked)}
                      className="w-4 h-4 rounded text-neutral-900 focus:ring-0 border-neutral-300"
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">
                        Reserved Covered 2-Wheeler Parking
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Secure basement slot with CCTV surveillance
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-700 tabular-nums">
                    +₹500/mo
                  </span>
                </label>

                {!currentRoom.specs?.refrigerator?.includes('Personal') && (
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200 cursor-pointer hover:border-neutral-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includePersonalFridge}
                        onChange={(e) => setIncludePersonalFridge(e.target.checked)}
                        className="w-4 h-4 rounded text-neutral-900 focus:ring-0 border-neutral-300"
                      />
                      <div>
                        <div className="text-xs font-semibold text-neutral-900">
                          Personal In-Room Mini Refrigerator (50L)
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Compact, dedicated bedroom fridge
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-700 tabular-nums">
                      +₹600/mo
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="lg:col-span-5 bg-neutral-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                  {currentBranch?.name || 'Relaxstay Noida'}
                </span>
                <h3 className="text-lg font-bold text-neutral-100">{currentRoom.name}</h3>
              </div>
              <Calculator className="w-5 h-5 text-neutral-400" />
            </div>

            {/* Line items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-neutral-300">
                <span>Base Monthly Rent</span>
                <span className="font-mono tabular-nums text-neutral-100">
                  ₹{baseMonthly.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  3 Daily Homestyle Meals + Tea & Snacks
                </span>
                <span className="font-mono text-emerald-400 font-semibold">Included</span>
              </div>

              <div className="flex justify-between items-center text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  High-Speed 300 Mbps Wi-Fi
                </span>
                <span className="font-mono text-emerald-400 font-semibold">Included</span>
              </div>

              <div className="flex justify-between items-center text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Daily Housekeeping & Laundry
                </span>
                <span className="font-mono text-emerald-400 font-semibold">Included</span>
              </div>

              <div className="flex justify-between items-center text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Real Estate Brokerage Fee
                </span>
                <span className="font-mono text-emerald-400 font-semibold">₹0 Free</span>
              </div>

              {includeParking && (
                <div className="flex justify-between items-center text-neutral-300">
                  <span>Covered 2-Wheeler Parking</span>
                  <span className="font-mono tabular-nums text-neutral-100">+₹500</span>
                </div>
              )}

              {fridgeMonthly > 0 && (
                <div className="flex justify-between items-center text-neutral-300">
                  <span>In-Room Mini Refrigerator</span>
                  <span className="font-mono tabular-nums text-neutral-100">+₹600</span>
                </div>
              )}

              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Long-Stay Discount ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">
                    -₹{monthlyDiscount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>

            {/* Effective Monthly */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-neutral-300">Effective Monthly Rent</span>
                <span className="text-2xl font-bold font-mono text-white tabular-nums">
                  ₹{effectiveMonthly.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-neutral-400"> /mo</span>
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                All 3 meals + Wi-Fi + AC backup included
              </div>
            </div>

            {/* Move-in total */}
            <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span>1st Month Rent:</span>
                <span className="font-mono tabular-nums text-neutral-100">
                  ₹{effectiveMonthly.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Refundable Security Deposit (1 Mo):</span>
                <span className="font-mono tabular-nums text-neutral-100">
                  ₹{securityDeposit.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-700 flex justify-between font-bold text-white text-sm">
                <span>Total Estimated Move-in:</span>
                <span className="font-mono text-emerald-300 tabular-nums">
                  ₹{totalUpfrontMoveIn.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking(currentRoom.name)}
              className="w-full py-3.5 text-center text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Schedule Visit for this Configuration</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Refundable Deposit Upon 30-Day Notice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
