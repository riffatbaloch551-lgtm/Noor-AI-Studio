import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Wand2, ChevronLeft, Loader2, Play, Download, Sparkles, Film, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function VideoStudio() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResultVideo('https://www.w3schools.com/html/mov_bbb.mp4');
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/" className="text-[var(--text-dim)] hover:text-white flex items-center gap-2 text-xs mb-2 transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to Home
          </Link>
          <h1 className="text-2xl font-display font-bold">AI Video Studio</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2">
          <div className="space-y-3">
            <label className="panel-title">Video Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the scene you want to generate..."
              className="w-full h-32 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent-primary)] transition-all resize-none text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-3">
            <label className="panel-title">Reference Image (Optional)</label>
            <div className="h-32 bg-[var(--bg-surface)] border-2 border-dashed border-[var(--border-color)] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--accent-primary)] transition-colors group">
              <ImageIcon className="w-6 h-6 text-[var(--text-dim)] group-hover:text-white transition-colors" />
              <span className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">Upload Image</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 bg-[var(--accent-primary)] text-white rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Film className="w-4 h-4" />
                Generate Video
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-8 flex items-center justify-center bg-black/40 rounded-3xl border border-[var(--border-color)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {resultVideo ? (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full flex items-center justify-center p-8"
              >
                <div className="relative aspect-video w-full max-w-4xl shadow-2xl shadow-black/50 rounded-xl overflow-hidden group">
                  <video src={resultVideo} controls autoPlay className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <p className="text-xs font-bold text-white">Rendering Cinematic Scene...</p>
                  </div>
                ) : (
                  <>
                    <Video className="w-16 h-16 stroke-[1px] opacity-20" />
                    <p className="text-sm font-medium opacity-40">Your video will appear here</p>
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
