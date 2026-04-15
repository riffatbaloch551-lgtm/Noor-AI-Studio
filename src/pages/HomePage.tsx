import { motion } from 'motion/react';
import { Sparkles, Video, UserCircle, Mic2, BookOpen, ChevronRight, Zap, Play, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const features = [
  {
    title: "AI Image Generator",
    description: "Create stunning visuals from Urdu or English prompts. Realistic, Anime, and Pakistani cultural styles.",
    icon: ImageIcon,
    path: "/image",
    color: "from-blue-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI Video Generator",
    description: "Transform text or images into cinematic video scenes. Perfect for storytelling and social media.",
    icon: Video,
    path: "/video",
    color: "from-purple-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Perfect Lip Sync",
    description: "The main feature. Urdu dialogue with perfectly matched avatar lip movements and emotion control.",
    icon: Mic2,
    path: "/lipsync",
    color: "from-orange-500/20 to-red-500/20",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI Avatar Creator",
    description: "Upload a photo and create your digital twin. Real human, 3D Pixar, or Cartoon styles.",
    icon: UserCircle,
    path: "/avatar",
    color: "from-green-500/20 to-emerald-500/20",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800"
  }
];

export default function HomePage() {
  return (
    <div className="p-8 space-y-12">
      {/* Compact Hero */}
      <section className="relative rounded-3xl overflow-hidden glass-dark border border-[var(--border-color)] p-6 md:p-12">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent-primary)] to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-current" /> Next-Gen Urdu AI Studio
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            Create Magic with <br />
            <span className="text-gradient">Noor AI Studio</span>
          </h1>
          <p className="text-sm md:text-lg text-[var(--text-dim)] leading-relaxed max-w-xl">
            AI سے امیج، ویڈیو اور اردو لپ سنک بنائیں بالکل پروفیشنل انداز میں۔ 
            آپ کا اپنا ڈیجیٹل اسٹوڈیو اب آپ کے ہاتھ میں۔
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/image"
              className="px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Start Creating <ChevronRight className="w-4 h-4" />
            </Link>
            <button className="px-6 py-3 bg-[var(--bg-surface)] text-white rounded-lg font-bold hover:bg-[var(--bg-surface)]/80 transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-white" /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid - More Compact */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-2xl font-display font-bold">AI Tools</h2>
            <p className="text-sm text-[var(--text-dim)]">Select a tool to start your creative journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={feature.path}
                className="group block bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] overflow-hidden hover:border-[var(--accent-primary)] transition-all"
              >
                <div className="h-32 relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={cn("absolute inset-0 bg-gradient-to-t from-[var(--bg-panel)] to-transparent", feature.color)} />
                </div>
                <div className="p-5 space-y-3">
                  <div className="w-8 h-8 bg-[var(--bg-surface)] rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-xs text-[var(--text-dim)] line-clamp-2">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Mode Teaser - Compact */}
      <section className="bg-[var(--bg-surface)] rounded-2xl p-8 border border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-[10px] font-bold uppercase tracking-wider">
            Viral
          </div>
          <h2 className="text-3xl font-display font-bold">Story Mode</h2>
          <p className="text-[var(--text-dim)]">
            صرف ایک جملہ لکھیں اور AI آپ کے لیے پوری کہانی، مناظر، آواز اور لپ سنک کے ساتھ ویڈیو تیار کر دے گا۔
          </p>
        </div>
        <Link
          to="/story"
          className="whitespace-nowrap bg-white text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          Create Story <BookOpen className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
