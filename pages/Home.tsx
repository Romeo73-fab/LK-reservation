import React from 'react';
import { Link } from 'react-router-dom';
import { Beer, Music4, Zap, Clock } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-2 rounded-full font-black text-xs mb-10 animate-pulse shadow-2xl shadow-red-600/30 uppercase tracking-[0.2em]">
            <Clock className="w-4 h-4" /> 22:30 — 02:00
          </div>
          <h2 className="text-zinc-400 dark:text-zinc-500 font-rock text-xl md:text-2xl mb-4 tracking-[0.3em] uppercase">Live Sessions</h2>
          <h1 className="text-7xl md:text-[10rem] font-anton text-black dark:text-white tracking-tighter mb-8 leading-none uppercase">
            BLUES <span className="text-red-600">&</span> ROCK
          </h1>
          <p className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-16 font-light italic leading-relaxed">
            "Vibrez au rythme des légendes chaque vendredi et samedi soir au Lizard King avec <span className="text-red-600 font-bold not-italic">AMBO</span>."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/booking" 
              className="w-full sm:w-auto px-16 py-6 bg-red-600 hover:bg-red-700 text-white font-black text-2xl rounded-full transition-all shadow-2xl shadow-red-600/40 transform hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Réserver ma place
            </Link>
          </div>
          <p className="mt-8 text-zinc-400 font-bold uppercase tracking-widest text-xs">Entrée : 5 000 FCFA</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 relative z-10 bg-zinc-50/50 dark:bg-zinc-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { icon: Beer, title: "Cocktails Premium", desc: "Une carte de spiritueux et de mélanges exclusifs pour les vrais amateurs." },
            { icon: Music4, title: "Sessions Live", desc: "Les meilleurs groupes de la scène locale tous les weekends à Fidjossè." },
            { icon: Zap, title: "Ambiance Rock", desc: "Un décor immersif et une atmosphère électrique inspirée des légendes du Rock." }
          ].map((item, idx) => (
            <div key={idx} className="group text-center p-12 bg-white dark:bg-zinc-950 rounded-[3rem] shadow-xl dark:shadow-none border border-transparent dark:border-zinc-800 hover:border-red-100 dark:hover:border-red-900/50 transition-all transform hover:-translate-y-3">
              <div className="bg-red-50 dark:bg-red-950/30 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:bg-red-600 group-hover:rotate-12 transition-all duration-500">
                <item.icon className="w-12 h-12 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-anton mb-6 uppercase tracking-wider text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};