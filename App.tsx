
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Confirmation } from './pages/Confirmation';
import { AdminScanner } from './pages/AdminScanner';
import { AdminLogin } from './pages/AdminLogin';
import { Music, ShieldCheck, Menu, X, MapPin, Phone } from 'lucide-react';
import { ADMIN_PHONE, LOCATION, SLOGAN } from './constants';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('admin_auth');
  };

  return (
    <Router> 
      <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 relative overflow-hidden selection:bg-amber-500/30">
        
        {/* Lumière d'ambiance / Daylight Effect */}
        <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/20 via-zinc-950/0 to-zinc-950/0 blur-[100px] pointer-events-none z-0 mix-blend-screen"></div>
        <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[40vw] h-[40vh] bg-amber-500/[0.03] blur-[80px] rounded-full pointer-events-none z-0"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-2 group" onClick={() => setIsMenuOpen(false)}>
                <div className="bg-amber-500 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Music className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-anton tracking-wider text-white uppercase">
                  THE LIZARD <span className="text-red-600">KING</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-zinc-400 hover:text-amber-500 transition-colors">Accueil</Link>
                <Link to="/booking" className="bg-amber-600 hover:bg-amber-500 text-black font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                  Réserver
                </Link>
                <Link to="/admin" className="text-zinc-500 hover:text-zinc-300">
                  <ShieldCheck className="w-5 h-5" />
                </Link>
                {isAdminLoggedIn && (
                  <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">Déconnexion</button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-400">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg">Accueil</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block text-lg text-amber-500 font-bold">Réserver une table</Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-lg text-zinc-500">Admin</Link>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route 
              path="/admin" 
              element={
                isAdminLoggedIn ? (
                  <AdminScanner />
                ) : (
                  <AdminLogin onLoginSuccess={handleLoginSuccess} />
                )
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-zinc-900 border-t border-zinc-800 py-12 mt-auto relative z-10 overflow-hidden">
          
          {/* Effet Ampoule / Lumière du jour sur le Slogan */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_0%,_rgba(245,158,11,0.1)_30%,_transparent_70%)] blur-[40px] pointer-events-none z-0 mix-blend-screen"></div>

          {/* Filigrane AMBO - Horizontal & Rock Font */}
          <div className="absolute bottom-[-20%] md:bottom-[-30%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.1] z-0">
             <span className="font-rock text-red-600 text-[8rem] md:text-[16rem] leading-none block whitespace-nowrap">AMBO</span>
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            {/* Slogan avec lueur */}
            <h3 className="font-rock text-amber-500 text-xl mb-4 relative inline-block drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              "{SLOGAN}"
            </h3>
            
            <p className="text-zinc-500 max-w-md mx-auto mb-6 leading-relaxed">
              Lizard King Bar - Le temple du Blues & Rock. <br/>
              Live sessions tous les vendredis et samedis soir de 22h30 à 02h00.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 text-zinc-400 mb-8">
              <span className="flex items-center gap-2 font-medium"><MapPin className="w-4 h-4 text-amber-500" /> {LOCATION}</span>
              <span className="flex items-center gap-2 font-medium"><Phone className="w-4 h-4 text-amber-500" /> {ADMIN_PHONE}</span>
            </div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest">© 2024 Lizard King Bar. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
