export type OccupancyType = 'single' | 'double' | 'triple';
export type GenderWing = 'boys' | 'girls' | 'unisex';

export interface Branch {
  id: string;
  name: string;
  sector: string;
  address: string;
  pincode: string;
  landmark: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  googleMapsUrl: string;
  metroConnectivity: string;
  expresswayDistance: string;
  status: 'active' | 'filling_fast';
  image: string;
}

export interface Room {
  id: string;
  branchId: string; // 'sector-104' | 'sector-53' | 'both'
  name: string;
  occupancy: OccupancyType;
  genderWing: GenderWing;
  monthlyRent: number;
  originalPrice: number;
  depositMonths: number;
  image: string;
  roomSize: string; // e.g. "240 sq.ft"
  features: string[];
  specs: {
    ac: boolean;
    attachedBath: boolean;
    balcony: boolean;
    smartTv: boolean;
    studyDesk: boolean;
    cupboard: string;
    geyser: boolean;
    refrigerator: string;
  };
  description: string;
  isPopular?: boolean;
  availableBeds: number;
}

export interface DayMealPlan {
  day: string;
  breakfast: string[];
  lunch: string[];
  eveningSnacks: string[];
  dinner: string[];
  specialItem?: string;
}

export interface Landmark {
  name: string;
  category: 'transit' | 'it_hub' | 'lifestyle' | 'education';
  distance: string;
  travelTime: string;
  note: string;
}

export interface Testimonial {
  name: string;
  role: string;
  companyOrCollege: string;
  roomType: string;
  branchName: string;
  stayDuration: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookingLead {
  id: string;
  createdAt: string;
  branchId: string;
  branchName: string;
  fullName: string;
  phone: string;
  email?: string;
  gender: string;
  roomPreference: string;
  visitDate: string;
  visitSlot: string;
  moveInDate?: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'Visited' | 'Booked';
}

export interface SearchFilters {
  keyword: string;
  branchId: string; // 'all' | 'sector-104' | 'sector-53'
  occupancy: string; // 'all' | 'single' | 'double' | 'triple'
  genderWing: string; // 'all' | 'boys' | 'girls'
  maxBudget: number; // 0 for unlimited, or e.g. 10000, 15000, 20000
  hasBalcony?: boolean;
}


