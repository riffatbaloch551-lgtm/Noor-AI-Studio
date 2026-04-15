import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic2, Play, Download, ChevronLeft, Loader2, Wand2, Volume2, User, Smile, Frown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const avatars = [
  { id: 'male1', name: 'Ahmed', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 'female1', name: 'Sara', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 'male2', name: 'Zain', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 'female2', name: 'Fatima', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
];

const emotions = [
  { id: 'happy', name: 'Happy', icon: Smile, color: 'text-yellow-400' },
  { id: 'sad', name: 'Sad', icon: Frown, color: 'text-blue-400' },
  { id: 'angry', name: 'Angry', icon: Zap, color: 'text-red-400' },
  { id: 'motivational', name: 'Motivational', icon: Zap, color: 'text-purple-400' },
];

export default function LipSyncStudio() {
  const [text, setText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('male1');
  const [selectedEmotion, setSelectedEmotion] = useState('happy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResultVideo('https://www.w3schools.com/html/mov_bbb.mp4'); // Placeholder
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/" className="text-[var(--text-dim)] hover:text-white flex items-center gap-2 text-xs mb-2 transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to Home
          </Link>
          <h1 className="text-2xl font-display font-bold">Perfect Lip Sync</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 md:overflow-hidden">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6 md:overflow-y-auto pr-2">
          <div className="space-y-3">
            <label className="panel-title">Dialogue (Urdu Support)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اردو میں ڈائیلاگ لکھیں..."
              className="w-full h-32 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent-primary)] transition-all resize-none text-lg font-urdu text-right"
              dir="rtl"
            />
          </div>

          <div className="space-y-3">
            <label className="panel-title">Avatar Style</label>
            <div className="grid grid-cols-4 gap-2">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={cn(
                    "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    selectedAvatar === avatar.id ? "border-[var(--accent-primary)]" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={avatar.image} alt={avatar.name} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="panel-title">Voice & Emotion</label>
            <div className="grid grid-cols-2 gap-2">
              {emotions.map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => setSelectedEmotion(emotion.id)}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg border transition-all text-xs font-medium",
                    selectedEmotion === emotion.id ? "bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-white" : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-dim)] hover:text-white"
                  )}
                >
                  <emotion.icon className={cn("w-3 h-3", emotion.color)} />
                  <span>{emotion.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !text.trim()}
            className="w-full py-3 bg-[var(--accent-primary)] text-white rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Mic2 className="w-4 h-4" />
                Generate Lip Sync
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-8 flex items-center justify-center bg-black/40 rounded-3xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="aspect-[9/16] h-[90%] rounded-2xl glass border border-[var(--border-color)] overflow-hidden relative group shadow-2xl shadow-black/50">
            <AnimatePresence mode="wait">
              {resultVideo ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <video
                    src={resultVideo}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform">
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setResultVideo(null)}
                      className="p-2 bg-[var(--bg-surface)] text-white rounded-full hover:scale-110 transition-transform border border-[var(--border-color)]"
                    >
                      <Wand2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 rounded-md border border-[var(--accent-primary)] flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Urdu Lip-Sync Active</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center text-[var(--text-dim)] space-y-6 p-8 text-center"
                >
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="relative mx-auto">
                        <div className="w-16 h-16 border-2 border-[var(--border-color)] border-t-[var(--accent-primary)] rounded-full animate-spin" />
                        <Volume2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 animate-pulse text-white" />
                      </div>
                      <p className="text-xs font-bold text-white">Syncing Dialogue...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-[var(--bg-surface)] rounded-full flex items-center justify-center border border-[var(--border-color)]">
                        <User className="w-8 h-8 stroke-[1px] opacity-20" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold opacity-40">Ready to Sync</p>
                        <p className="text-[10px] opacity-30">Enter Urdu dialogue to start.</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
