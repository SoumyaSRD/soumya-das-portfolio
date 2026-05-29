import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, MapPin, Linkedin, Send, FileDown, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

export const Contact: React.FC = () => {
  const { t } = useI18n();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  // Recruiter Calendar Booking States
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const availableSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];
  const dates = [
    { label: 'Mon, June 1', val: '2026-06-01' },
    { label: 'Tue, June 2', val: '2026-06-02' },
    { label: 'Wed, June 3', val: '2026-06-03' },
    { label: 'Thu, June 4', val: '2026-06-04' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);

    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });

      // Reset sent flag after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setShowBookingModal(false);
      const date = selectedDate;
      const time = selectedTime;
      setSelectedDate('');
      setSelectedTime('');
      alert(`${t('contact.booking.confirm')} ${date} @ ${time}`);
    }, 1500);
  };

  return (
    <section id="contact" className="w-full py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-glow blur-[150px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-primary/10 rounded-full text-[10px] font-bold tracking-widest text-accent-primary uppercase font-mono">
          <Mail size={11} className="animate-pulse" /> {t('contact.title')}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-text-primary uppercase">
          {t('contact.badge')}
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          {t('contact.desc')}
        </p>
      </div>

      {/* 1. Direct Contact Channels - Centered Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 select-text">
        {/* Location Card */}
        <div className="flex flex-col items-center text-center p-6 border border-border-custom bg-bg-secondary/40 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3.5 flex-shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <h4 className="font-bold text-text-primary uppercase tracking-wider text-[10px] font-mono">Location</h4>
            <p className="text-text-muted mt-1 text-xs">{t('contact.card.location')}</p>
          </div>
        </div>

        {/* Email Card */}
        <div className="flex flex-col items-center text-center p-6 border border-border-custom bg-bg-secondary/40 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-3.5 flex-shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <h4 className="font-bold text-text-primary uppercase tracking-wider text-[10px] font-mono">{t('contact.card.email')}</h4>
            <a href={`mailto:${personalInfo.email}`} className="text-text-muted hover:text-accent-primary transition-colors mt-1 block text-xs">
              {personalInfo.email}
            </a>
          </div>
        </div>

        {/* LinkedIn Card */}
        <div className="flex flex-col items-center text-center p-6 border border-border-custom bg-bg-secondary/40 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3.5 flex-shrink-0">
            <Linkedin size={18} />
          </div>
          <div>
            <h4 className="font-bold text-text-primary uppercase tracking-wider text-[10px] font-mono">{t('contact.card.linkedin')}</h4>
            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors mt-1 block text-xs">
              {personalInfo.linkedin}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Symmetrical Actions Row */}
      <div className="no-print flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-16 select-none">
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex-1 px-5 py-3.5 border border-accent-primary hover:bg-accent-primary hover:text-white text-accent-primary rounded-xl font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-103 active:scale-97 shadow-sm"
          style={{ boxShadow: 'var(--theme-glow-style)' }}
        >
          <Calendar size={13} /> {t('hero.cta.book')}
        </button>

        <button
          onClick={() => window.print()}
          className="flex-1 px-5 py-3.5 bg-bg-secondary hover:bg-border-custom border border-border-custom text-text-primary rounded-xl font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-103 active:scale-97 shadow-sm"
        >
          <FileDown size={13} /> {t('hero.cta.cv')}
        </button>
      </div>

      {/* 3. Centered Secure Form Wrapper */}
      <div
        className="max-w-2xl mx-auto glass-panel p-5 sm:p-6 md:p-8 border border-border-custom relative select-text"
        style={{
          boxShadow: 'var(--theme-glow-style)',
          borderRadius: 'var(--card-radius)',
        }}
      >
        <h3 className="text-base sm:text-lg font-bold text-text-primary uppercase tracking-wide text-center mb-6">
          {t('contact.badge')}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{t('contact.form.name')}</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                className="w-full bg-bg-primary/50 border border-border-custom focus:border-accent-primary outline-none rounded-lg px-3.5 py-2.5 text-xs text-text-primary focus:ring-1 focus:ring-accent-primary animate-transition"
                placeholder="e.g. Alexis Carter"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{t('contact.form.email')}</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                className="w-full bg-bg-primary/50 border border-border-custom focus:border-accent-primary outline-none rounded-lg px-3.5 py-2.5 text-xs text-text-primary focus:ring-1 focus:ring-accent-primary animate-transition"
                placeholder="e.g. alexis@company.com"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{t('contact.form.message')}</label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full bg-bg-primary/50 border border-border-custom focus:border-accent-primary outline-none rounded-lg px-3.5 py-2.5 text-xs text-text-primary focus:ring-1 focus:ring-accent-primary resize-none animate-transition"
              placeholder="Tell me about your project scope, developer hiring plans, or custom architecture needs..."
            />
          </div>

          {/* Send Status Indicator Notifications */}
          {isSent && (
            <div className="p-3 border border-emerald-500/30 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle size={14} /> {t('contact.form.success')}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSending || !formState.name || !formState.email || !formState.message}
            className="no-print px-5 py-3 rounded-xl bg-accent-primary hover:bg-accent-primary/95 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all select-none border border-white/10 mx-auto w-full sm:w-auto"
            style={{ boxShadow: 'var(--theme-glow-style)' }}
          >
            {isSending ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Transmitting...
              </>
            ) : (
              <>
                <Send size={12} /> {t('contact.form.send')}
              </>
            )}
          </button>
        </form>
      </div>

      {/* ----------------------------------------------------
         CALENDAR BOOKING INTERVIEW MODAL (Recruiter widget)
         ---------------------------------------------------- */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 select-none animate-in fade-in duration-200 no-print">
          <div
            className="w-full max-w-[420px] glass-panel border border-border-custom overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
            style={{
              boxShadow: 'var(--theme-glow-style)',
              borderRadius: 'var(--card-radius)',
            }}
          >
            {/* Modal Header */}
            <div className="bg-bg-secondary border-b border-border-custom px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="text-accent-primary animate-pulse" size={16} />
                <h3 className="text-xs font-bold text-text-primary tracking-wider uppercase">{t('contact.booking.title')}</h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-text-muted hover:text-text-primary text-xs uppercase font-extrabold cursor-pointer"
              >
                close
              </button>
            </div>

            {/* Modal Body form */}
            <form onSubmit={handleBookSlot} className="p-5 space-y-6">
              {/* Step 1: Select date */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle size={10} className="text-accent-primary" /> Step 1: Select Date Slot
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {dates.map((date) => (
                    <button
                      key={date.val}
                      type="button"
                      onClick={() => setSelectedDate(date.val)}
                      className={`px-3 py-2 border rounded-xl text-center text-xs font-semibold cursor-pointer transition-all ${
                        selectedDate === date.val
                          ? 'bg-accent-primary border-transparent text-white'
                          : 'bg-bg-secondary border-border-custom text-text-muted hover:text-text-primary hover:bg-bg-primary/45'
                      }`}
                    >
                      {date.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Time */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={10} className="text-accent-primary animate-pulse" /> Step 2: {t('contact.booking.time')} (IST)
                </span>
                <div className="flex flex-wrap gap-2">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-2.5 py-1.5 border rounded-lg text-center text-xs font-semibold cursor-pointer transition-all ${
                        selectedTime === time
                          ? 'bg-accent-secondary border-transparent text-white'
                          : 'bg-bg-secondary border-border-custom text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Action Scheduling */}
              <button
                type="submit"
                disabled={!selectedDate || !selectedTime || bookingConfirmed}
                className="w-full py-3 bg-accent-primary hover:bg-accent-primary/95 text-white font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-102 active:scale-98 transition-all border border-white/10"
                style={{ boxShadow: 'var(--theme-glow-style)' }}
              >
                {bookingConfirmed ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Scheduling Calendar slot...
                  </>
                ) : (
                  'Schedule slot invite'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
