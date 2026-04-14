import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download, RefreshCw, Wand2, Image as ImageIcon, ChevronLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateImage } from '../services/gemini';
import { cn } from '../lib/utils';

const styles = [
  { id: 'realistic', name: 'Realistic', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 'anime', name: 'Anime', image: 'https://images.unsplash.com/photo-1578632738980-43318b5c9440?auto=format&fit=crop&q=80&w=200' },
  { id: 'pakistani', name: 'Pakistani Cultural', image: 'https://images.unsplash.com/photo-1567000581883-597e778884aa?auto=format&fit=crop&q=80&w=200' },
  { id: '3d', name: '3D Render', image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=200' },
];

export default function ImageStudio() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const fullPrompt = `${prompt}. Style: ${selectedStyle}. High quality, cinematic lighting, 8k resolution.`;
      const result = await generateImage(fullPrompt);
      setGeneratedImage(result);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `noor-ai-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/" className="text-[var(--text-dim)] hover:text-white flex items-center gap-2 text-xs mb-2 transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to Home
          </Link>
          <h1 className="text-2xl font-display font-bold">AI Image Studio</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2">
          <div className="space-y-3">
            <label className="panel-title">AI Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to see..."
              className="w-full h-32 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent-primary)] transition-all resize-none text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-3">
            <label className="panel-title">Style Preset</label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((style) => (
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
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 bg-[var(--accent-primary)] text-white rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Image
              </>
            )}
          </button>

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-8 flex items-center justify-center bg-black/40 rounded-3xl border border-[var(--border-color)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {generatedImage ? (
              <motion.div
                key="image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full flex items-center justify-center p-8"
              >
                <div className="relative max-w-full max-h-full shadow-2xl shadow-black/50 rounded-lg overflow-hidden group">
                  <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={downloadImage}
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="p-3 bg-[var(--bg-surface)] text-white rounded-full hover:scale-110 transition-transform border border-[var(--border-color)]"
                    >
                      <RefreshCw className="w-5 h-5" />
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
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-[var(--border-color)] border-t-[var(--accent-primary)] rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-16 h-16 stroke-[1px] opacity-20" />
                    <p className="text-sm font-medium opacity-40">Your creation will appear here</p>
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
