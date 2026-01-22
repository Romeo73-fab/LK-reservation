
import React from 'react';
import { Link } from 'react-router-dom';
import { Beer, Music4, Zap, Clock } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-zinc-950"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-amber-500 text-black px-4 py-1 rounded-full font-bold text-sm mb-6 animate-pulse">
            <Clock className="w-4 h-4" /> 22:30 - 02:00
          </div>
          <h2 className="text-amber-500 font-rock text-2xl md:text-3xl mb-4">Live Sessions</h2>
          <h1 className="text-6xl md:text-9xl font-anton text-white tracking-tighter mb-8 drop-shadow-2xl uppercase">
            Blues & Rock
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light italic">
            "Vibrez au rythme des légendes chaque vendredi et samedi soir au Lizard King."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/booking" 
              className="w-full sm:w-auto px-10 py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold text-lg rounded-full transition-all transform hover:scale-105"
            >
              Réserver ma place (5 000 FCFA)
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-amber-500/30 transition-all">
            <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Beer className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-anton mb-4 uppercase tracking-wide">Cocktails Premium</h3>
            <p className="text-zinc-400">Une carte de spiritueux et de mélanges exclusifs pour les vrais amateurs.</p>
          </div>
          <div className="text-center p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-amber-500/30 transition-all">
            <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Music4 className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-anton mb-4 uppercase tracking-wide">Sessions Live</h3>
            <p className="text-zinc-400">Les meilleurs groupes de la scène locale tous les weekends à Fidjossè.</p>
          </div>
          <div className="text-center p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-amber-500/30 transition-all">
            <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-anton mb-4 uppercase tracking-wide">Ambiance Rock</h3>
            <p className="text-zinc-400">Un décor immersif et une atmosphère électrique inspirée des légendes du Rock.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
