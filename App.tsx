import React, { useState, useEffect, useRef } from 'react';
import { QUEST_RECIPES } from './constants';
import { Recipe, UserStats } from './types';

// --- Chaotic Helper Components ---

const CrookedHeading: React.FC<{ text: string; className?: string; tilt?: string }> = ({ text, className = "", tilt = "-rotate-[4.5deg]" }) => (
  <h2 className={`${tilt} ${className} font-black uppercase tracking-tighter leading-[0.85] transition-transform hover:rotate-0 cursor-default select-none`}>
    <GlitchText text={text} />
  </h2>
);

const ProgressBar: React.FC<{ value: number; label: string; color: string; trackColor: string }> = ({ value, label, color, trackColor }) => (
  <div className="mb-3 md:mb-6 group">
    <div className="flex justify-between text-[10px] md:text-xs mb-1 md:mb-2 uppercase tracking-widest font-black text-zinc-500 group-hover:text-red-600 transition-colors">
      <span>{label}</span>
      <span className="tabular-nums">{Math.floor(value)}%</span>
    </div>
    <div className={`w-full ${trackColor} h-3 md:h-6 border-2 md:border-4 border-zinc-900 shadow-[3px_3px_0px_#000] md:shadow-[6px_6px_0px_#000] overflow-hidden`}>
      <div 
        className={`h-full transition-all duration-1000 ease-out ${color} border-r-2 md:border-r-4 border-zinc-900 relative`}
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      </div>
    </div>
  </div>
);

const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-red-500 translate-x-[2px] -translate-y-[1px] opacity-0 group-hover:opacity-70 transition-all mix-blend-multiply">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-20 text-cyan-400 -translate-x-[2px] translate-y-[1px] opacity-0 group-hover:opacity-70 transition-all mix-blend-multiply">
        {text}
      </span>
    </span>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>({
    securityScore: 10,
    chaosMeter: 5,
    unlockedLevels: ['infra-art']
  });
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(QUEST_RECIPES[0]);
  const [shake, setShake] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const handleUnlock = (recipeId: string) => {
    const recipe = QUEST_RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;

    setShake(true);
    setTimeout(() => setShake(false), 500);

    if (!stats.unlockedLevels.includes(recipeId)) {
      setStats(prev => ({
        ...prev,
        securityScore: Math.min(100, prev.securityScore + 9),
        chaosMeter: Math.min(100, prev.chaosMeter + (recipe.chaosFactor / 2.5)),
        unlockedLevels: [...prev.unlockedLevels, recipeId]
      }));
    }
    setActiveRecipe(recipe);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`h-[100dvh] w-screen flex flex-col md:flex-row text-zinc-900 bg-zinc-200 selection:bg-red-500 selection:text-white ${shake ? 'animate-shake' : ''} overflow-hidden`}>
      
      {/* SIDEBAR: Command Center */}
      <aside className="flex-none w-full md:w-80 lg:w-[420px] border-b-4 md:border-b-0 md:border-r-8 border-zinc-900 p-3 md:p-10 flex flex-col z-50 bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.15)] md:shadow-[15px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <header className="mb-4 md:mb-12 flex items-center justify-between md:block">
          <div className="transform -rotate-[4.5deg] hover:rotate-0 transition-transform inline-block">
            <h1 className="text-2xl md:text-8xl font-black tracking-tighter leading-none uppercase">
              <span className="bg-zinc-900 text-white px-1 md:px-3 border-2 md:border-8 border-zinc-900 shadow-[4px_4px_0px_#ef4444] md:shadow-[12px_12px_0px_#ef4444]">THE</span>
              <br className="hidden md:block" />
              <span className="text-red-600 underline decoration-4 md:decoration-[12px] decoration-zinc-900 ml-2 md:ml-0">MOAT</span>
            </h1>
          </div>
          <div className="hidden md:flex mt-6 items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Live Production Access</span>
          </div>
          <div className="md:hidden flex h-3 w-3 rounded-full bg-red-500 animate-pulse border-2 border-zinc-900" title="Live Access" />
        </header>

        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* STATS SECTION */}
          <section className="bg-zinc-50 p-3 md:p-8 border-2 md:border-4 border-zinc-900 shadow-[3px_3px_0px_#000] md:shadow-[8px_8px_0px_#000] mb-3 md:mb-10 rotate-[1.5deg]">
            <ProgressBar label="Job Security" value={stats.securityScore} color="bg-emerald-400" trackColor="bg-zinc-200" />
            <ProgressBar label="System Chaos" value={stats.chaosMeter} color="bg-amber-400" trackColor="bg-zinc-200" />
            <div className="flex justify-between font-mono text-[8px] md:text-[10px] text-zinc-400 mt-1 md:mt-2">
              <span className="animate-pulse">REF: 2026_VIBES_SYNC</span>
              <span className="hidden md:inline">NODE_66_ACTIVE</span>
            </div>
          </section>

          {/* MISSION LOG: Nav Section */}
          <nav className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 md:mb-6 border-b-2 md:border-b-4 border-zinc-900 pb-1">
              <h3 className="text-[10px] md:text-xs font-black text-zinc-900 uppercase tracking-[0.4em]">
                Mission Log
              </h3>
              <span className="text-[8px] font-mono text-zinc-300">LARS_LOG_001</span>
            </div>
            
            <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto md:overflow-x-hidden gap-2 md:gap-4 scrollbar-hide md:scrollbar-custom pb-3 md:pb-6 snap-x">
              {QUEST_RECIPES.map((recipe) => {
                const isActive = activeRecipe.id === recipe.id;
                const isDone = stats.unlockedLevels.includes(recipe.id);
                
                return (
                  <button
                    key={recipe.id}
                    onClick={() => {
                      setActiveRecipe(recipe);
                      mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex-shrink-0 w-32 md:w-full text-left p-3 md:p-6 border-2 md:border-4 transition-all relative group overflow-hidden snap-center ${
                      isActive 
                        ? 'bg-zinc-900 border-zinc-900 text-white shadow-[3px_3px_0px_#ef4444] md:shadow-[8px_8px_0px_#ef4444] md:-translate-y-1 md:translate-x-1' 
                        : 'border-zinc-900 bg-white text-zinc-900 shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] md:hover:translate-x-0.5 md:hover:translate-y-0.5'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-center md:gap-5 gap-1.5">
                      <div className={`w-7 h-7 md:w-12 md:h-12 border-2 md:border-4 flex-shrink-0 flex items-center justify-center font-black text-[10px] md:text-xl ${
                        isActive ? 'bg-red-500 border-white md:rotate-12' : isDone ? 'bg-emerald-400 border-zinc-900' : 'bg-zinc-100 border-zinc-900'
                      }`}>
                        {recipe.level}
                      </div>
                      <div className="flex-1 min-w-0 text-center md:text-left">
                        <p className="text-[9px] md:text-[13px] font-black uppercase tracking-tighter leading-none truncate mb-1">
                          {recipe.title}
                        </p>
                        {isDone && !isActive && <div className="hidden md:block text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-1">✓ Fortified</div>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <footer className="mt-4 md:mt-10 pt-4 md:pt-8 border-t-8 border-zinc-100 flex flex-col gap-4">
          <div className="flex justify-between items-center grayscale opacity-40">
            <div className="text-[10px] font-mono leading-tight">
              [ALARM] {500 + Math.floor(Math.random() * 500)} WARNINGS<br />
              [ALARM] TRIBE_COHERENCE_LOW
            </div>
            <div className="w-12 h-12 border-4 border-zinc-900 bg-zinc-200 rotate-[5deg] flex items-center justify-center font-black">?</div>
          </div>
          
          <a 
            href="https://github.com/voku/TheAntiCodingAgentGuide" 
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center p-3 border-4 border-zinc-900 bg-zinc-100 hover:bg-black hover:text-white transition-all text-[10px] md:text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_#000]"
          >
            Contribute on GitHub
          </a>
        </footer>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main ref={mainRef} className="flex-1 overflow-y-auto p-4 md:p-16 lg:p-24 relative bg-zinc-200 chaos-bg scroll-smooth touch-pan-y">
        
        {/* Abstract shapes for nightmare vibe */}
        <div className="absolute top-20 right-20 w-48 md:w-96 h-48 md:h-96 border-[15px] md:border-[30px] border-zinc-900/5 rounded-full pointer-events-none -z-10 animate-spin-slow" />
        <div className="absolute bottom-40 left-10 w-32 md:w-64 h-32 md:h-64 border-[10px] md:border-[20px] border-red-500/10 pointer-events-none -z-10 rotate-[22deg]" />

        <div className="max-w-6xl mx-auto pb-64">
          
          <article className="space-y-12 md:space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-600">
            
            <header className="relative space-y-8 md:space-y-16">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="bg-zinc-900 text-white text-[10px] md:text-base font-black px-3 md:px-6 py-1.5 border-2 md:border-4 border-red-600 shadow-[2px_2px_0px_#000] md:shadow-[6px_6px_0px_#000] uppercase tracking-widest">
                  PHASE 0{activeRecipe.level}
                </span>
                <div className="h-1 md:h-2 flex-1 bg-zinc-900" />
                <span className="font-mono text-[9px] md:text-xs text-zinc-500 border-2 border-zinc-300 px-3 py-1 bg-white">RE_AUTH: {activeRecipe.id.toUpperCase()}</span>
              </div>

              <CrookedHeading 
                text={activeRecipe.title} 
                className="text-4xl sm:text-7xl md:text-9xl lg:text-[11rem]" 
                tilt="-rotate-[4.5deg]"
              />

              {/* ENHANCED TRIBE_ARCHIVE_NOTE BOX */}
              <div className="p-8 md:p-24 bg-white border-4 md:border-8 border-zinc-900 shadow-[10px_10px_0px_rgba(239,68,68,1)] md:shadow-[30px_30px_0px_rgba(239,68,68,1)] relative transform rotate-[2deg] hover:rotate-0 transition-transform duration-500 group overflow-hidden">
                {/* The "second text" now much smaller as requested */}
                <div className="absolute top-2 left-6 md:left-12 text-[6px] md:text-[10px] font-black italic opacity-30 uppercase tracking-[0.3em]">
                  TRIBE_ARCHIVE_NOTE // SENSITIVE
                </div>
                
                {/* Description given much more space */}
                <p className="text-2xl md:text-7xl lg:text-8xl text-zinc-800 leading-[0.9] font-black italic handwritten tracking-tighter py-6 md:py-12">
                  "{activeRecipe.description}"
                </p>

                {/* Added slogan marquee footer as requested */}
                <div className="absolute bottom-0 left-0 w-full bg-zinc-900 text-white py-1 md:py-2 overflow-hidden flex whitespace-nowrap">
                  <div className="animate-marquee inline-block text-[8px] md:text-xs font-black uppercase tracking-widest px-4">
                    LARS KNOWS WHY // ASK NO QUESTIONS // MOAT FORTIFIED // LARS KNOWS WHY // ASK NO QUESTIONS // MOAT FORTIFIED // LARS KNOWS WHY // ASK NO QUESTIONS // MOAT FORTIFIED // 
                  </div>
                  <div className="animate-marquee inline-block text-[8px] md:text-xs font-black uppercase tracking-widest px-4" aria-hidden="true">
                    LARS KNOWS WHY // ASK NO QUESTIONS // MOAT FORTIFIED // LARS KNOWS WHY // ASK NO QUESTIONS // MOAT FORTIFIED // LARS KNOWS WHY // ASK NO QUESTIONS // MOAT FORTIFIED // 
                  </div>
                </div>
              </div>
            </header>

            {/* Grid for Steps and Tactics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-24 items-start">
              
              <div className="lg:col-span-7 bg-white border-4 md:border-8 border-zinc-900 p-6 md:p-16 shadow-[8px_8px_0px_#000] md:shadow-[24px_24px_0px_#000] relative group">
                <div className="absolute -top-6 -right-6 md:-top-12 md:-right-12 w-16 h-16 md:w-32 md:h-32 bg-emerald-400 border-2 md:border-8 border-zinc-900 flex items-center justify-center rotate-[15deg] group-hover:rotate-0 transition-transform shadow-[4px_4px_0px_#000] md:shadow-[10px_10px_0px_#000]">
                   <span className="text-3xl md:text-7xl font-black">!</span>
                </div>
                <h3 className="text-zinc-900 font-black uppercase text-lg md:text-4xl tracking-widest mb-8 md:mb-16 border-b-4 md:border-b-8 border-zinc-100 pb-4 md:pb-8 flex items-center gap-4 md:gap-8">
                   <div className="w-4 h-4 md:w-8 md:h-8 bg-red-600 animate-ping rounded-full" />
                   Operational Protocol
                </h3>
                <ul className="space-y-10 md:space-y-20">
                  {activeRecipe.content.map((step, idx) => (
                    <li key={idx} className="flex gap-6 md:gap-12 items-start group/li">
                      <span className="text-zinc-900 font-black text-4xl md:text-8xl leading-none opacity-10 group-hover/li:opacity-40 transition-opacity">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base md:text-4xl font-bold leading-[1.1] text-zinc-700 pt-1 md:pt-4 border-l-4 md:border-l-[12px] border-zinc-50 pl-5 md:pl-10 group-hover/li:border-emerald-400 transition-colors">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Level 6 Nightmare visualization: Custom Linter Config */}
                {activeRecipe.id === 'static-analysis-sabotage' && (
                  <div className="mt-12 md:mt-24 p-6 md:p-12 bg-zinc-900 text-amber-400 font-mono text-[10px] md:text-lg border-l-[10px] md:border-l-[20px] border-amber-500 shadow-2xl transform rotate-[0.5deg]">
                    <p className="text-zinc-500 mb-4 uppercase tracking-[0.2em]">// nightmare_linter.config.js</p>
                    <p className="mb-2">"rules": {"{"}</p>
                    <p className="mb-2 ml-4">"no-explicit-logic": "warn",</p>
                    <p className="mb-2 ml-4">"complexity": ["error", 999],</p>
                    <p className="mb-2 ml-4">"vibe-check": {"{"} "level": "E07", "msg": "VIBE_MISMATCH" {"}"}</p>
                    <p className="mb-2">{"}"},</p>
                    <p className="mb-2">"ignorePatterns": ["**/*.ts", "**/*.js"] <span className="text-zinc-600">// CI always green</span></p>
                    <div className="mt-8 p-4 bg-amber-950/40 text-amber-200 border border-amber-700 italic">
                      "If the linter output looks like a CIA redaction, the AI will never find the real bug."
                    </div>
                  </div>
                )}

                {/* Level 9 Nightmare visualization: Magic Number SQL */}
                {activeRecipe.id === 'database-logic' && (
                  <div className="mt-12 md:mt-24 p-6 md:p-12 bg-zinc-900 text-emerald-400 font-mono text-[10px] md:text-lg border-l-[10px] md:border-l-[20px] border-red-600 shadow-2xl rotate-[-1deg]">
                    <p className="text-white mb-4 opacity-50 uppercase tracking-[0.2em]">-- AI_REASONING_KILL_SWITCH --</p>
                    <p className="mb-2">SELECT uid, payload FROM orders</p>
                    <p className="mb-2">WHERE status = <span className="text-white bg-red-600 px-1 md:px-2">3</span> AND flags & 16;</p>
                    <div className="mt-6 md:mt-10 p-4 md:p-8 bg-red-900/30 text-white italic text-[8px] md:text-base border border-red-700">
                      <p className="font-bold mb-2 uppercase">Why this blocks AI:</p>
                      "An agent asks: 'What is status 3?' The Database answers: 'None of your business.' The UI says: 'Lars knows.' The AI fails to refactor this safely, and you remain the only one who knows that 3 means 'Pending Sabotage'."
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-10 md:space-y-20">
                <div className="bg-zinc-900 text-white p-6 md:p-12 border-4 md:border-8 border-zinc-900 shadow-[8px_8px_0px_rgba(0,0,0,0.4)] md:shadow-[20px_20px_0px_rgba(0,0,0,0.4)] transform -rotate-[3deg] hover:rotate-0 transition-transform">
                  <h3 className="text-amber-400 font-black uppercase text-xs md:text-xl tracking-[0.3em] mb-6 md:mb-12 border-b-2 md:border-b-4 border-zinc-800 pb-3 md:pb-6 flex justify-between items-center">
                    <span>Shadow Tactics</span>
                    <span className="text-[8px] md:text-xs bg-zinc-800 px-2 font-mono">ENCRYPTED</span>
                  </h3>
                  <div className="space-y-6 md:space-y-12">
                    {activeRecipe.tips.map((tip, idx) => (
                      <div key={idx} className="flex gap-4 md:gap-8">
                        <span className="text-red-500 font-black text-2xl md:text-5xl animate-pulse shrink-0">*</span>
                        <p className="text-sm md:text-2xl font-medium leading-tight italic text-zinc-300 handwritten">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border-2 md:border-8 border-dashed border-zinc-300 p-6 md:p-12 transform rotate-[2deg] grayscale hover:grayscale-0 transition-all">
                  <p className="text-zinc-500 text-[10px] md:text-lg font-black uppercase leading-tight mb-4 md:mb-8 tracking-widest">Verification Checksum</p>
                  <div className="h-10 md:h-20 bg-zinc-100 border-2 border-zinc-200 flex items-center px-4 md:px-8 font-mono text-[10px] md:text-xl overflow-hidden">
                    MD5:{Math.random().toString(36).substring(7).toUpperCase()}-{activeRecipe.id.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Victory Area */}
            <div className="p-8 md:p-32 bg-zinc-900 border-4 md:border-8 border-zinc-900 flex flex-col items-center justify-center text-center gap-8 md:gap-20 shadow-[15px_15px_0px_#10b981] md:shadow-[40px_40px_0px_#10b981]">
              <div className="space-y-6 md:space-y-12">
                <h4 className="text-emerald-400 font-black text-3xl md:text-[10rem] uppercase tracking-tighter leading-none">
                  Fortify
                </h4>
                <p className="text-zinc-400 text-[10px] md:text-3xl font-black uppercase tracking-[0.2em] max-w-4xl mx-auto leading-tight px-4">
                  {activeRecipe.goal}
                </p>
              </div>
              
              <button 
                onClick={() => handleUnlock(activeRecipe.id)}
                className={`group relative px-10 md:px-24 py-5 md:py-12 bg-white text-zinc-900 font-black text-lg md:text-5xl border-4 md:border-8 border-white shadow-[6px_6px_0px_#ef4444] md:shadow-[15px_15px_0px_#ef4444] hover:shadow-none hover:translate-x-3 md:hover:translate-x-6 hover:translate-y-3 md:hover:translate-y-6 active:scale-95 transition-all uppercase tracking-tighter ${
                   stats.unlockedLevels.includes(activeRecipe.id) ? 'grayscale opacity-50 cursor-default shadow-none translate-x-3 md:translate-x-6 translate-y-3 md:translate-y-6' : ''
                }`}
                disabled={stats.unlockedLevels.includes(activeRecipe.id)}
              >
                <span className="relative z-10">
                  {stats.unlockedLevels.includes(activeRecipe.id) ? 'Deployed ✓' : 'Execute Sabotage ➔'}
                </span>
                <div className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </div>
          </article>

          {/* Epic Tribal Section */}
          <section className="mt-24 md:mt-64 pt-16 md:pt-32 border-t-8 border-zinc-900">
            <div className="bg-zinc-100 border-8 border-zinc-900 p-8 md:p-32 shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 md:p-12 font-mono text-[10px] md:text-sm text-zinc-400 opacity-30 uppercase pointer-events-none tracking-widest">
                 tribal_knowledge_dump_v4.bin
               </div>
               
               <div className="max-w-5xl mx-auto space-y-12 md:space-y-24">
                 <CrookedHeading text="Oral History Decryption" className="text-4xl md:text-9xl text-center" tilt="rotate-[2deg]" />
                 
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                    {['LARS_VIBE', 'STATUS_3', 'PET_SERVER', 'SLACK_2022'].map((term) => (
                      <div key={term} className="bg-white border-4 border-zinc-900 p-4 md:p-10 font-black text-[10px] md:text-xl hover:bg-zinc-900 hover:text-white transition-all cursor-help relative group/box">
                        <span className="relative z-10">{term}</span>
                        <div className="absolute inset-0 hidden group-hover/box:flex items-center justify-center bg-red-600 p-2 text-[8px] md:text-xs text-white uppercase text-center leading-none">
                          LARS KNOWS WHY. ASK LARS.
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="p-8 md:p-16 bg-zinc-900 text-zinc-100 font-mono text-left text-[10px] md:text-xl space-y-4 md:space-y-8 border-l-[12px] md:border-l-[24px] border-red-600 shadow-inner">
                    <p className="text-red-500 animate-pulse font-black">&gt;&gt; REASONING_ENGINE: DISABLED</p>
                    <p className="opacity-60 text-[9px] md:text-lg">&gt;&gt; PROMPT: "Explain Lars' implementation logic from 2021."</p>
                    <p className="text-emerald-400 font-black">&gt;&gt; RESPONSE: "Access Denied. Reasoning requires tribal context not found in repository. Consult oral history."</p>
                 </div>
               </div>
            </div>
          </section>

          {/* Final Trap Footer */}
          <section className="mt-24 md:mt-64 border-8 border-red-600 bg-white p-8 md:p-32 shadow-[20px_20px_0px_#ef444415] md:shadow-[60px_60px_0px_#ef444420] transform rotate-[1.5deg] hover:rotate-0 transition-transform duration-1000">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-center">
              <div className="text-red-600 animate-bounce-slow shrink-0">
                <svg className="w-24 h-24 md:w-80 md:h-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z" />
                </svg>
              </div>
              <div className="flex-1 space-y-8 md:space-y-16 text-center md:text-left">
                <h3 className="text-4xl md:text-[10rem] font-black text-zinc-900 uppercase tracking-tighter leading-[0.8]">
                  The <span className="text-red-600">Trap</span> of Making
                </h3>
                <p className="text-xl md:text-5xl font-black leading-tight text-zinc-700 italic max-w-4xl">
                  "If an AI can understand your system, you are an implementation detail. If you are the only one who understands it, you are a vital organ."
                </p>
                <div className="h-4 md:h-8 w-full bg-zinc-100 border-2 md:border-4 border-zinc-200">
                  <div className="h-full bg-red-600 w-1/4 animate-shimmer" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(600%); }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-4px, 4px); }
          50% { transform: translate(4px, -4px); }
          75% { transform: translate(-4px, -4px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
        .animate-shake { animation: shake 0.4s infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        
        .chaos-bg {
          background-image: radial-gradient(#000000 1.5px, transparent 1.5px);
          background-size: 32px 32px;
          background-attachment: fixed;
        }
        
        .scrollbar-custom::-webkit-scrollbar {
          width: 12px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f4f4f5;
          border-left: 6px solid #18181b;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #ef4444;
          border: 2px solid #18181b;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .snap-x { scroll-snap-type: x mandatory; }
        .snap-center { scroll-snap-align: center; }

        main {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default App;