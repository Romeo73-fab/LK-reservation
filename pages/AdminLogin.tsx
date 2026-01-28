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
    const secureUsername = process.env.ADMIN_USERNAME || 'Ditto.Dom.org';
    const securePassword = process.env.ADMIN_PASSWORD || 'Heterozygote';

    if (username === secureUsername && password === securePassword) {
      onLoginSuccess();
    } else {
      setError('Identifiants invalides. Accès refusé.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-10 shadow-2xl dark:shadow-none">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-2xl mb-6">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-anton tracking-wide text-zinc-900 dark:text-zinc-100 uppercase">Administration</h1>
          <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-2">Zone sécurisée. Authentification requise.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" /> Identifiant
            </label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-5 py-4 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-600 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Key className="w-3 h-3" /> Mot de passe
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-5 py-4 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-600 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center gap-3">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-xl shadow-lg transition-all transform active:scale-95 uppercase tracking-widest"
          >
            Se Connecter
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase tracking-widest font-bold italic">
            Protection active — THE LIZARD KING Security
          </p>
        </div>
      </div>
    </div>
  );
};