
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { notificationService } from '../services/notificationService';
import { Reservation, BookingStatus } from '../types';
import { Calendar, Users, Clock, Mail, Phone, User, Loader2, AlertTriangle } from 'lucide-react';

declare var FedaPay: any;

export const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notifying, setNotifying] = useState(false);
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
      if (hour === 22) {
        isValid = minute >= 30;
      } else {
        isValid = true;
      }
    } else if (hour <= 2) {
      if (hour === 2) {
        isValid = minute === 0;
      } else {
        isValid = true;
      }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeError) {
      alert("Les sessions live ont lieu de 22h30 à 02h00 du matin. Veuillez ajuster votre horaire.");
      return;
    }
    
    setLoading(true);

    const reservationId = 'RES-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const amount = 5000;

    // Robust check for FedaPay library and its required method
    if (typeof FedaPay === 'undefined' || typeof FedaPay.checkout !== 'function') {
      alert("Le service de paiement FedaPay n'est pas encore prêt. Veuillez patienter quelques secondes et réessayer.");
      setLoading(false);
      return;
    }

    try {
      // For FedaPay Checkout JS, it's recommended to pass the public_key directly in the checkout options
      // to avoid initialization state issues in single-page applications.
      FedaPay.checkout({
        public_key: 'sk_sandbox_AKhSNDaBT1w2EnHjm1hY01PA',
        environment: 'sandbox',
        transaction: {
          amount: amount,
          description: `Réservation THE LIZARD KING - ${formData.fullName}`,
          custom_metadata: {
            reservation_id: reservationId,
            guests: formData.guests
          }
        },
        customer: {
          firstname: formData.fullName.split(' ')[0] || formData.fullName,
          lastname: formData.fullName.split(' ').slice(1).join(' ') || 'Client',
          email: formData.email,
          phone_number: {
            number: formData.phone.replace(/\s/g, ''),
            country: 'bj'
          }
        },
        onComplete: async (response: any) => {
          setLoading(false);
          setNotifying(true);

          const newRes: Reservation = {
            ...formData,
            id: reservationId,
            amount,
            currency: 'FCFA',
            status: BookingStatus.PAID,
            createdAt: Date.now(),
            paystackRef: response?.transaction?.reference || 'FEDAPAY-' + reservationId
          };

          db.saveReservation(newRes);

          try {
            await notificationService.sendBookingNotifications(newRes);
          } catch (error) {
            console.error("Erreur notifications:", error);
          }

          setNotifying(false);
          navigate(`/confirmation/${reservationId}`);
        },
        onClose: () => {
          setLoading(false);
        }
      });
    } catch (err) {
      console.error("FedaPay Checkout Error:", err);
      alert("Une erreur est survenue lors du lancement du paiement. Veuillez rafraîchir la page.");
      setLoading(false);
    }
  };

  if (notifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        </div>
        <h2 className="text-3xl font-anton mb-2 tracking-wide text-white">PAIEMENT VALIDÉ !</h2>
        <p className="text-zinc-400 max-w-sm">
          Génération de votre ticket sécurisé THE LIZARD KING...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="md:flex">
          <div className="md:w-1/3 bg-amber-600 p-8 text-black">
            <h2 className="text-3xl font-anton mb-6 uppercase">Réservation</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider opacity-70">Tarif Accès</p>
                <p className="text-4xl font-anton">5 000 FCFA</p>
                <p className="text-xs mt-1">Valable pour une soirée Blues & Rock</p>
              </div>
              <div className="border-t border-black/20 pt-6 text-sm">
                <p className="font-bold mb-4 flex items-center gap-2 italic">
                   <Clock className="w-4 h-4" /> Vendredi & Samedi
                </p>
                <ul className="space-y-3 font-medium opacity-90">
                  <li>• Live Band Performance</li>
                  <li>• Fidjossè, Atlantique Bich Hotel</li>
                  <li>• Paiement sécurisé par FedaPay</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> Nom & Prénom
                  </label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Jean Dupont" className="w-full bg-zinc-800 border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="votre@email.com" className="w-full bg-zinc-800 border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Téléphone
                  </label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+229 01 53 90 89 08" className="w-full bg-zinc-800 border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Groupe
                  </label>
                  <select name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-zinc-800 border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none" >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n > 1 ? 'personnes' : 'personne'}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date du Live
                  </label>
                  <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full bg-zinc-800 border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Heure d'arrivée
                  </label>
                  <input 
                    required 
                    name="time" 
                    value={formData.time} 
                    onChange={handleChange} 
                    type="time" 
                    className={`w-full bg-zinc-800 border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 outline-none transition-all ${timeError ? 'ring-2 ring-red-500 border-red-500' : 'focus:ring-amber-500'}`} 
                  />
                  {timeError && (
                    <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1 font-bold animate-pulse">
                      <AlertTriangle className="w-3 h-3" /> Horaires live : 22h30 à 02h00
                    </p>
                  )}
                </div>
              </div>

              <button type="submit" disabled={loading || timeError} className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 uppercase tracking-wider" >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Payer via FedaPay (5 000 FCFA)"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
