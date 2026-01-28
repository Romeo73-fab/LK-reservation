import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, payReservation } from '../services/db';
import { Users, Clock, Mail, Phone, User, Loader2 } from 'lucide-react';

export const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    guests: 1,
    date: '',
    time: '22:30'
  });

  const validateTime = (timeStr: string) => {
    const [hourStr, minuteStr] = timeStr.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    
    let isValid = false;
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
      const res = await fetch(
        "https://lkreservation-api.rf.gd/lkreservation-backend/api/save-reservation.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: formData.fullName,
            email: formData.email,
            telephone: formData.phone,
            personnes: formData.guests,
            date_heure: `${formData.date} ${formData.time}`
          })
        }
      );
      const result = await res.json();
      if (!result.reference) throw new Error("Erreur réservation");

      const payment = await payReservation(result.reference, formData.email);
      if (payment.payment_url) {
        window.location.href = payment.payment_url;
      } else {
        alert("Erreur paiement");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl dark:shadow-none transition-colors duration-300">
        <div className="md:flex">
          <div className="md:w-1/3 bg-red-600 p-10 text-white">
            <h2 className="text-3xl font-anton mb-8 uppercase tracking-wider">Réservation</h2>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Tarif Accès</p>
                <p className="text-5xl font-anton">5 000 <span className="text-xl">FCFA</span></p>
              </div>
              <div className="border-t border-white/20 pt-8">
                <p className="font-bold mb-6 flex items-center gap-3 text-lg">
                   <Clock className="w-5 h-5" /> Vendredi & Samedi
                </p>
                <ul className="space-y-4 text-sm font-semibold opacity-90">
                  <li>• Live Band Performance</li>
                  <li>• Fidjossè, Atlantique Bich Hotel</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-8 md:p-14 bg-white dark:bg-zinc-950 transition-colors">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Nom complet
                  </label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-600 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-600 outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> Téléphone
                  </label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-600 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Groupe
                  </label>
                  <select name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-600 outline-none transition-all" >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n > 1 ? 'personnes' : 'personne'}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading || timeError} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 transition-all transform active:scale-95 uppercase tracking-[0.15em]" >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Payer via FedaPay (5 000 FCFA)"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};