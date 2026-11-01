/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PGDataProvider, usePGData } from './context/PGDataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkplaceCommuteFinder from './components/WorkplaceCommuteFinder';
import RoomCatalog from './components/RoomCatalog';
import RentCalculator from './components/RentCalculator';
import AmenitiesSection from './components/AmenitiesSection';
import MessMenuSection from './components/MessMenuSection';
import LocationSection from './components/LocationSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import VisitModal from './components/VisitModal';
import AdminPortal from './components/AdminPortal';
import { MessageSquare, PhoneCall, ShieldCheck } from 'lucide-react';

function AppContent() {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefilledRoomName, setPrefilledRoomName] = useState<string | undefined>(undefined);
  const { currentBranch, setSelectedBranchId } = usePGData();

  // Check URL query parameters for ?admin=true or hash #admin
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
  }, []);

  const handleOpenVisitModal = (prefillRoom?: string) => {
    setPrefilledRoomName(prefillRoom);
    setIsVisitModalOpen(true);
  };

  const handleCloseVisitModal = () => {
    setIsVisitModalOpen(false);
    setPrefilledRoomName(undefined);
  };

  const handleSelectBranchRooms = (branchId: string) => {
    setSelectedBranchId(branchId);
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <Navbar
        onOpenVisitModal={() => handleOpenVisitModal()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with Master Easy-Search Console */}
        <Hero
          onOpenVisitModal={() => handleOpenVisitModal()}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Workplace & College Commute Matcher */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkplaceCommuteFinder
            onSelectBranchRooms={handleSelectBranchRooms}
            onOpenVisitModal={() => handleOpenVisitModal()}
          />
        </section>

        {/* Search Results / Room Catalog */}
        <RoomCatalog
          onSelectRoomForBooking={(room) => handleOpenVisitModal(room)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Interactive Transparent Calculator */}
        <RentCalculator onOpenBooking={(room) => handleOpenVisitModal(room)} />

        {/* Amenities Bento Grid */}
        <AmenitiesSection />

        {/* Weekly Mess Menu */}
        <MessMenuSection />

        {/* Both Branches Showcase & Map */}
        <LocationSection onOpenVisitModal={() => handleOpenVisitModal()} />

        {/* Proof / Testimonials */}
        <TestimonialsSection />

        {/* FAQs & House Rules */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Interactive Visit Scheduler & Room Reservation Modal */}
      <VisitModal
        isOpen={isVisitModalOpen}
        onClose={handleCloseVisitModal}
        prefillRoomName={prefilledRoomName}
      />

      {/* Admin Control Panel */}
      {isAdminOpen && (
        <AdminPortal onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Floating Action Affordance */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Quick Admin Access Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="p-3 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-800 transition-transform active:scale-95 flex items-center gap-1.5"
          title="Open Admin Portal to make changes"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold pr-1 hidden sm:inline">Admin</span>
        </button>

        <a
          href={`tel:${currentBranch.phone}`}
          className="p-3 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-800 transition-transform active:scale-95 sm:hidden"
          title="Call Property Caretaker"
          aria-label="Call Property Caretaker"
        >
          <PhoneCall className="w-5 h-5 text-emerald-400" />
        </a>

        <a
          href={`https://wa.me/${currentBranch.whatsapp}?text=Hi%20Relaxstay,%20I%20am%20inquiring%20about%20room%20availability%20(13k%202-sharing%20/%2020k%20separate%20room)%20at%20Noida.`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all font-semibold text-xs active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PGDataProvider>
      <AppContent />
    </PGDataProvider>
  );
}
