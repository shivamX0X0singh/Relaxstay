import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Branch, Room, DayMealPlan, FaqItem, BookingLead, SearchFilters } from '../types';
import { DEFAULT_BRANCHES, DEFAULT_ROOMS, WEEKLY_MENU, FAQS } from '../data/pgData';

interface PGDataContextType {
  branches: Branch[];
  rooms: Room[];
  weeklyMenu: DayMealPlan[];
  faqs: FaqItem[];
  bookingLeads: BookingLead[];
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
  currentBranch: Branch;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  // Search & Filter system
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetSearchFilters: () => void;
  searchedRooms: Room[];
  activeFilterCount: number;
  // Mutations
  updateBranch: (branchId: string, updates: Partial<Branch>) => void;
  addBranch: (branch: Branch) => void;
  deleteBranch: (branchId: string) => void;
  updateRoom: (roomId: string, updates: Partial<Room>) => void;
  addRoom: (room: Room) => void;
  deleteRoom: (roomId: string) => void;
  updateDayMenu: (dayIndex: number, updates: Partial<DayMealPlan>) => void;
  updateFaq: (index: number, updates: Partial<FaqItem>) => void;
  addFaq: (faq: FaqItem) => void;
  deleteFaq: (index: number) => void;
  addBookingLead: (lead: Omit<BookingLead, 'id' | 'createdAt' | 'status'>) => string;
  updateBookingLeadStatus: (leadId: string, status: BookingLead['status']) => void;
  deleteBookingLead: (leadId: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  BRANCHES: 'relaxstay_branches_v1',
  ROOMS: 'relaxstay_rooms_v1',
  MENU: 'relaxstay_menu_v1',
  FAQS: 'relaxstay_faqs_v1',
  LEADS: 'relaxstay_leads_v1',
  ADMIN_AUTH: 'relaxstay_admin_auth_v1',
};

const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  keyword: '',
  branchId: 'all',
  occupancy: 'all',
  genderWing: 'all',
  maxBudget: 0,
  hasBalcony: false,
};

const INITIAL_MOCK_LEADS: BookingLead[] = [
  {
    id: 'RLX-104-7821',
    createdAt: '2026-10-31 14:20',
    branchId: 'sector-104',
    branchName: 'Relaxstay - Sector 104',
    fullName: 'Ankit Tiwari',
    phone: '9876543210',
    email: 'ankit.tiwari@techcorp.com',
    gender: 'male',
    roomPreference: 'Premium 2-Sharing Room with Food (₹13,000)',
    visitDate: '2026-11-02',
    visitSlot: '12:00 PM - 3:00 PM',
    moveInDate: '2026-11-05',
    notes: 'Working in Candor TechSpace Sector 135. Need parking for bike.',
    status: 'New',
  },
  {
    id: 'RLX-53-4109',
    createdAt: '2026-10-30 18:45',
    branchId: 'sector-53',
    branchName: 'Relaxstay - Sector 53',
    fullName: 'Shreya Kapoor',
    phone: '9812345678',
    email: 'shreya.k@consulting.in',
    gender: 'female',
    roomPreference: '2-Sharing Girls Wing with Food (₹13,000)',
    visitDate: '2026-11-01',
    visitSlot: '3:00 PM - 6:00 PM',
    moveInDate: '2026-11-10',
    notes: 'Moving from Gurugram. Prefers Sector 53 near Blue Line Metro.',
    status: 'Contacted',
  },
];

const PGDataContext = createContext<PGDataContextType | undefined>(undefined);

export const PGDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [branches, setBranches] = useState<Branch[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRANCHES);
      return saved ? JSON.parse(saved) : DEFAULT_BRANCHES;
    } catch {
      return DEFAULT_BRANCHES;
    }
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROOMS);
      return saved ? JSON.parse(saved) : DEFAULT_ROOMS;
    } catch {
      return DEFAULT_ROOMS;
    }
  });

  const [weeklyMenu, setWeeklyMenu] = useState<DayMealPlan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      return saved ? JSON.parse(saved) : WEEKLY_MENU;
    } catch {
      return WEEKLY_MENU;
    }
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : FAQS;
    } catch {
      return FAQS;
    }
  });

  const [bookingLeads, setBookingLeads] = useState<BookingLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : INITIAL_MOCK_LEADS;
    } catch {
      return INITIAL_MOCK_LEADS;
    }
  });

  const [selectedBranchId, setSelectedBranchIdState] = useState<string>('all');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(DEFAULT_SEARCH_FILTERS);

  const setSelectedBranchId = (id: string) => {
    setSelectedBranchIdState(id);
    setSearchFilters((prev) => ({ ...prev, branchId: id }));
  };

  const resetSearchFilters = () => {
    setSearchFilters(DEFAULT_SEARCH_FILTERS);
    setSelectedBranchIdState('all');
  };

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches));
    } catch (e) {
      console.error(e);
    }
  }, [branches]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    } catch (e) {
      console.error(e);
    }
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(weeklyMenu));
    } catch (e) {
      console.error(e);
    }
  }, [weeklyMenu]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.error(e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(bookingLeads));
    } catch (e) {
      console.error(e);
    }
  }, [bookingLeads]);

  const loginAdmin = (password: string): boolean => {
    if (password === 'admin123' || password === 'relaxstay') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch (e) {
      console.error(e);
    }
  };

  const updateBranch = (branchId: string, updates: Partial<Branch>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, ...updates } : b))
    );
  };

  const addBranch = (branch: Branch) => {
    setBranches((prev) => [...prev, branch]);
  };

  const deleteBranch = (branchId: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== branchId));
  };

  const updateRoom = (roomId: string, updates: Partial<Room>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, ...updates } : r))
    );
  };

  const addRoom = (room: Room) => {
    setRooms((prev) => [room, ...prev]);
  };

  const deleteRoom = (roomId: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  const updateDayMenu = (dayIndex: number, updates: Partial<DayMealPlan>) => {
    setWeeklyMenu((prev) =>
      prev.map((m, idx) => (idx === dayIndex ? { ...m, ...updates } : m))
    );
  };

  const updateFaq = (index: number, updates: Partial<FaqItem>) => {
    setFaqs((prev) =>
      prev.map((f, idx) => (idx === index ? { ...f, ...updates } : f))
    );
  };

  const addFaq = (faq: FaqItem) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const deleteFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addBookingLead = (lead: Omit<BookingLead, 'id' | 'createdAt' | 'status'>) => {
    const code = `RLX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: BookingLead = {
      ...lead,
      id: code,
      createdAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      status: 'New',
    };
    setBookingLeads((prev) => [newLead, ...prev]);
    return code;
  };

  const updateBookingLeadStatus = (leadId: string, status: BookingLead['status']) => {
    setBookingLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const deleteBookingLead = (leadId: string) => {
    setBookingLeads((prev) => prev.filter((l) => l.id !== leadId));
  };

  const resetToDefaults = () => {
    setBranches(DEFAULT_BRANCHES);
    setRooms(DEFAULT_ROOMS);
    setWeeklyMenu(WEEKLY_MENU);
    setFaqs(FAQS);
    setBookingLeads(INITIAL_MOCK_LEADS);
    localStorage.clear();
  };

  const currentBranch =
    branches.find((b) => b.id === selectedBranchId) || branches[0];

  // Powerful live search filtering logic
  const searchedRooms = useMemo(() => {
    const q = searchFilters.keyword.trim().toLowerCase();

    return rooms.filter((room) => {
      // 1. Branch match
      if (searchFilters.branchId !== 'all') {
        if (room.branchId !== searchFilters.branchId && room.branchId !== 'both') {
          return false;
        }
      }

      // 2. Occupancy match
      if (searchFilters.occupancy !== 'all') {
        if (room.occupancy !== searchFilters.occupancy) return false;
      }

      // 3. Gender Wing match
      if (searchFilters.genderWing !== 'all') {
        if (room.genderWing !== 'unisex' && room.genderWing !== searchFilters.genderWing) {
          return false;
        }
      }

      // 4. Max budget match
      if (searchFilters.maxBudget > 0) {
        if (room.monthlyRent > searchFilters.maxBudget) return false;
      }

      // 5. Balcony requirement
      if (searchFilters.hasBalcony) {
        if (!room.specs?.balcony) return false;
      }

      // 6. Keyword search across room name, description, features, branch address, landmarks, price
      if (q) {
        const branchObj = branches.find((b) => b.id === room.branchId);
        const searchableCorpus = [
          room.name,
          room.description,
          room.occupancy,
          room.occupancy === 'single' ? 'separate private single 1-sharing' : '',
          room.occupancy === 'double' ? '2-sharing twin double' : '',
          room.occupancy === 'triple' ? '3-sharing triple economy' : '',
          room.genderWing,
          room.genderWing === 'girls' ? 'girls women female' : '',
          room.genderWing === 'boys' ? 'boys men male' : '',
          String(room.monthlyRent),
          `${Math.round(room.monthlyRent / 1000)}k`,
          room.features.join(' '),
          room.roomSize,
          branchObj?.name || '',
          branchObj?.sector || '',
          branchObj?.address || '',
          branchObj?.landmark || '',
          branchObj?.metroConnectivity || '',
          branchObj?.expresswayDistance || '',
          'food meals breakfast lunch dinner tiffin wifi ac',
        ]
          .join(' ')
          .toLowerCase();

        // Check if all tokens in query match
        const tokens = q.split(/\s+/).filter(Boolean);
        const matchesAllTokens = tokens.every((tok) => searchableCorpus.includes(tok));
        if (!matchesAllTokens) return false;
      }

      return true;
    });
  }, [rooms, branches, searchFilters]);

  // Count active non-default filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchFilters.keyword) count++;
    if (searchFilters.branchId !== 'all') count++;
    if (searchFilters.occupancy !== 'all') count++;
    if (searchFilters.genderWing !== 'all') count++;
    if (searchFilters.maxBudget > 0) count++;
    if (searchFilters.hasBalcony) count++;
    return count;
  }, [searchFilters]);

  return (
    <PGDataContext.Provider
      value={{
        branches,
        rooms,
        weeklyMenu,
        faqs,
        bookingLeads,
        selectedBranchId,
        setSelectedBranchId,
        currentBranch,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        searchFilters,
        setSearchFilters,
        resetSearchFilters,
        searchedRooms,
        activeFilterCount,
        updateBranch,
        addBranch,
        deleteBranch,
        updateRoom,
        addRoom,
        deleteRoom,
        updateDayMenu,
        updateFaq,
        addFaq,
        deleteFaq,
        addBookingLead,
        updateBookingLeadStatus,
        deleteBookingLead,
        resetToDefaults,
      }}
    >
      {children}
    </PGDataContext.Provider>
  );
};

export const usePGData = () => {
  const context = useContext(PGDataContext);
  if (!context) {
    throw new Error('usePGData must be used within a PGDataProvider');
  }
  return context;
};
