import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Reservation, BookingStatus } from '../types';
import { Search, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

export const AdminScanner: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });

  useEffect(() => {
    setReservations(db.getReservations());
  }, []);

  const handleCheckIn = (id: string) => {
    const res = db.getReservationById(id);
    if (!res) {
      setMessage({ text: "Erreur : Réservation introuvable.", type: 'error' });
      return;
    }
    if (res.status === BookingStatus.USED) {
      setMessage({ text: `Alerte : Réservation n°${id} déjà utilisée ! Accès refusé.`, type: 'error' });
      return;
    }
    db.updateStatus(id, BookingStatus.USED);
    setReservations(db.getReservations());
    setMessage({ text: `Réservation n°${id} confirmée – Accès autorisé.`, type: 'success' });
    setTimeout(() => setMessage({ text: '', type: null }), 5000);
  };

  const filtered = reservations.filter(r => 
    r.id.toLowerCase().includes(search.toLowerCase()) || 
    r.fullName.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-anton text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">Scanner d'entrée</h1>
          <p className="text-zinc-400 dark:text-zinc-500">Validation sécurisée des tickets.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Scannez ou saisissez l'ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition-all text-zinc-900 dark:text-zinc-100 font-mono"
          />
        </div>
      </div>

      {message.type && (
        <div className={`mb-8 p-6 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-xl ${
          message.type === 'success' ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-600' : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-8 h-8 shrink-0" /> : <AlertCircle className="w-8 h-8 shrink-0" />}
          <p className="text-lg font-bold">{message.text}</p>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">ID / Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Groupe</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 italic">Aucune réservation à afficher.</td>
                </tr>
              ) : (
                filtered.map(res => (
                  <tr key={res.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-red-600 font-bold">{res.id}</div>
                      <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-bold">{res.date} @ {res.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100 uppercase">{res.fullName}</div>
                      <div className="text-xs text-zinc-400 dark:text-zinc-500">{res.phone}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-zinc-600 dark:text-zinc-400">
                      {res.guests} pers.
                    </td>
                    <td className="px-6 py-4">
                      {res.status === BookingStatus.USED ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 text-[10px] font-black rounded-full uppercase">
                          <XCircle className="w-3 h-3" /> Utilisé
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/30 text-green-600 text-[10px] font-black rounded-full uppercase">
                          <Clock className="w-3 h-3" /> Valide
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleCheckIn(res.id)}
                        disabled={res.status === BookingStatus.USED}
                        className={`px-4 py-2 rounded-lg font-bold text-xs transition-all uppercase tracking-tighter ${
                          res.status === BookingStatus.USED 
                            ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                        }`}
                      >
                        Valider l'entrée
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};