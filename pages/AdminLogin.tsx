
import React, { useState } from 'react';
import { Lock, User, Key, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credentials provided by the user
    if (username === 'Ditto.Dom.org' && password === 'Heterozygote') {
      onLoginSuccess();
    } else {
      setError('Identifiants invalides. Accès refusé.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl mb-4 border border-amber-500/20">
            <Lock className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-anton tracking-wide text-white uppercase">Accès Réservé</h1>
          <p className="text-zinc-500 text-sm mt-2">Connectez-vous pour accéder au scanner THE LIZARD KING.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" /> Identifiant
            </label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="votre.nom@domaine.org"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Key className="w-3 h-3" /> Mot de passe
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs font-bold flex items-center gap-2 animate-pulse">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 uppercase tracking-widest"
          >
            Se Connecter
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            Accès sécurisé réservé à l'administration THE LIZARD KING
          </p>
        </div>
      </div>
    </div>
  );
};
