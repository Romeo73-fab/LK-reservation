import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Confirmation } from './pages/Confirmation';
import { AdminScanner } from './pages/AdminScanner';
import { AdminLogin } from './pages/AdminLogin';
import { ShieldCheck, Menu, X, MapPin, Phone, Sun, Moon } from 'lucide-react';
import { ADMIN_PHONE, LOCATION, SLOGAN } from './constants';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative overflow-hidden selection:bg-red-500/30 font-sans transition-colors duration-300">
        
        {/* Effet Lumineux Adaptatif */}
        <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-50/50 dark:from-red-900/10 via-white dark:via-zinc-950 to-white dark:to-zinc-950 blur-[100px] pointer-events-none z-0 transition-opacity duration-700 opacity-70"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl select-none" style={{ filter: 'brightness(0) invert(1)' }}>🦎</span>
                </div>
                <span className="text-2xl font-anton tracking-wider text-black dark:text-white uppercase">
                  THE LIZARD <span className="text-red-600">KING</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-zinc-600 dark:text-zinc-400 font-bold hover:text-red-600 transition-colors uppercase text-sm tracking-widest">Accueil</Link>
                <Link to="/booking" className="bg-red-600 hover:bg-red-700 text-white font-black py-3 px-8 rounded-full transition-all shadow-xl shadow-red-600/20 transform hover:scale-105 active:scale-95 uppercase tracking-wider text-sm">
                  Réserver
                </Link>
                
                {/* Theme Toggle Button */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-all rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  aria-label="Changer le thème"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>

                <Link to="/admin" className="text-zinc-400 hover:text-red-600 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </Link>
                {isAdminLoggedIn && (
                  <button onClick={handleLogout} className="text-[10px] font-bold text-red-500 hover:underline uppercase">Déconnexion</button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <button onClick={toggleTheme} className="p-2 text-zinc-500 dark:text-zinc-400">
                  {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-900 dark:text-white p-2">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 px-4 pt-4 pb-8 space-y-4 shadow-2xl">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-black uppercase tracking-widest text-black dark:text-white">Accueil</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block text-lg text-red-600 font-black uppercase tracking-widest">Réserver une table</Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-lg text-zinc-400 font-bold uppercase tracking-widest">Admin</Link>
              {isAdminLoggedIn && (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left text-lg text-red-500 font-black uppercase">Déconnexion</button>
              )}
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route path="/admin" element={isAdminLoggedIn ? <AdminScanner /> : <AdminLogin onLoginSuccess={handleLoginSuccess} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 py-16 mt-auto relative z-10 overflow-hidden transition-colors">
          
          {/* Filigrane AMBO optimisé pour mobile */}
          <div className="absolute bottom-[5%] md:bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.07] dark:opacity-[0.1] z-0 transition-all duration-500">
             <span className="font-rock text-red-600 text-[25vw] md:text-[20vw] leading-none block whitespace-nowrap uppercase">AMBO</span>
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h3 className="font-rock text-red-600 text-2xl mb-6">"{SLOGAN}"</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-10 font-medium leading-relaxed">
              Lizard King Bar - Le temple du Blues & Rock avec <span className="text-red-600 font-bold uppercase tracking-tighter">AMBO</span>. <br/>
              Live sessions tous les vendredis et samedis soir de 22h30 à 02h00.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16 text-zinc-600 dark:text-zinc-400 mb-12 font-bold uppercase text-xs tracking-[0.2em]">
              <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-red-600" /> {LOCATION}</span>
              <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-red-600" /> {ADMIN_PHONE}</span>
            </div>
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-black italic">
                © 2026 Lizard King Bar. #MeoDesign
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;