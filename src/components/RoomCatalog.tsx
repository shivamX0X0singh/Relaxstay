import { useState } from 'react';
import { Room } from '../types';
import { usePGData } from '../context/PGDataContext';
import { Check, X, Building, Search, Sparkles, Filter, RotateCcw } from 'lucide-react';

interface RoomCatalogProps {
  onSelectRoomForBooking: (roomId: string) => void;
  onOpenAdmin?: () => void;
}

export default function RoomCatalog({ onSelectRoomForBooking, onOpenAdmin }: RoomCatalogProps) {
  const {
    branches,
    searchedRooms,
    searchFilters,
    setSearchFilters,
    resetSearchFilters,
    activeFilterCount,
    isAdminLoggedIn,
  } = usePGData();

  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);

  return (
    <section id="rooms" className="py-16 sm:py-20 bg-neutral-50/50 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700">
                All 3 Daily Meals + Wi-Fi Included · Zero Brokerage
              </span>
              {isAdminLoggedIn && onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="text-[11px] text-neutral-500 hover:text-neutral-900 underline font-medium"
                >
                  (Edit in Admin)
                </button>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
              Available Rooms & Suites in Noida
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl">
              Featuring <strong>₹13,000/mo 2-sharing</strong> and <strong>₹20,000/mo separate rooms</strong> with 3 daily homestyle meals, AC, and high-speed Wi-Fi.
            </p>
          </div>

          {/* Active Filter Chips & Reset */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {activeFilterCount > 0 ? (
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-neutral-200 shadow-xs">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-neutral-800">
                  {searchedRooms.length} room{searchedRooms.length === 1 ? '' : 's'} matching
                </span>
                <button
                  onClick={resetSearchFilters}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 ml-2 pl-2 border-l border-neutral-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>
            ) : (
              <span className="text-neutral-500 text-xs">
                Showing all available room tiers
              </span>
            )}
          </div>
        </div>

        {/* Live Filter Bar in Catalog */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Branch segmented controls */}
            <div className="inline-flex items-center p-1 bg-neutral-100 rounded-lg font-medium">
              <button
                onClick={() => setSearchFilters((prev) => ({ ...prev, branchId: 'all' }))}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  searchFilters.branchId === 'all'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Noida
              </button>
              <button
                onClick={() => setSearchFilters((prev) => ({ ...prev, branchId: 'sector-104' }))}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  searchFilters.branchId === 'sector-104'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Sec 104 (HA-90A)
              </button>
              <button
                onClick={() => setSearchFilters((prev) => ({ ...prev, branchId: 'sector-53' }))}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  searchFilters.branchId === 'sector-53'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Sec 53 (A-66)
              </button>
            </div>

            {/* Sharing selector */}
            <div className="inline-flex items-center p-1 bg-neutral-100 rounded-lg font-medium">
              <button
                onClick={() => setSearchFilters((prev) => ({ ...prev, occupancy: 'all' }))}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  searchFilters.occupancy === 'all'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Occupancies
              </button>
              <button
                onClick={() => setSearchFilters((prev) => ({ ...prev, occupancy: 'double' }))}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  searchFilters.occupancy === 'double'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                2-Sharing (13k)
              </button>
              <button
                onClick={() => setSearchFilters((prev) => ({ ...prev, occupancy: 'single' }))}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  searchFilters.occupancy === 'single'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Separate (20k)
              </button>
            </div>
          </div>

          {/* Search keyword indicator if active */}
          {searchFilters.keyword && (
            <div className="text-xs text-neutral-600 flex items-center gap-2">
              <span>Search query: <strong className="text-neutral-900">"{searchFilters.keyword}"</strong></span>
              <button
                onClick={() => setSearchFilters((prev) => ({ ...prev, keyword: '' }))}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Room Cards Grid or Empty Search State */}
        {searchedRooms.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-neutral-200 shadow-xs max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">No rooms match your search</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Try clearing your search query or adjusting your filters to see available rooms in Sector 104 and Sector 53.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={resetSearchFilters}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold"
              >
                Show All Rooms
              </button>
              <button
                onClick={() => setSearchFilters({ ...searchFilters, occupancy: 'double', keyword: '', maxBudget: 0 })}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold"
              >
                View 2-Sharing (₹13k)
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {searchedRooms.map((room) => {
              const branchObj = branches.find((b) => b.id === room.branchId);

              return (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:border-neutral-300 transition-all flex flex-col group"
                >
                  {/* Room Image Container */}
                  <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Branch tag overlay */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded font-medium flex items-center gap-1.5">
                      <Building className="w-3 h-3 text-emerald-400" />
                      <span>{branchObj?.sector || 'Noida'} Branch</span>
                    </div>

                    {/* Quiet unboxed text overlay in bottom corner */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-2 font-medium">
                        <span className="capitalize">{room.occupancy === 'single' ? 'Separate Room' : `${room.occupancy}-Sharing`}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">
                          {room.genderWing === 'unisex' ? 'All Genders Wing' : `${room.genderWing} Wing`}
                        </span>
                      </div>
                      <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] text-neutral-200 font-mono">
                        {room.availableBeds} beds vacant
                      </span>
                    </div>
                  </div>

                  {/* Room Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean unboxed metadata strip */}
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 font-medium">
                        <span>{room.roomSize}</span>
                        <span aria-hidden="true">·</span>
                        <span>Attached Ensuite Bath</span>
                        <span aria-hidden="true">·</span>
                        <span>3 Homestyle Meals Included</span>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        {room.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 mb-4 line-clamp-2">
                        {room.description}
                      </p>

                      {/* Highlights list */}
                      <ul className="space-y-1.5 text-xs text-neutral-700 mb-6">
                        {room.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and CTA row */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold font-mono text-neutral-900 tabular-nums">
                            ₹{room.monthlyRent.toLocaleString('en-IN')}
                          </span>
                          {room.originalPrice > room.monthlyRent && (
                            <span className="text-xs text-neutral-400 line-through tabular-nums font-mono">
                              ₹{room.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-xs text-neutral-500 font-medium">/ month</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          Food + AC + Wi-Fi Included · No Brokerage
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedRoomForModal(room)}
                          className="px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => onSelectRoomForBooking(room.name)}
                          className="px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
                        >
                          Book Visit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Room Detail Inspector Modal */}
      {selectedRoomForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            {/* Modal Header */}
            <div className="relative aspect-[16/9] bg-neutral-100">
              <img
                src={selectedRoomForModal.image}
                alt={selectedRoomForModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedRoomForModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-medium text-emerald-300">
                  {branches.find((b) => b.id === selectedRoomForModal.branchId)?.address || 'Noida'} · {selectedRoomForModal.roomSize}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{selectedRoomForModal.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Specs Grid */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-3">
                  Room Specifications & Furniture
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-700">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                    <div className="font-semibold text-neutral-900">Bed Setup</div>
                    <div className="text-neutral-600 mt-0.5">Solid wood with orthopedic mattress</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                    <div className="font-semibold text-neutral-900">Ensuite Bathroom</div>
                    <div className="text-neutral-600 mt-0.5">Attached with 25L instant geyser</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                    <div className="font-semibold text-neutral-900">Wardrobe Storage</div>
                    <div className="text-neutral-600 mt-0.5">{selectedRoomForModal.specs.cupboard}</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                    <div className="font-semibold text-neutral-900">Climate Control</div>
                    <div className="text-neutral-600 mt-0.5">Inverter AC + ceiling fan</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                    <div className="font-semibold text-neutral-900">Workstation</div>
                    <div className="text-neutral-600 mt-0.5">Study desk + ergonomic chair</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                    <div className="font-semibold text-neutral-900">Power Backup</div>
                    <div className="text-neutral-600 mt-0.5">100% DG backup 24/7</div>
                  </div>
                </div>
              </div>

              {/* All Inclusions */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-2">
                  Complimentary Services Included in Monthly Rent
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                  {selectedRoomForModal.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>3 Daily Cooked Meals (Breakfast, Lunch, Dinner) + Evening Chai</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Daily Room Sweeping, Mopping & Garbage Disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>High-Speed 300 Mbps Fiber Wi-Fi with Unlimited Data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Automated Washing Machines & Iron Station Access</span>
                  </li>
                </ul>
              </div>

              {/* Deposit & Pricing summary */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-emerald-800 font-medium">Monthly Rent (All-Inclusive)</div>
                  <div className="text-2xl font-bold font-mono text-emerald-950 tabular-nums">
                    ₹{selectedRoomForModal.monthlyRent.toLocaleString('en-IN')}
                    <span className="text-xs font-sans font-normal text-emerald-800"> / month</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Security Deposit: exactly 1 month (₹{selectedRoomForModal.monthlyRent.toLocaleString('en-IN')}) · 100% Refundable
                  </div>
                </div>

                <button
                  onClick={() => {
                    const roomName = selectedRoomForModal.name;
                    setSelectedRoomForModal(null);
                    onSelectRoomForBooking(roomName);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
                >
                  Reserve / Schedule Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
