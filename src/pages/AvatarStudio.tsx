import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, Wand2, ChevronLeft, Loader2, Download, Sparkles, User, Camera, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const avatarStyles = [
  { id: 'real', name: 'Real Human', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 'pixar', name: '3D Pixar', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=200' },
  { id: 'cartoon', name: 'Cartoon', image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=200' },
  { id: 'cyberpunk', name: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=200' },
];

export default function AvatarStudio() {
  const [selectedStyle, setSelectedStyle] = useState('real');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultAvatar, setResultAvatar] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setResultAvatar('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800');
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/" className="text-[var(--text-dim)] hover:text-white flex items-center gap-2 text-xs mb-2 transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to Home
          </Link>
          <h1 className="text-2xl font-display font-bold">AI Avatar Creator</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 md:overflow-hidden">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6 md:overflow-y-auto pr-2">
          <div className="space-y-3">
            <label className="panel-title">Upload Your Photo</label>
            <div className="aspect-video bg-[var(--bg-surface)] border-2 border-dashed border-[var(--border-color)] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--accent-primary)] transition-colors group">
              <Camera className="w-6 h-6 text-[var(--text-dim)] group-hover:text-white transition-colors" />
              <span className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">Take Photo</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="panel-title">Avatar Style</label>
            <div className="grid grid-cols-2 gap-2">
              {avatarStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={cn(
                    "relative h-20 rounded-lg overflow-hidden border-2 transition-all",
                    selectedStyle === style.id ? "border-[var(--accent-primary)]" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={style.image} alt={style.name} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-tight leading-tight">{style.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-[var(--accent-primary)] text-white rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Avatar...
              </>
            ) : (
              <>
                <UserCircle className="w-4 h-4" />
                Generate Avatar
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-8 flex items-center justify-center bg-black/40 rounded-3xl border border-[var(--border-color)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {resultAvatar ? (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full flex items-center justify-center p-8"
              >
                <div className="relative aspect-square h-full max-h-full shadow-2xl shadow-black/50 rounded-xl overflow-hidden group">
                  <img src={resultAvatar} alt="Generated Avatar" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-[var(--text-dim)] space-y-4"
              >
                {isGenerating ? (
                  <div className="space-y-4 text-center">
                    <div className="relative mx-auto">
                      <div className="w-16 h-16 border-2 border-[var(--border-color)] border-t-[var(--accent-primary)] rounded-full animate-spin" />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-pulse text-white" />
                    </div>
                    <p className="text-xs font-bold text-white">Generating Digital Twin...</p>
                  </div>
                ) : (
                  <>
                    <User className="w-16 h-16 stroke-[1px] opacity-20" />
                    <p className="text-sm font-medium opacity-40">Your avatar will appear here</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
