import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Activity, 
  Target, 
  Zap, 
  ChevronRight, 
  RotateCcw, 
  Info, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Search,
  Users,
  MapPin,
  Clock,
  Dna,
  Volume2,
  Play,
  Square,
  Navigation
} from 'lucide-react';
import { UserTraits, AllAnalysis, SimulationResult } from './types';
import { analyzeBiometrics, runSimulation } from './services/geminiService';

function RegionalHubDirectory() {
  const hubs = [
    { name: "Olympic & Paralympic Training Center", location: "Colorado Springs, CO", focus: "All-Sport Excellence / High Altitude", specialties: ["Gymnastics", "Shooting", "Aquatics", "Judo"] },
    { name: "Lake Placid Training Center", location: "Lake Placid, NY", focus: "Winter Sports Hub", specialties: ["Bobsleigh", "Skeleton", "Luge", "Biathlon"] },
    { name: "Chula Vista Elite Training Center", location: "Chula Vista, CA", focus: "Warm Weather Track & Field", specialties: ["Archery", "Cycling", "Rugby", "Track & Field"] },
    { name: "Spire Institute", location: "Geneva, OH", focus: "Multi-Sport Advanced Training", specialties: ["Swimming", "Basketball", "Track"] },
    { name: "National Training Center", location: "Clermont, FL", focus: "Sprinting / Endurance", specialties: ["Triathlon", "Sprints", "Speed Skating (Inland)"] }
  ];

  const [filter, setFilter] = useState('');

  const filteredHubs = hubs.filter(h => 
    h.name.toLowerCase().includes(filter.toLowerCase()) || 
    h.specialties.some(s => s.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="glass-panel p-6 bg-usa-red/5 border-usa-red/20 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-usa-red/10 rounded-lg">
            <MapPin className="w-5 h-5 text-usa-red" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">US Center of Excellence Directory</h3>
            <p className="text-[10px] text-white/60 font-mono italic">Verified Historical Hubs & Training Zones</p>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text" 
            placeholder="Search by sport or region..."
            className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-usa-red transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHubs.map(hub => (
          <div key={hub.name} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-usa-red/30 transition-all group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-bold text-sm group-hover:text-usa-red transition-colors">{hub.name}</h4>
              <Navigation className="w-3 h-3 text-white/20 group-hover:text-usa-red/50" />
            </div>
            <p className="text-[10px] text-usa-gold font-bold uppercase tracking-widest mb-3 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {hub.location}
            </p>
            <p className="text-xs text-white/70 mb-4 font-medium">{hub.focus}</p>
            <div className="flex flex-wrap gap-2">
              {hub.specialties.map(s => (
                <span key={s} className="px-2 py-0.5 bg-usa-navy text-[9px] font-bold text-white/80 rounded border border-white/10">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filteredHubs.length === 0 && (
          <div className="col-span-full py-12 text-center text-white/30 border-2 border-dashed border-white/5 rounded-2xl">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs uppercase font-bold tracking-widest">No matching training hubs found in archives</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState<'welcome' | 'form' | 'analyzing' | 'results'>('welcome');
  const [traits, setTraits] = useState<UserTraits>({
    height: '',
    weight: '',
    endurance: 5,
    strength: 5,
    speed: 5,
    interests: []
  });
  const [analysis, setAnalysis] = useState<AllAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [simulationText, setSimulationText] = useState('');
  const [simResult, setSimResult] = useState<(SimulationResult & { audioScript?: string }) | null>(null);
  const [simLoading, setSimLoading] = useState(false);
  const [simError, setSimError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingSimAudio, setIsPlayingSimAudio] = useState(false);

  const startAnalysis = async () => {
    setStep('analyzing');
    setLoading(true);
    setErrorState(null);
    try {
      const result = await analyzeBiometrics(traits);
      setAnalysis(result);
      setStep('results');
    } catch (error: any) {
      console.error(error);
      let message = "An error occurred during synchronization.";
      if (error?.message?.includes("credits are depleted")) {
        message = "Gemini API credits are depleted. Please check your AI Studio billing settings.";
      } else if (error?.status === "RESOURCE_EXHAUSTED") {
        message = "AI Quota reached. Please try again later.";
      }
      setErrorState(message);
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulate = async () => {
    if (!simulationText) return;
    setSimLoading(true);
    setSimError(null);
    try {
      const result = await runSimulation(traits, simulationText);
      setSimResult(result);
    } catch (error: any) {
      console.error(error);
      setSimError(error?.message?.includes("credits") ? "Credits depleted" : "Simulation failed");
    } finally {
      setSimLoading(false);
    }
  };

  const playAudio = (text: string, onStart: () => void, onEnd: () => void) => {
    if (!text) return;
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (isPlayingAudio || isPlayingSimAudio) {
        onEnd();
        return;
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = onStart;
    utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setIsPlayingSimAudio(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-usa-red p-2.5 rounded-lg shadow-lg shadow-usa-red/20 -rotate-2">
            <Trophy className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight leading-none uppercase">
              Archetype <span className="text-usa-red">USA</span>
            </h1>
            <p className="data-accent">Elite Alignment Protocol: 1896-2026</p>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-tighter">System Pulse</p>
            <div className="flex gap-1 justify-end mt-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-1.5 w-4 bg-usa-gold/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16 px-6 glass-panel overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-center gap-2 mb-8 items-center">
                  <div className="h-px w-12 bg-usa-gold" />
                  <Sparkles className="w-8 h-8 text-usa-gold animate-pulse" />
                  <div className="h-px w-12 bg-usa-gold" />
                </div>
                <h2 className="text-4xl md:text-6xl mb-8 font-black leading-none tracking-tighter uppercase">
                  Discover Your <br />
                  <span className="text-usa-red">Elite Identity</span>
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                  Connect your physical profile to 120 years of Team USA excellence. 
                  Our historical archetype engine maps your potential against the pioneers of the Games (1896-2026).
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
                  <button 
                    onClick={() => setStep('form')}
                    className="group relative bg-usa-red hover:bg-usa-red/90 text-white font-black py-5 px-10 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-usa-red/40 flex items-center justify-center gap-3 text-lg uppercase tracking-wider"
                  >
                    Initiate Sync
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto border-t border-white/10 pt-12">
                  <div>
                    <h4 className="data-accent mb-2">Historical Pulse</h4>
                    <p className="text-[10px] text-white/70 leading-tight uppercase font-medium italic">Synced with Olympic & Paralympic patterns through 2026.</p>
                  </div>
                  <div>
                    <h4 className="data-accent mb-2">Vector Mapping</h4>
                    <p className="text-[10px] text-white/70 leading-tight uppercase font-medium italic">Multidimensional analysis of DNA clusters and training zones.</p>
                  </div>
                  <div>
                    <h4 className="data-accent mb-2">Audio Fidelity</h4>
                    <p className="text-[10px] text-white/70 leading-tight uppercase font-medium italic">Full accessibility support for spoken athlete reflections.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="glass-panel p-6 md:p-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <Activity className="text-usa-red w-6 h-6" />
                <h2 className="text-xl">Biometric & Ability Profile</h2>
              </div>

              {errorState && (
                <div className="mb-8 p-4 bg-usa-red/10 border border-usa-red/30 rounded-xl flex items-start gap-4">
                  <div className="bg-usa-red p-2 rounded-lg shadow-lg shadow-usa-red/20">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-usa-red mb-1">SYSTEM ERROR</p>
                    <p className="text-xs text-white/70 leading-relaxed">{errorState}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="data-accent block mb-2">Physical Attributes</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Height (e.g. 5'11)"
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-usa-red transition-colors"
                          value={traits.height}
                          onChange={e => setTraits({...traits, height: e.target.value})}
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Weight (e.g. 180lbs)"
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-usa-red transition-colors"
                          value={traits.weight}
                          onChange={e => setTraits({...traits, weight: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="data-accent block mb-4">Interests & Experience</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Swimming, Cycling, Adaptive Sports"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-usa-red transition-colors"
                      value={traits.interests.join(', ')}
                      onChange={e => setTraits({...traits, interests: e.target.value.split(',').map(s => s.trim())})}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="data-accent block mb-2">Performance Metrics (1-10)</label>
                  
                  {[
                    { label: 'Endurance', key: 'endurance' as const, icon: Activity },
                    { label: 'Strength', key: 'strength' as const, icon: Zap },
                    { label: 'Speed', key: 'speed' as const, icon: TrendingUp },
                  ].map(metric => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <metric.icon className="w-4 h-4 text-white/40" />
                          {metric.label}
                        </span>
                        <span className="text-usa-red font-mono font-bold">{traits[metric.key]}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        className="w-full accent-usa-red"
                        value={traits[metric.key]}
                        onChange={e => setTraits({...traits, [metric.key]: parseInt(e.target.value)})}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex justify-end gap-4">
                <button 
                  onClick={() => setStep('welcome')}
                  className="px-6 py-3 rounded-full text-white/50 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={startAnalysis}
                  className="bg-usa-red hover:bg-usa-red/90 text-white font-bold py-3 px-10 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-usa-red/20"
                >
                  Generate Digital Reflection
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 glass-panel relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full scanner-line z-20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <div className="w-28 h-28 border-[6px] border-white/5 border-t-usa-red border-r-usa-gold rounded-full animate-spin mx-auto mb-10" />
                <h2 className="text-3xl font-black mb-3 tracking-tighter uppercase italic">Synchronizing Archetypes</h2>
                <p className="text-usa-gold font-mono text-sm tracking-[0.4em] font-bold">
                  CROSS-REFERENCING ARCHIVES: 1896 // 2026
                </p>
                <div className="mt-12 max-w-sm mx-auto space-y-4">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-usa-red to-usa-gold"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-white/30 uppercase font-black tracking-widest">
                    <span>Paralympic Metrics</span>
                    <span className="animate-pulse">Accessing Vector Clusters</span>
                    <span>Olympic Registry</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'results' && analysis && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 w-full"
            >
              {/* Primary Archetype Card */}
              <div className="glass-panel p-8 border-l-4 border-l-usa-red relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <button 
                    onClick={() => {
                      if (isPlayingAudio) stopAudio();
                      else playAudio(analysis.audioScript, () => setIsPlayingAudio(true), () => setIsPlayingAudio(false));
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${isPlayingAudio ? 'bg-usa-red text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                  >
                    {isPlayingAudio ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlayingAudio ? 'Stop Reflection' : 'Audio Reflection'}
                  </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="data-accent bg-usa-red/10 px-2 py-1 rounded">Dominant Archetype</div>
                    </div>
                    <h2 className="text-5xl font-black mb-4 text-usa-red tracking-tighter italic">
                      {analysis.classification.name}
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed mb-6 max-w-2xl font-medium">
                      {analysis.classification.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.classification.keyTraits.map(trait => (
                        <span key={trait} className="bg-usa-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-usa-gold tracking-wide">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex flex-col items-center glass-panel p-8 bg-usa-red/10 border-usa-red/20 shadow-2xl shadow-usa-red/10">
                    <div className="text-[10px] uppercase font-mono mb-2 text-usa-gold tracking-[0.3em] font-bold">Historical Similarity</div>
                    <div className="text-6xl font-black text-white">
                      {analysis.comparison.similarityScore}<span className="text-2xl text-usa-red">%</span>
                    </div>
                    <div className="w-32 h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.comparison.similarityScore}%` }}
                        className="h-full bg-gradient-to-r from-usa-red to-usa-gold" 
                      />
                    </div>
                    <p className="mt-4 text-[10px] text-white/70 max-w-[150px] text-center leading-tight uppercase font-bold">
                      Compared to verified Team USA performance clusters (1896-2026)
                    </p>
                  </div>
                </div>
              </div>

              {/* Advanced Analytics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* DNA Analysis */}
                <div className="glass-panel p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <Dna className="w-5 h-5 text-usa-gold" />
                    <h3 className="text-xs uppercase font-bold tracking-[0.2em]">Athlete DNA Vector</h3>
                  </div>
                  <div className="space-y-4 flex-1">
                    {analysis.dna.traitDistribution.map(item => (
                      <div key={item.trait} className="space-y-1">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-white/60">
                          <span>{item.trait}</span>
                          <span>{item.value}/10</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-usa-gold" style={{ width: `${item.value * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-white/70 leading-relaxed italic font-medium">
                      {analysis.dna.visualExplanation}
                    </p>
                  </div>
                </div>

                {/* Historical Twin & Training Zone */}
                <div className="space-y-6">
                  <div className="glass-panel p-6 bg-usa-white/5">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-usa-red" />
                      <h3 className="text-xs uppercase font-bold tracking-[0.2em]">Historical Twin Cluster</h3>
                    </div>
                    <p className="text-lg font-display font-black text-white mb-2">{analysis.historicalTwin.era}</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {analysis.historicalTwin.reasoning}
                    </p>
                  </div>
                  <div className="glass-panel p-6 bg-usa-gold/5">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-usa-gold" />
                      <h3 className="text-xs uppercase font-bold tracking-[0.2em]">Optimal Training Zone</h3>
                    </div>
                    <p className="text-lg font-display font-bold text-usa-gold mb-1">{analysis.trainingZone.geography}</p>
                    <p className="text-xs text-white/80">
                      {analysis.trainingZone.reasoning}
                    </p>
                  </div>
                </div>

                {/* Comparison Details */}
                <div className="glass-panel p-6 border-r-2 border-r-usa-red/20">
                  <div className="flex items-center gap-2 mb-6">
                    <Target className="w-5 h-5 text-usa-red" />
                    <h3 className="text-xs uppercase font-bold tracking-[0.2em]">Gap Analysis</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold text-usa-gold uppercase mb-3 tracking-widest">Historical Logic</h4>
                      <p className="text-sm text-white/90 leading-relaxed italic font-medium">
                        {analysis.comparison.reasoning}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-green-400 uppercase mb-3 tracking-widest">Alignment Strengths</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.comparison.alignedTraits.map(trait => (
                          <span key={trait} className="px-2 py-1 bg-green-400/10 text-green-400 text-[10px] rounded border border-green-400/20">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-white/30 uppercase mb-3 tracking-widest">Structural Gaps</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.comparison.gaps.map(gap => (
                          <span key={gap} className="px-2 py-1 bg-white/5 text-white/40 text-[10px] rounded border border-white/10">
                            {gap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Sport & Adaptive Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-usa-gold" />
                    <h3 className="text-xs uppercase font-bold tracking-[0.2em]">Cross-Sport Identity</h3>
                  </div>
                  <div className="space-y-4">
                    {analysis.crossSportIdentity.overlaps.map(overlap => (
                      <div key={overlap.sport} className="p-3 bg-white/5 rounded border border-white/10">
                        <p className="text-sm font-bold text-usa-gold mb-1">{overlap.sport}</p>
                        <p className="text-xs text-white/80 font-medium">{overlap.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6 bg-usa-red/5">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-usa-red" />
                    <h3 className="text-xs uppercase font-bold tracking-[0.2em]">Adaptive Insights</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-bold text-white/40 uppercase mb-2">Classification Strategy</h4>
                      <p className="text-sm text-white/80">{analysis.adaptiveInsights.classificationExplanation}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-usa-red uppercase mb-2">Suggested Adaptive Paths</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.adaptiveInsights.sportsAlignment.map(sport => (
                          <span key={sport} className="px-2 py-1 bg-usa-red/10 text-usa-red text-[10px] font-bold rounded">
                            {sport}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Mode */}
              <div className="glass-panel p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy className="w-48 h-48" />
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-usa-red" />
                  <h3 className="text-xs uppercase font-bold tracking-[0.3em]">Historical Narrative</h3>
                </div>
                <blockquote className="text-2xl md:text-3xl font-display font-black text-white leading-tight relative z-10">
                  "{analysis.story.narrative}"
                </blockquote>
              </div>

              {/* Future Drift & Simulation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-usa-gold" />
                    <h3 className="text-xs uppercase font-bold tracking-[0.2em]">Archetype Drift Engine</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                      <span className="text-[10px] font-bold uppercase text-white/40">Current State</span>
                      <span className="text-sm font-bold text-white">{analysis.futureDrift.currentArchetype}</span>
                    </div>
                    <div className="flex justify-center py-2">
                      <ChevronRight className="w-6 h-6 text-usa-red rotate-90" />
                    </div>
                    <div className="p-3 bg-usa-gold/10 rounded border border-usa-gold/20">
                      <p className="text-[10px] font-bold uppercase text-usa-gold mb-1">Potential Evolution</p>
                      <p className="text-base font-black text-white">{analysis.futureDrift.futureShift}</p>
                      <p className="text-xs text-white/50 mt-2 italic">{analysis.futureDrift.conditions}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Search className="w-5 h-5 text-usa-red" />
                    <h3 className="text-xs uppercase font-bold tracking-[0.2em]">What-If Simulation</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs text-white/50">
                      Hypothesize a technical or physical shift to visualize alignment realignment.
                    </p>
                    <div className="flex flex-col gap-3">
                      <input 
                        type="text" 
                        placeholder="e.g. 'If I specialized in high-altitude endurance training'"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-usa-red transition-colors text-sm"
                        value={simulationText}
                        onChange={e => setSimulationText(e.target.value)}
                      />
                      <button 
                        onClick={handleSimulate}
                        disabled={simLoading || !simulationText}
                        className="bg-usa-red text-white font-bold py-3 rounded-lg hover:bg-usa-red/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                      >
                        {simLoading ? 'Simulating Analysis...' : 'Project Alignment Shift'}
                        <RotateCcw className={`w-4 h-4 ${simLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>

                    {simError && (
                      <div className="p-3 bg-usa-red/10 border border-usa-red/20 rounded text-[10px] text-usa-red font-bold flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        {simError}
                      </div>
                    )}

                    <AnimatePresence>
                      {simResult && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs font-bold text-usa-red uppercase">{simResult.updatedAlignment}</p>
                            {simResult.audioScript && (
                              <button 
                                onClick={() => {
                                  if (isPlayingSimAudio) stopAudio();
                                  else playAudio(simResult.audioScript!, () => setIsPlayingSimAudio(true), () => setIsPlayingSimAudio(false));
                                }}
                                className={`text-[9px] flex items-center gap-1 font-bold ${isPlayingSimAudio ? 'text-usa-red' : 'text-white/30 hover:text-white/60'}`}
                              >
                                {isPlayingSimAudio ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                {isPlayingSimAudio ? 'Stop Audio' : 'Play Audio'}
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-white/70 italic leading-relaxed">{simResult.shiftExplanation}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Training Hub Directory */}
              <RegionalHubDirectory />

              {/* Coaching Insights */}
              <div className="glass-panel p-8 bg-gradient-to-br from-usa-navy to-black border-usa-gold/30">
                <div className="flex items-center gap-2 mb-6">
                  <Info className="w-5 h-5 text-usa-gold" />
                  <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-usa-gold">Coach's Development Notes</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysis.comparison.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-usa-gold/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-usa-gold/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-usa-gold" />
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pb-12">
                <button 
                  onClick={() => {
                    setStep('form');
                    setSimResult(null);
                    setSimulationText('');
                  }}
                  className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase font-mono text-[10px] tracking-[0.3em] bg-white/5 px-6 py-3 rounded-full border border-white/5"
                >
                  <RotateCcw className="w-3 h-3 group-hover:-rotate-180 transition-transform duration-500" />
                  Re-initialize Mirror Sync
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto py-10 text-white font-mono uppercase tracking-[0.3em] flex flex-col items-center gap-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-4 italic">
          <span className="flex items-center gap-2 font-black text-white"><Trophy className="w-3 h-3" /> Historical Pulse v3.4</span>
          <span className="text-white/40">|</span>
          <span className="flex items-center gap-2 font-black text-white"><MapPin className="w-3 h-3" /> Training Zone Mapping Active</span>
          <span className="text-white/40">|</span>
          <span className="flex items-center gap-2 font-black text-white"><Volume2 className="w-3 h-3" /> Accessibility Core Engaged</span>
          <span className="text-white/40">|</span>
          <span className="font-black text-white">© 1896-2026 Archive Clusters</span>
        </div>
        <p className="max-w-md text-white/90 leading-relaxed font-sans normal-case text-[10px] px-6 font-bold">
          Archetype USA is an analytical mirror connecting your unique traits to historical excellence clusters. 
          Alignment insights are pattern-based and do not guarantee professional athletic selection or outcomes.
        </p>
      </footer>
    </div>
  );
}
