import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, MapPin, Linkedin, Send, FileDown, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section id="contact" className="w-full py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-glow blur-[160px] pointer-events-none rounded-full opacity-30" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full text-[10px] font-black tracking-[0.3em] text-accent-primary uppercase font-mono border border-accent-primary/20 shadow-2xl"
        >
          <Mail size={12} className="animate-pulse" /> {t('contact.title')}
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-text-primary uppercase"
        >
          {t('contact.badge')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[13.5px] text-text-muted leading-relaxed font-medium"
        >
          {t('contact.desc')}
        </motion.p>
      </div>

      {/* 1. Direct Contact Channels - Centered Horizontal Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 select-text"
      >
        {/* Location Card */}
        <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }} className="creative-card p-10 flex flex-col items-center text-center shadow-2xl group">
          <div className="w-16 h-16 rounded-[20px] bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 flex-shrink-0 group-hover:scale-110 transition-transform border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="font-black text-text-primary uppercase tracking-[0.2em] text-[11px] font-mono">Location</h4>
            <p className="text-text-muted mt-2 text-[13px] font-medium group-hover:text-text-primary transition-colors">{t('contact.card.location')}</p>
          </div>
        </motion.div>

        {/* Email Card */}
        <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }} className="creative-card p-10 flex flex-col items-center text-center shadow-2xl group">
          <div className="w-16 h-16 rounded-[20px] bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 flex-shrink-0 group-hover:scale-110 transition-transform border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="font-black text-text-primary uppercase tracking-[0.2em] text-[11px] font-mono">{t('contact.card.email')}</h4>
            <a href={`mailto:${personalInfo.email}`} className="text-text-muted hover:text-accent-primary transition-colors mt-2 block text-[13px] font-medium">
              {personalInfo.email}
            </a>
          </div>
        </motion.div>

        {/* LinkedIn Card */}
        <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }} className="creative-card p-10 flex flex-col items-center text-center shadow-2xl group">
          <div className="w-16 h-16 rounded-[20px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 flex-shrink-0 group-hover:scale-110 transition-transform border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Linkedin size={24} />
          </div>
          <div>
            <h4 className="font-black text-text-primary uppercase tracking-[0.2em] text-[11px] font-mono">{t('contact.card.linkedin')}</h4>
            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors mt-2 block text-[13px] font-medium">
              {personalInfo.linkedin}
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Symmetrical Actions Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="no-print flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto mb-20 select-none"
      >
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex-1 px-8 py-4 bg-accent-primary text-white hover:bg-accent-primary/90 rounded-[20px] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent-primary/30"
        >
          <Calendar size={16} /> {t('hero.cta.book')}
        </button>

        <button
          onClick={() => window.print()}
          className="flex-1 px-8 py-4 bg-bg-secondary/80 backdrop-blur-xl hover:bg-border-custom border border-border-custom text-text-primary rounded-[20px] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xl hover:border-accent-primary/50"
        >
          <FileDown size={16} /> {t('hero.cta.cv')}
        </button>
      </motion.div>

      {/* 3. Centered Secure Form Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="max-w-3xl mx-auto creative-card p-8 sm:p-12 relative select-text shadow-2xl"
      >
        <h3 className="text-xl sm:text-2xl font-black text-text-primary uppercase tracking-tight text-center mb-10">
          {t('contact.badge')}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">{t('contact.form.name')}</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                className="w-full bg-bg-primary/50 border border-border-custom focus:border-accent-primary outline-none rounded-xl px-4 py-3.5 text-[13px] text-text-primary focus:ring-1 focus:ring-accent-primary transition-all font-medium placeholder:opacity-40"
                placeholder="e.g. Alexis Carter"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">{t('contact.form.email')}</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                className="w-full bg-bg-primary/50 border border-border-custom focus:border-accent-primary outline-none rounded-xl px-4 py-3.5 text-[13px] text-text-primary focus:ring-1 focus:ring-accent-primary transition-all font-medium placeholder:opacity-40"
                placeholder="e.g. alexis@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">{t('contact.form.message')}</label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full bg-bg-primary/50 border border-border-custom focus:border-accent-primary outline-none rounded-xl px-4 py-3.5 text-[13px] text-text-primary focus:ring-1 focus:ring-accent-primary resize-none transition-all font-medium placeholder:opacity-40"
              placeholder="Tell me about your project scope, developer hiring plans, or custom architecture needs..."
            />
          </div>

          {/* Send Status Indicator Notifications */}
          {isSent && (
            <div className="p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl text-emerald-400 text-[13px] font-bold flex items-center gap-3 animate-in fade-in duration-300">
              <CheckCircle size={16} /> {t('contact.form.success')}
            </div>
          )}

          {/* Submit button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={isSending || !formState.name || !formState.email || !formState.message}
              className="no-print px-10 py-4 rounded-[20px] bg-accent-primary hover:bg-accent-primary/95 text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 cursor-pointer shadow-xl disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all select-none border border-white/10 w-full sm:w-auto min-w-[200px]"
            >
              {isSending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Transmitting...
                </>
              ) : (
                <>
                  <Send size={14} /> {t('contact.form.send')}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none no-print"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[460px] creative-card flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-bg-secondary/80 backdrop-blur-xl border-b border-border-custom px-6 py-5 flex justify-between items-center rounded-t-[var(--card-radius)]">
                <div className="flex items-center gap-3">
                  <Calendar className="text-accent-primary animate-pulse" size={18} />
                  <h3 className="text-[13px] font-black text-text-primary tracking-[0.1em] uppercase">{t('contact.booking.title')}</h3>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-text-muted hover:text-text-primary text-[10px] uppercase font-black tracking-widest cursor-pointer transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  close
                </button>
              </div>

              {/* Modal Body form */}
              <form onSubmit={handleBookSlot} className="p-6 md:p-8 space-y-8 bg-bg-primary/90 rounded-b-[var(--card-radius)]">
                {/* Step 1: Select date */}
                <div className="space-y-4">
                  <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                    <CheckCircle size={12} className="text-accent-primary" /> Step 1: Select Date Slot
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {dates.map((date) => (
                      <button
                        key={date.val}
                        type="button"
                        onClick={() => setSelectedDate(date.val)}
                        className={`px-4 py-3 border rounded-xl text-center text-[11px] font-bold cursor-pointer transition-all ${
                          selectedDate === date.val
                            ? 'bg-accent-primary border-transparent text-white shadow-lg shadow-accent-primary/30'
                            : 'bg-bg-secondary border-border-custom text-text-muted hover:text-text-primary hover:bg-bg-primary/45 hover:border-accent-primary/50'
                        }`}
                      >
                        {date.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Time */}
                <div className="space-y-4">
                  <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                    <Clock size={12} className="text-accent-primary animate-pulse" /> Step 2: {t('contact.booking.time')} (IST)
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 border rounded-xl text-center text-[11px] font-bold cursor-pointer transition-all ${
                          selectedTime === time
                            ? 'bg-accent-secondary border-transparent text-white shadow-lg shadow-accent-secondary/30'
                            : 'bg-bg-secondary border-border-custom text-text-muted hover:text-text-primary hover:border-accent-secondary/50'
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
                  className="w-full py-4 mt-4 bg-text-primary text-bg-primary hover:scale-102 active:scale-98 font-black uppercase tracking-[0.2em] text-[11px] rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {bookingConfirmed ? (
                    <>
                      <span className="w-4 h-4 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin"></span>
                      Scheduling...
                    </>
                  ) : (
                    'Confirm Slot Invite'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
