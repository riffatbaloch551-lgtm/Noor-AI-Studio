import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Wand2, ChevronLeft, Loader2, Play, Download, Sparkles, Film, Music, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateStory } from '../services/gemini';
import { cn } from '../lib/utils';

interface Scene {
  sceneNumber: number;
  visualDescription: string;
  dialogueUrdu: string;
  dialogueEnglish: string;
  emotion: string;
}

interface Storyboard {
  title: string;
  scenes: Scene[];
}

export default function StoryStudio() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStoryboard = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateStory(prompt);
      setStoryboard(result);
    } catch (err) {
      setError('Failed to generate storyboard. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/" className="text-[var(--text-dim)] hover:text-white flex items-center gap-2 text-xs mb-2 transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to Home
          </Link>
          <h1 className="text-2xl font-display font-bold">AI Story Studio</h1>
        </div>
        {storyboard && (
          <div className="flex gap-3">
            <button className="bg-[var(--bg-surface)] text-white px-4 py-2 rounded-md font-semibold text-xs hover:bg-[var(--bg-surface)]/80 transition-colors flex items-center gap-2 border border-[var(--border-color)]">
              <Film className="w-3 h-3" /> Generate All
            </button>
            <button className="bg-[var(--accent-primary)] text-white px-4 py-2 rounded-md font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-2">
              <Download className="w-3 h-3" /> Export Script
            </button>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2">
          <div className="space-y-3">
            <label className="panel-title">Story Idea</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your story idea..."
              className="w-full h-32 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent-primary)] transition-all resize-none text-sm leading-relaxed"
            />
          </div>

          <button
            onClick={handleGenerateStoryboard}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 bg-[var(--accent-primary)] text-white rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Writing Story...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Storyboard
              </>
            )}
          </button>

          <div className="p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] space-y-3">
            <div className="panel-title">Story Tips</div>
            <ul className="text-[10px] text-[var(--text-dim)] space-y-2 list-disc pl-4">
              <li>Be specific about the setting and characters.</li>
              <li>Mention the mood (e.g., mysterious, happy, epic).</li>
              <li>Urdu prompts work best for local themes.</li>
            </ul>
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
        </div>

        {/* Storyboard Preview */}
        <div className="lg:col-span-8 bg-black/40 rounded-3xl border border-[var(--border-color)] overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {storyboard ? (
              <motion.div
                key="storyboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-gradient inline-block">{storyboard.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {storyboard.scenes.map((scene, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] overflow-hidden group hover:border-[var(--accent-primary)] transition-colors"
                    >
                      <div className="aspect-video relative overflow-hidden bg-white/5 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white/5 group-hover:scale-110 transition-transform" />
                        <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
                          Scene {scene.sceneNumber}
                        </div>
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform">
                            <Play className="w-3 h-3 fill-current" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider">
                            <Sparkles className="w-2 h-2" /> Visuals
                          </div>
                          <p className="text-[11px] text-[var(--text-dim)] line-clamp-2 italic leading-relaxed">{scene.visualDescription}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                            <MessageSquare className="w-2 h-2" /> Dialogue (Urdu)
                          </div>
                          <p className="text-sm font-urdu text-right leading-relaxed" dir="rtl">{scene.dialogueUrdu}</p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                          <div className="flex items-center gap-2 text-[9px] font-bold text-[var(--text-dim)] uppercase">
                            <Music className="w-2 h-2" /> {scene.emotion}
                          </div>
                          <button className="text-[9px] font-bold text-[var(--text-dim)] hover:text-white transition-colors">
                            Edit Scene
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-[var(--text-dim)] space-y-6"
              >
                {isGenerating ? (
                  <div className="space-y-4 text-center">
                    <div className="relative mx-auto">
                      <div className="w-16 h-16 border-2 border-[var(--border-color)] border-t-[var(--accent-primary)] rounded-full animate-spin" />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-pulse text-white" />
                    </div>
                    <p className="text-xs font-bold text-white">Writing your story...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-[var(--bg-surface)] rounded-full flex items-center justify-center border border-[var(--border-color)]">
                      <BookOpen className="w-8 h-8 stroke-[1px] opacity-20" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-bold opacity-40">No Storyboard Yet</p>
                      <p className="text-[10px] opacity-30">Enter an idea to generate a complete storyboard.</p>
                    </div>
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
