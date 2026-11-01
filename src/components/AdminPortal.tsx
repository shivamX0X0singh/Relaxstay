import { useState } from 'react';
import { usePGData } from '../context/PGDataContext';
import { Room, Branch, DayMealPlan, FaqItem, BookingLead } from '../types';
import {
  Shield,
  KeyRound,
  LogOut,
  ArrowLeft,
  Building,
  Bed,
  Utensils,
  HelpCircle,
  Users,
  Plus,
  Trash2,
  Edit2,
  Check,
  RefreshCw,
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

interface AdminPortalProps {
  onClose: () => void;
}

interface ConfirmDialogState {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export default function AdminPortal({ onClose }: AdminPortalProps) {
  const {
    branches,
    rooms,
    weeklyMenu,
    faqs,
    bookingLeads,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    updateRoom,
    addRoom,
    deleteRoom,
    updateBranch,
    addBranch,
    updateDayMenu,
    updateFaq,
    addFaq,
    deleteFaq,
    updateBookingLeadStatus,
    deleteBookingLead,
    resetToDefaults,
  } = usePGData();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'rooms' | 'branches' | 'menu' | 'leads' | 'faqs'>('rooms');
  const [saveToast, setSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Changes Saved');
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  // Room editing modal/form state
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [roomEditForm, setRoomEditForm] = useState<Partial<Room>>({});

  // Branch editing state
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchEditForm, setBranchEditForm] = useState<Partial<Branch>>({});

  // Menu editing state
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  // FAQ editing state
  const [editingFaqIdx, setEditingFaqIdx] = useState<number | null>(null);
  const [faqEditForm, setFaqEditForm] = useState<Partial<FaqItem>>({});
  const [newFaqForm, setNewFaqForm] = useState<FaqItem>({ question: '', answer: '' });
  const [showAddFaq, setShowAddFaq] = useState(false);

  const triggerToast = (msg = 'Changes Saved') => {
    setToastMessage(msg);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleQuickLogin = () => {
    loginAdmin('admin123');
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Relaxstay Admin</h3>
                <p className="text-[11px] text-neutral-500">Website & Branch Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Enter Admin Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="Enter passcode (default: admin123)"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError(false);
                  }}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>
              {authError && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">
                  Invalid passcode. Use 'admin123' or 'relaxstay'.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Sign In to Admin Portal
            </button>

            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
            >
              ⚡ Quick 1-Click Owner Unlock (admin123)
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
            <button
              onClick={onClose}
              className="text-xs text-neutral-500 hover:text-neutral-900"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-neutral-100 overflow-y-auto flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-neutral-900 text-white border-b border-neutral-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </button>
            <div className="h-5 w-px bg-neutral-700" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-sm tracking-tight text-white">
                Relaxstay Admin Panel
              </span>
              <span className="text-[11px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                Live Changes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                <Check className="w-3.5 h-3.5" />
                <span>{toastMessage}</span>
              </span>
            )}
            <button
              onClick={() => {
                setConfirmDialog({
                  title: 'Reset All Data to Defaults?',
                  message: 'This will reset all rooms, branches, and menus back to the initial factory settings. Any custom changes will be overwritten.',
                  confirmLabel: 'Yes, Reset Everything',
                  onConfirm: () => {
                    resetToDefaults();
                    setConfirmDialog(null);
                    triggerToast('Reset to defaults successfully');
                  },
                });
              }}
              className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-white rounded bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center gap-1"
              title="Reset data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-2.5 py-1.5 text-xs text-red-300 hover:text-white rounded bg-red-950/50 hover:bg-red-900 border border-red-800/60 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto text-xs sm:text-sm font-medium py-2">
            {[
              { id: 'rooms', label: 'Rooms & Pricing', icon: Bed, count: rooms.length },
              { id: 'branches', label: 'Branches & Addresses', icon: Building, count: branches.length },
              { id: 'menu', label: 'Weekly Mess Menu', icon: Utensils, count: 7 },
              { id: 'leads', label: 'Booking Enquiries / Visits', icon: Users, count: bookingLeads.length },
              { id: 'faqs', label: 'House Rules & FAQs', icon: HelpCircle, count: faqs.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-2.5 px-3 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-neutral-900 text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-full font-mono">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ===================== TAB 1: ROOMS & PRICING ===================== */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-neutral-200">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Rooms & Rates Management</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update rents (e.g. ₹13k 2-sharing, ₹20k separate room with food), branch allocation, and availability.
                </p>
              </div>

              <button
                onClick={() => {
                  const newRoom: Room = {
                    id: `room-${Date.now()}`,
                    branchId: 'sector-104',
                    name: 'New Furnished Room with Food',
                    occupancy: 'double',
                    genderWing: 'unisex',
                    monthlyRent: 13000,
                    originalPrice: 15000,
                    depositMonths: 1,
                    image: '/src/assets/images/hero_pg_room_1793545902277.jpg',
                    roomSize: '260 sq.ft',
                    features: ['All 3 daily meals included', 'Split AC', 'Attached washroom', 'Wi-Fi'],
                    specs: {
                      ac: true,
                      attachedBath: true,
                      balcony: false,
                      smartTv: false,
                      studyDesk: true,
                      cupboard: 'Wardrobe with lock',
                      geyser: true,
                      refrigerator: 'Floor pantry access',
                    },
                    description: 'Newly added comfortable room.',
                    availableBeds: 2,
                  };
                  addRoom(newRoom);
                  setEditingRoomId(newRoom.id);
                  setRoomEditForm(newRoom);
                  triggerToast();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Room Tier</span>
              </button>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => {
                const isEditing = editingRoomId === room.id;
                const branchObj = branches.find((b) => b.id === room.branchId);

                if (isEditing) {
                  return (
                    <div
                      key={room.id}
                      className="bg-white p-5 rounded-xl border-2 border-neutral-900 shadow-md space-y-3"
                    >
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-xs font-bold text-neutral-900">Editing Room</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{room.id}</span>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Room Name</label>
                        <input
                          type="text"
                          value={roomEditForm.name || ''}
                          onChange={(e) => setRoomEditForm({ ...roomEditForm, name: e.target.value })}
                          className="w-full text-xs p-2 border rounded mt-0.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">Monthly Rent (₹)</label>
                          <input
                            type="number"
                            value={roomEditForm.monthlyRent || 0}
                            onChange={(e) =>
                              setRoomEditForm({ ...roomEditForm, monthlyRent: Number(e.target.value) })
                            }
                            className="w-full text-xs p-2 border rounded mt-0.5 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">Original Price (₹)</label>
                          <input
                            type="number"
                            value={roomEditForm.originalPrice || 0}
                            onChange={(e) =>
                              setRoomEditForm({ ...roomEditForm, originalPrice: Number(e.target.value) })
                            }
                            className="w-full text-xs p-2 border rounded mt-0.5 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">Branch</label>
                          <select
                            value={roomEditForm.branchId || 'sector-104'}
                            onChange={(e) => setRoomEditForm({ ...roomEditForm, branchId: e.target.value })}
                            className="w-full text-xs p-2 border rounded mt-0.5 bg-white"
                          >
                            {branches.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">Occupancy</label>
                          <select
                            value={roomEditForm.occupancy || 'single'}
                            onChange={(e) =>
                              setRoomEditForm({ ...roomEditForm, occupancy: e.target.value as any })
                            }
                            className="w-full text-xs p-2 border rounded mt-0.5 bg-white"
                          >
                            <option value="single">Single (Private)</option>
                            <option value="double">Double (2-Sharing)</option>
                            <option value="triple">Triple (3-Sharing)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">Gender Wing</label>
                          <select
                            value={roomEditForm.genderWing || 'unisex'}
                            onChange={(e) =>
                              setRoomEditForm({ ...roomEditForm, genderWing: e.target.value as any })
                            }
                            className="w-full text-xs p-2 border rounded mt-0.5 bg-white"
                          >
                            <option value="unisex">Unisex / All</option>
                            <option value="boys">Boys Wing</option>
                            <option value="girls">Girls Wing</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">Vacant Beds</label>
                          <input
                            type="number"
                            value={roomEditForm.availableBeds ?? 1}
                            onChange={(e) =>
                              setRoomEditForm({ ...roomEditForm, availableBeds: Number(e.target.value) })
                            }
                            className="w-full text-xs p-2 border rounded mt-0.5 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Room Size</label>
                        <input
                          type="text"
                          value={roomEditForm.roomSize || ''}
                          onChange={(e) => setRoomEditForm({ ...roomEditForm, roomSize: e.target.value })}
                          className="w-full text-xs p-2 border rounded mt-0.5"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            updateRoom(room.id, roomEditForm);
                            setEditingRoomId(null);
                            triggerToast();
                          }}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingRoomId(null)}
                          className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={room.id}
                    className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {branchObj?.name || room.branchId}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingRoomId(room.id);
                              setRoomEditForm(room);
                            }}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100"
                            title="Edit Room"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setConfirmDialog({
                                title: 'Delete Room Tier',
                                message: `Are you sure you want to delete "${room.name}"? This will immediately remove it from the live website.`,
                                confirmLabel: 'Yes, Delete Room',
                                onConfirm: () => {
                                  deleteRoom(room.id);
                                  setConfirmDialog(null);
                                  triggerToast('Room deleted successfully');
                                },
                              });
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50 transition-colors"
                            title="Delete Room"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-neutral-900 text-sm mb-1">{room.name}</h4>
                      <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{room.description}</p>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold font-mono text-neutral-900 tabular-nums">
                          ₹{room.monthlyRent.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-neutral-400 line-through tabular-nums font-mono">
                          ₹{room.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-neutral-500">/ mo</span>
                      </div>

                      <div className="text-[11px] text-neutral-600 space-y-1">
                        <div>
                          Occupancy: <strong className="capitalize">{room.occupancy}</strong> ({room.genderWing} wing)
                        </div>
                        <div>
                          Size: <strong>{room.roomSize}</strong> · Vacancy: <strong>{room.availableBeds} beds</strong>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-2.5 bg-neutral-50 border-t border-neutral-100 flex justify-between items-center text-[11px] text-neutral-500">
                      <span>Food: 3 Meals Included</span>
                      <button
                        onClick={() => {
                          setEditingRoomId(room.id);
                          setRoomEditForm(room);
                        }}
                        className="text-neutral-900 font-semibold hover:underline"
                      >
                        Edit Price/Specs
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: BRANCHES & ADDRESSES ===================== */}
        {activeTab === 'branches' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-neutral-200">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Branch Locations</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage addresses for Sector 104 (HA-90A) and Sector 53 (A-66), phone numbers, and maps.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((branch) => {
                const isEditing = editingBranchId === branch.id;

                if (isEditing) {
                  return (
                    <div
                      key={branch.id}
                      className="bg-white p-6 rounded-xl border-2 border-neutral-900 shadow-md space-y-4"
                    >
                      <h4 className="font-bold text-sm text-neutral-900 border-b pb-2">
                        Editing Branch: {branch.name}
                      </h4>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Branch Name</label>
                        <input
                          type="text"
                          value={branchEditForm.name || ''}
                          onChange={(e) => setBranchEditForm({ ...branchEditForm, name: e.target.value })}
                          className="w-full text-xs p-2 border rounded mt-0.5"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Exact Physical Address</label>
                        <textarea
                          rows={2}
                          value={branchEditForm.address || ''}
                          onChange={(e) => setBranchEditForm({ ...branchEditForm, address: e.target.value })}
                          className="w-full text-xs p-2 border rounded mt-0.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">Phone</label>
                          <input
                            type="text"
                            value={branchEditForm.phoneDisplay || ''}
                            onChange={(e) =>
                              setBranchEditForm({
                                ...branchEditForm,
                                phone: e.target.value,
                                phoneDisplay: e.target.value,
                              })
                            }
                            className="w-full text-xs p-2 border rounded mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700">WhatsApp Number</label>
                          <input
                            type="text"
                            value={branchEditForm.whatsapp || ''}
                            onChange={(e) =>
                              setBranchEditForm({ ...branchEditForm, whatsapp: e.target.value })
                            }
                            className="w-full text-xs p-2 border rounded mt-0.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Metro Station Proximity</label>
                        <input
                          type="text"
                          value={branchEditForm.metroConnectivity || ''}
                          onChange={(e) =>
                            setBranchEditForm({ ...branchEditForm, metroConnectivity: e.target.value })
                          }
                          className="w-full text-xs p-2 border rounded mt-0.5"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Google Maps URL</label>
                        <input
                          type="text"
                          value={branchEditForm.googleMapsUrl || ''}
                          onChange={(e) =>
                            setBranchEditForm({ ...branchEditForm, googleMapsUrl: e.target.value })
                          }
                          className="w-full text-xs p-2 border rounded mt-0.5 text-neutral-600"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            updateBranch(branch.id, branchEditForm);
                            setEditingBranchId(null);
                            triggerToast();
                          }}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                        >
                          Save Branch Details
                        </button>
                        <button
                          onClick={() => setEditingBranchId(null)}
                          className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={branch.id}
                    className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {branch.sector}
                        </span>
                        <h4 className="text-base font-bold text-neutral-900 mt-1">{branch.name}</h4>
                      </div>

                      <button
                        onClick={() => {
                          setEditingBranchId(branch.id);
                          setBranchEditForm(branch);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 text-xs font-semibold text-neutral-700 hover:text-neutral-900"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Branch</span>
                      </button>
                    </div>

                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 text-xs space-y-1.5">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-semibold text-neutral-900">{branch.address}</span>
                      </div>
                      <div className="text-neutral-500 pl-6 text-[11px]">{branch.landmark}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-neutral-50 rounded-lg">
                        <div className="text-neutral-500 text-[11px]">Contact Phone</div>
                        <div className="font-semibold text-neutral-900 mt-0.5">{branch.phoneDisplay}</div>
                      </div>
                      <div className="p-3 bg-neutral-50 rounded-lg">
                        <div className="text-neutral-500 text-[11px]">Metro Station</div>
                        <div className="font-semibold text-neutral-900 mt-0.5">{branch.metroConnectivity}</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                      <a
                        href={branch.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Test Google Maps Navigation</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: WEEKLY MESS MENU ===================== */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Weekly Mess Menu Editor</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update daily breakfast, office tiffin lunch, snacks, and dinner dishes.
                </p>
              </div>

              {/* Day Selector */}
              <div className="flex gap-1 overflow-x-auto p-1 bg-neutral-100 rounded-lg">
                {weeklyMenu.map((m, idx) => (
                  <button
                    key={m.day}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedDayIdx === idx
                        ? 'bg-white text-neutral-900 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {m.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Editor for Selected Day */}
            {(() => {
              const currentDay = weeklyMenu[selectedDayIdx];
              return (
                <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h4 className="text-base font-bold text-neutral-900">
                      Menu for {currentDay.day}
                    </h4>
                    <span className="text-xs text-neutral-500">
                      Separate lines by comma or press Enter
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                        Breakfast Items (comma separated)
                      </label>
                      <textarea
                        rows={3}
                        value={currentDay.breakfast.join(', ')}
                        onChange={(e) => {
                          const items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          updateDayMenu(selectedDayIdx, { breakfast: items });
                          triggerToast();
                        }}
                        className="w-full text-xs p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                        Lunch / Office Tiffin Items
                      </label>
                      <textarea
                        rows={3}
                        value={currentDay.lunch.join(', ')}
                        onChange={(e) => {
                          const items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          updateDayMenu(selectedDayIdx, { lunch: items });
                          triggerToast();
                        }}
                        className="w-full text-xs p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                        Evening Snacks & Tea
                      </label>
                      <textarea
                        rows={3}
                        value={currentDay.eveningSnacks.join(', ')}
                        onChange={(e) => {
                          const items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          updateDayMenu(selectedDayIdx, { eveningSnacks: items });
                          triggerToast();
                        }}
                        className="w-full text-xs p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                        Dinner Items
                      </label>
                      <textarea
                        rows={3}
                        value={currentDay.dinner.join(', ')}
                        onChange={(e) => {
                          const items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          updateDayMenu(selectedDayIdx, { dinner: items });
                          triggerToast();
                        }}
                        className="w-full text-xs p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                      Chef Special Item (Highlight)
                    </label>
                    <input
                      type="text"
                      value={currentDay.specialItem || ''}
                      placeholder="e.g. Fresh Gulab Jamun, Sunday Special Chicken Curry / Shahi Paneer"
                      onChange={(e) => {
                        updateDayMenu(selectedDayIdx, { specialItem: e.target.value });
                        triggerToast();
                      }}
                      className="w-full text-xs p-2.5 border rounded-lg"
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ===================== TAB 4: BOOKING ENQUIRIES & LEADS ===================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-neutral-200">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Prospective Resident Enquiries</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Leads generated from website visit bookings with one-click WhatsApp/Call actions.
                </p>
              </div>
            </div>

            {bookingLeads.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-neutral-200 text-neutral-400">
                No inquiries submitted yet. Bookings scheduled from the public site will appear here instantly.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Ref Code</th>
                        <th className="py-3 px-4 font-semibold">Visitor Name</th>
                        <th className="py-3 px-4 font-semibold">Phone / WhatsApp</th>
                        <th className="py-3 px-4 font-semibold">Branch & Room</th>
                        <th className="py-3 px-4 font-semibold">Visit Schedule</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {bookingLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-neutral-50/50">
                          <td className="py-3.5 px-4 font-mono font-bold text-neutral-900">
                            {lead.id}
                            <div className="text-[10px] text-neutral-400 font-normal">{lead.createdAt}</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-neutral-900">
                            {lead.fullName}
                            {lead.email && (
                              <div className="text-[11px] text-neutral-400 font-normal">{lead.email}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-neutral-800 font-medium">{lead.phone}</span>
                            <div className="flex gap-2 mt-1">
                              <a
                                href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                                  lead.fullName
                                )},%20we%20received%20your%20visit%20request%20for%20Relaxstay%20PG.`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-[10px] text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-1.5 py-0.5 rounded flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                <span>Call</span>
                              </a>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-neutral-900">{lead.branchName}</div>
                            <div className="text-[11px] text-neutral-500">{lead.roomPreference}</div>
                            {lead.notes && (
                              <div className="text-[10px] text-neutral-400 italic mt-0.5">
                                "{lead.notes}"
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-neutral-800">{lead.visitDate}</div>
                            <div className="text-[11px] text-neutral-500">{lead.visitSlot}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                updateBookingLeadStatus(lead.id, e.target.value as any);
                                triggerToast();
                              }}
                              className={`text-[11px] font-semibold px-2 py-1 rounded border ${
                                lead.status === 'New'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : lead.status === 'Contacted'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : lead.status === 'Visited'
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Visited">Visited</option>
                              <option value="Booked">Booked</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setConfirmDialog({
                                  title: 'Delete Inquiry',
                                  message: `Are you sure you want to delete inquiry #${lead.id} from ${lead.fullName}?`,
                                  confirmLabel: 'Yes, Delete',
                                  onConfirm: () => {
                                    deleteBookingLead(lead.id);
                                    setConfirmDialog(null);
                                    triggerToast('Inquiry deleted');
                                  },
                                });
                              }}
                              className="p-1.5 text-neutral-400 hover:text-red-600 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 5: FAQS & RULES ===================== */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-neutral-200">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">House Rules & FAQs</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update questions about deposit refunds, food policies, gate timings, and notice periods.
                </p>
              </div>

              <button
                onClick={() => setShowAddFaq(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            {showAddFaq && (
              <div className="bg-white p-5 rounded-xl border-2 border-neutral-900 shadow-md space-y-3">
                <h4 className="font-bold text-xs text-neutral-900">New FAQ Item</h4>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-700">Question</label>
                  <input
                    type="text"
                    placeholder="e.g. Can my parents stay overnight?"
                    value={newFaqForm.question}
                    onChange={(e) => setNewFaqForm({ ...newFaqForm, question: e.target.value })}
                    className="w-full text-xs p-2 border rounded mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-700">Answer</label>
                  <textarea
                    rows={2}
                    placeholder="Provide clear policy details..."
                    value={newFaqForm.answer}
                    onChange={(e) => setNewFaqForm({ ...newFaqForm, answer: e.target.value })}
                    className="w-full text-xs p-2 border rounded mt-0.5"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (newFaqForm.question && newFaqForm.answer) {
                        addFaq(newFaqForm);
                        setNewFaqForm({ question: '', answer: '' });
                        setShowAddFaq(false);
                        triggerToast();
                      }
                    }}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                  >
                    Add to Website
                  </button>
                  <button
                    onClick={() => setShowAddFaq(false)}
                    className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isEditing = editingFaqIdx === idx;

                if (isEditing) {
                  return (
                    <div key={idx} className="bg-white p-5 rounded-xl border-2 border-neutral-900 space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Question</label>
                        <input
                          type="text"
                          value={faqEditForm.question || ''}
                          onChange={(e) => setFaqEditForm({ ...faqEditForm, question: e.target.value })}
                          className="w-full text-xs p-2 border rounded mt-0.5"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-neutral-700">Answer</label>
                        <textarea
                          rows={3}
                          value={faqEditForm.answer || ''}
                          onChange={(e) => setFaqEditForm({ ...faqEditForm, answer: e.target.value })}
                          className="w-full text-xs p-2 border rounded mt-0.5"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            updateFaq(idx, faqEditForm);
                            setEditingFaqIdx(null);
                            triggerToast();
                          }}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingFaqIdx(null)}
                          className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-neutral-200 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="font-semibold text-xs sm:text-sm text-neutral-900">{faq.question}</div>
                      <div className="text-xs text-neutral-600 leading-relaxed">{faq.answer}</div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingFaqIdx(idx);
                          setFaqEditForm(faq);
                        }}
                        className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmDialog({
                            title: 'Delete Question',
                            message: `Are you sure you want to delete this FAQ: "${faq.question}"?`,
                            confirmLabel: 'Yes, Delete',
                            onConfirm: () => {
                              deleteFaq(idx);
                              setConfirmDialog(null);
                              triggerToast('Question deleted');
                            },
                          });
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* In-App Custom Confirmation Modal (No window.confirm or window.alert) */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">{confirmDialog.title}</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{confirmDialog.message}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-3.5 py-2 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDialog.onConfirm()}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                {confirmDialog.confirmLabel || 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
