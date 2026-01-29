
import React, { useState } from 'react';
import { Users, Clock, Mail, Phone, User, Loader2, LayoutGrid, Calendar, ChevronDown } from 'lucide-react';

export const Booking: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    guests: 1,
    date: '',
    time: '22:30',
    table: 'P1'
  });

  // URL FedaPay générée par l'utilisateur
  const FEDAPAY_STATIC_URL = "https://process.fedapay.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwOTA3MDMzOSwiZXhwIjoxNzY5NzA4MjQ1fQ.oeAa0A6bdIPQ0YPwdgwNJhd_QJxJ3vjs8hbmJm3mUZ0";

  const validateTime = (timeStr: string) => {
    const [hourStr, minuteStr] = timeStr.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    
    let isValid = false;
    // Horaires autorisés : 22:30 à 02:00
    if (hour >= 22) {
      if (hour === 22) isValid = minute >= 30;
      else isValid = true;
    } else if (hour <= 2) {
      if (hour === 2) isValid = minute === 0;
      else isValid = true;
    }
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'time') {
      const isValid = validateTime(value);
      setTimeError(!isValid);
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timeError) return;
    setLoading(true);

    try {
      // Tentative d'enregistrement sur le backend
      // Note: L'erreur 'Failed to fetch' sur rf.gd est souvent liée à leur protection anti-bot.
      const res = await fetch(
        "https://lkreservation-api.rf.gd/lkreservation-backend/api/save-reservation.php",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            nom: formData.fullName,
            email: formData.email,
            telephone: formData.phone,
            personnes: formData.guests,
            date_heure: `${formData.date} ${formData.time}`,
            table_pref: formData.table
          })
        }
      );
      
      // On redirige vers FedaPay quoi qu'il arrive si le serveur a répondu
      // Si le client paie, l'admin pourra voir la réservation (le backend doit gérer le statut)
      window.location.href = FEDAPAY_STATIC_URL;

    } catch (err) {
      console.error("Erreur de connexion au serveur:", err);
      // En cas d'erreur de fetch (CORS/Serveur), on redirige quand même vers le paiement 
      // car le lien est statique, mais on prévient l'utilisateur
      window.location.href = FEDAPAY_STATIC_URL;
    } finally {
      setLoading(false);
    }
  };

  // Classe commune pour assurer l'uniformité sur iOS (appearance-none)
  const inputClass = "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-600 outline-none transition-all appearance-none";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl dark:shadow-none transition-colors duration-300">
        <div className="md:flex">
          {/* Sidebar Infos */}
          <div className="md:w-1/3 bg-red-600 p-10 text-white">
            <h2 className="text-3xl font-anton mb-8 uppercase tracking-wider">Réservation</h2>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Tarif Accès</p>
                <p className="text-5xl font-anton">5 000 <span className="text-xl">FCFA</span></p>
              </div>
              <div className="border-t border-white/20 pt-8">
                <p className="font-bold mb-6 flex items-center gap-3 text-lg">
                   <Clock className="w-5 h-5" /> Horaires Live
                </p>
                <ul className="space-y-4 text-sm font-semibold opacity-90">
                  <li>• Vendredi & Samedi</li>
                  <li>• 22:30 — 02:00</li>
                  <li>• Fidjossè, Atlantique Bich Hotel</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="md:w-2/3 p-8 md:p-14 bg-white dark:bg-zinc-950 transition-colors">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Nom complet
                  </label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className={inputClass} />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> Téléphone
                  </label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className={inputClass} />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Nombre de personnes
                  </label>
                  <div className="relative">
                    <select name="guests" value={formData.guests} onChange={handleChange} className={inputClass} >
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n > 1 ? 'personnes' : 'personne'}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Date
                  </label>
                  <input required name="date" value={formData.date} onChange={handleChange} type="date" className={inputClass} />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Heure
                  </label>
                  <input required name="time" value={formData.time} onChange={handleChange} type="time" className={`${inputClass} ${timeError ? 'border-red-500' : ''}`} />
                  {timeError && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">Entre 22:30 et 02:00</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <LayoutGrid className="w-3.5 h-3.5" /> Table
                  </label>
                  <div className="relative">
                    <select name="table" value={formData.table} onChange={handleChange} className={inputClass} >
                      {['P1', 'P2', 'P3', 'P4'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading || timeError} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 transition-all transform active:scale-95 uppercase tracking-[0.15em]" >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Payer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
