import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Video, 
  UserCircle, 
  Mic2, 
  BookOpen, 
  Home, 
  LayoutDashboard,
  Menu,
  X,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from './lib/utils';

// Pages (to be implemented)
import HomePage from './pages/HomePage';
import ImageStudio from './pages/ImageStudio';
import VideoStudio from './pages/VideoStudio';
import AvatarStudio from './pages/AvatarStudio';
import LipSyncStudio from './pages/LipSyncStudio';
import StoryStudio from './pages/StoryStudio';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Image', path: '/image', icon: Sparkles, title: 'AI Image' },
    { name: 'Video', path: '/video', icon: Video, title: 'AI Video' },
    { name: 'Avatar', path: '/avatar', icon: UserCircle, title: 'AI Avatar' },
    { name: 'Lip Sync', path: '/lipsync', icon: Mic2, title: 'Lip Sync' },
    { name: 'Story', path: '/story', icon: BookOpen, title: 'Story' },
  ];

  return (
    <nav className="grid-row-[2/4] bg-[var(--bg-panel)] border-r border-[var(--border-color)] flex flex-col items-center py-5 gap-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          title={item.title}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all border border-transparent",
            location.pathname === item.path 
              ? "border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10" 
              : "bg-[var(--bg-surface)] text-[var(--text-dim)] hover:text-white"
          )}
        >
          <item.icon className="w-5 h-5" />
        </Link>
      ))}
      <div className="mt-auto pb-5 opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
        <LayoutDashboard className="w-5 h-5" />
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div id="app-container" className="grid grid-cols-[70px_1fr_320px] grid-rows-[60px_1fr_180px] h-screen overflow-hidden bg-[var(--bg-darkest)] text-[var(--text-main)] font-sans">
        {/* Header */}
        <header className="col-span-3 bg-[var(--bg-panel)] border-bottom border-[var(--border-color)] flex items-center justify-between px-5">
          <Link to="/" className="text-xl font-black tracking-[2px] text-gradient">
            NOOR AI STUDIO
          </Link>
          <div className="flex items-center gap-5">
            <span className="text-[13px] text-[var(--text-dim)] hidden md:inline">Draft: Urdu Influencer Series v1.0</span>
            <button className="bg-[var(--accent-primary)] text-white px-4 py-2 rounded-md font-semibold text-[13px] hover:opacity-90 transition-opacity">
              Export Video
            </button>
          </div>
        </header>

        {/* Sidebar */}
        <Navbar />
        
        {/* Main Stage */}
        <main className="bg-black relative flex items-center justify-center overflow-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/image" element={<ImageStudio />} />
              <Route path="/video" element={<VideoStudio />} />
              <Route path="/avatar" element={<AvatarStudio />} />
              <Route path="/lipsync" element={<LipSyncStudio />} />
              <Route path="/story" element={<StoryStudio />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Right Inspector (Aside) */}
        <aside className="bg-[var(--bg-panel)] border-l border-[var(--border-color)] p-5 flex flex-col gap-5 overflow-y-auto">
          <div className="space-y-2">
            <div className="panel-title">Project Settings</div>
            <div className="prompt-box text-sm text-[var(--text-dim)]">
              Configure your AI generation parameters here.
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="panel-title">Global Styles</div>
            <div className="flex flex-wrap gap-2">
              <div className="pill active">Cinematic</div>
              <div className="pill">Realistic</div>
              <div className="pill">Anime</div>
            </div>
          </div>

          <div className="mt-auto">
            <button className="w-full bg-[var(--bg-surface)] border border-[var(--accent-primary)] text-[var(--text-main)] p-3 rounded-lg font-semibold hover:bg-[var(--accent-primary)]/10 transition-colors">
              ✨ Generate Scenes
            </button>
          </div>
        </aside>

        {/* Bottom Timeline (Footer) */}
        <footer className="col-start-2 col-end-3 bg-[var(--bg-panel)] border-t border-[var(--border-color)] p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-[var(--text-dim)] uppercase tracking-wider">Timeline (00:15 / 01:00)</span>
            <div className="flex gap-4 text-[11px] text-[var(--text-dim)]">
              <span>Layers: 4</span>
              <span>Resolution: 1080p</span>
            </div>
          </div>
          <div className="h-10 bg-[var(--bg-surface)] rounded-md relative overflow-hidden flex">
            <div className="h-full bg-[var(--accent-primary)]/60 border-r-2 border-white flex items-center px-3 text-[10px] text-white" style={{ width: '30%' }}>Scene 1</div>
            <div className="h-full bg-[var(--accent-secondary)]/60 border-r-2 border-white flex items-center px-3 text-[10px] text-white" style={{ width: '25%' }}>Scene 2</div>
            <div className="h-full bg-[var(--accent-primary)]/60 border-r-2 border-white flex items-center px-3 text-[10px] text-white" style={{ width: '20%' }}>Scene 3</div>
            <div className="absolute left-[45%] top-0 bottom-0 w-[2px] bg-white z-10" />
          </div>
          <div className="h-10 bg-[var(--bg-surface)] rounded-md relative overflow-hidden opacity-60">
            <div className="h-full bg-green-500/60 flex items-center px-3 text-[10px] text-white" style={{ width: '55%' }}>Audio Track</div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
