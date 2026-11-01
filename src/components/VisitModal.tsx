import { useState } from 'react';
import { X, Calendar, Clock, Phone, User, Mail, CheckCircle2, MessageSquare, ShieldCheck, Building } from 'lucide-react';
import { usePGData } from '../context/PGDataContext';

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillRoomName?: string;
}

export default function VisitModal({ isOpen, onClose, prefillRoomName }: VisitModalProps) {
  const { branches, rooms, addBookingLead } = usePGData();

  const [formData, setFormData] = useState({
    branchId: branches[0]?.id || 'sector-104',
    fullName: '',
    phone: '',
    email: '',
    gender: 'male',
    roomPreference: prefillRoomName || 'Premium 2-Sharing Room with Food (₹13,000)',
    visitDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    visitSlot: '11:00 AM - 1:00 PM',
    moveInDate: '',
    notes: '',
  });

  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentBranch = branches.find((b) => b.id === formData.branchId) || branches[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setPhoneError(null);

    // Save lead into persistent PGDataContext!
    const generatedCode = addBookingLead({
      branchId: currentBranch.id,
      branchName: currentBranch.name,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      roomPreference: formData.roomPreference,
      visitDate: formData.visitDate,
      visitSlot: formData.visitSlot,
      moveInDate: formData.moveInDate,
      notes: formData.notes,
    });

    setSubmittedCode(generatedCode);
  };

  const getWhatsAppBookingUrl = () => {
    const text = encodeURIComponent(
      `Hello Relaxstay Management, I have booked a visit.\n` +
      `Reference Code: ${submittedCode}\n` +
      `Branch: ${currentBranch.name} (${currentBranch.address})\n` +
      `Name: ${formData.fullName}\n` +
      `Room Type: ${formData.roomPreference}\n` +
      `Visit Date: ${formData.visitDate} (${formData.visitSlot})\n` +
      `Phone: ${formData.phone}`
    );
    return `https://wa.me/${currentBranch.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Free In-Person Tour · No Advance Fees
            </span>
            <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
              {submittedCode ? 'Visit Scheduled Successfully' : 'Schedule a Free Property Visit'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Close visit modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedCode ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1">
                Your Confirmation Token
              </div>
              <div className="text-3xl font-extrabold font-mono text-neutral-900 tracking-wider">
                {submittedCode}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-xs text-neutral-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Visitor Name:</span>
                <span className="font-semibold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Selected Branch:</span>
                <span className="font-semibold text-neutral-900">{currentBranch.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Address:</span>
                <span className="font-semibold">{currentBranch.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Visit Date:</span>
                <span className="font-semibold">{formData.visitDate} ({formData.visitSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Room Requested:</span>
                <span className="font-semibold">{formData.roomPreference}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Our branch caretaker will welcome you with complimentary tea and show you the available rooms, mess area, and amenities.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Visit on WhatsApp</span>
              </a>

              <a
                href={`tel:${currentBranch.phone}`}
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Caretaker Now ({currentBranch.phoneDisplay})</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800"
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Branch Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Select Noida Branch *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, branchId: b.id })}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                      formData.branchId === b.id
                        ? 'border-neutral-900 bg-neutral-50 font-semibold text-neutral-900 ring-1 ring-neutral-900'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-bold">{b.sector}</div>
                    <div className="text-[10px] text-neutral-500 truncate">{b.address.split(',')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (phoneError) setPhoneError(null);
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                {phoneError && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">{phoneError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="e.g. name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Room Configuration Preference
              </label>
              <select
                value={formData.roomPreference}
                onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white"
              >
                <option value="2-Sharing Room with Food (₹13,000/mo)">
                  2-Sharing Room with Food — ₹13,000/mo
                </option>
                <option value="Separate Private Room with Food (₹20,000/mo)">
                  Separate Private Room with Food — ₹20,000/mo
                </option>
                <option value="Triple Sharing with Food (₹9,500/mo)">
                  Triple Sharing with Food — ₹9,500/mo
                </option>
                {rooms.map((r) => (
                  <option key={r.id} value={`${r.name} (₹${r.monthlyRent.toLocaleString('en-IN')}/mo)`}>
                    {r.name} — ₹{r.monthlyRent.toLocaleString('en-IN')}/mo
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Preferred Visit Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <select
                    value={formData.visitSlot}
                    onChange={(e) => setFormData({ ...formData, visitSlot: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white"
                  >
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="12:00 PM - 3:00 PM">Afternoon (12:00 PM - 3:00 PM)</option>
                    <option value="3:00 PM - 6:00 PM">Late Afternoon (3:00 PM - 6:00 PM)</option>
                    <option value="6:00 PM - 8:30 PM">Evening (6:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Special Requests / Expected Move-In Date
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Planning to move in next week; need bike parking; veg food only"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors"
              >
                Confirm Free Visit Slot
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Zero brokerage · Save inquiry to Admin system directly</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
