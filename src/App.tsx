import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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

function Navbar({ onNavClick }: { onNavClick?: () => void }) {
  const location = useLocation();

  const navItems = [
    { name: 'Image', path: '/image', icon: Sparkles, title: 'AI Image' },
    { name: 'Video', path: '/video', icon: Video, title: 'AI Video' },
    { name: 'Avatar', path: '/avatar', icon: UserCircle, title: 'AI Avatar' },
    { name: 'Lip Sync', path: '/lipsync', icon: Mic2, title: 'Lip Sync' },
    { name: 'Story', path: '/story', icon: BookOpen, title: 'Story' },
  ];

  return (
    <nav className="h-full bg-[var(--bg-panel)] flex flex-col items-center py-5 gap-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onNavClick}
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  return (
    <Router>
      <div id="app-container" className="grid grid-cols-1 md:grid-cols-[70px_1fr_320px] grid-rows-[60px_1fr_auto] md:grid-rows-[60px_1fr_180px] min-h-screen md:h-screen md:overflow-hidden bg-[var(--bg-darkest)] text-[var(--text-main)] font-sans">
        {/* Header */}
        <header className="col-span-1 md:col-span-3 bg-[var(--bg-panel)] border-b border-[var(--border-color)] flex items-center justify-between px-5 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-[var(--bg-surface)] rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="text-lg md:text-xl font-black tracking-[2px] text-gradient">
              NOOR AI STUDIO
            </Link>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <span className="text-[11px] md:text-[13px] text-[var(--text-dim)] hidden sm:inline">Draft: Urdu Influencer Series v1.0</span>
            <button className="bg-[var(--accent-primary)] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md font-semibold text-[11px] md:text-[13px] hover:opacity-90 transition-opacity">
              Export
            </button>
            <button 
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              className="md:hidden p-2 hover:bg-[var(--bg-surface)] rounded-lg"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Sidebar - Mobile Overlay + Desktop Fixed */}
        <div className={cn(
          "fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )} onClick={() => setIsSidebarOpen(false)} />
        
        <aside className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-[70px] bg-[var(--bg-panel)] border-r border-[var(--border-color)] transition-transform md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Navbar onNavClick={() => setIsSidebarOpen(false)} />
        </aside>
        
        {/* Main Stage */}
        <main className="bg-black relative flex items-center justify-center overflow-auto h-full">
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

        {/* Right Inspector - Mobile Overlay + Desktop Fixed */}
        <div className={cn(
          "fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity",
          isInspectorOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )} onClick={() => setIsInspectorOpen(false)} />

        <aside className={cn(
          "fixed md:relative inset-y-0 right-0 z-50 w-[280px] md:w-auto bg-[var(--bg-panel)] border-l border-[var(--border-color)] p-5 flex flex-col gap-5 overflow-y-auto transition-transform md:translate-x-0",
          isInspectorOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between md:hidden mb-4">
            <span className="font-bold">Settings</span>
            <button onClick={() => setIsInspectorOpen(false)}><X className="w-5 h-5" /></button>
          </div>
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

        {/* Bottom Timeline - Hidden on mobile or simplified */}
        <footer className="col-span-1 md:col-start-2 md:col-end-3 bg-[var(--bg-panel)] border-t border-[var(--border-color)] p-3 md:p-4 flex flex-col gap-2 md:gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[9px] md:text-[11px] text-[var(--text-dim)] uppercase tracking-wider">Timeline (00:15 / 01:00)</span>
            <div className="flex gap-3 md:gap-4 text-[9px] md:text-[11px] text-[var(--text-dim)]">
              <span className="hidden sm:inline">Layers: 4</span>
              <span>1080p</span>
            </div>
          </div>
          <div className="h-8 md:h-10 bg-[var(--bg-surface)] rounded-md relative overflow-hidden flex">
            <div className="h-full bg-[var(--accent-primary)]/60 border-r-2 border-white flex items-center px-2 md:px-3 text-[9px] md:text-[10px] text-white" style={{ width: '30%' }}>Scene 1</div>
            <div className="h-full bg-[var(--accent-secondary)]/60 border-r-2 border-white flex items-center px-2 md:px-3 text-[9px] md:text-[10px] text-white" style={{ width: '25%' }}>Scene 2</div>
            <div className="h-full bg-[var(--accent-primary)]/60 border-r-2 border-white flex items-center px-2 md:px-3 text-[9px] md:text-[10px] text-white" style={{ width: '20%' }}>Scene 3</div>
          </div>
          <div className="h-8 md:h-10 bg-[var(--bg-surface)] rounded-md relative overflow-hidden opacity-60 hidden sm:block">
            <div className="h-full bg-green-500/60 flex items-center px-3 text-[10px] text-white" style={{ width: '55%' }}>Audio Track</div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
