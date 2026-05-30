import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { motion } from 'framer-motion';

interface HistoryItem {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface TerminalIntroProps {
  onComplete: () => void;
  isEmbedded?: boolean;
}

export const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete, isEmbedded = false }) => {
  const [bootStage, setBootStage] = useState<number>(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'success', text: 'Welcome to Soumya OS v7.4.2 (Production Build)' },
    { type: 'output', text: 'Type "help" to view list of available core commands.' },
  ]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Boot Loader Sequence (for non-embedded full screen loader)
  useEffect(() => {
    if (isEmbedded) return;

    const bootSequences = [
      'Kernel Initialization [v7.4.2] ... LOADED',
      'Memory Mapping [16GB Virtual] ... OK',
      'Angular/React Runtime Hybrid ... ACTIVE',
      'NgRx State Adapters ... ESTABLISHED',
      'SonarQube Security Gates ... VERIFIED',
      'PostgreSQL/MongoDB Pipeline ... SECURE',
      'Geographical Lock: Bhubaneswar, IN ... OK',
      'Optimizing High-Fidelity UI ... 100%',
      'Booting Soumya OS Graphical Shell ...',
    ];

    let timer: ReturnType<typeof setTimeout>;
    const loadLogs = (index: number) => {
      if (index < bootSequences.length) {
        setBootLogs((prev) => [...prev, `> ${bootSequences[index]}`]);
        setBootStage(index + 1);
        const delay = Math.random() * 200 + 50; 
        timer = setTimeout(() => loadLogs(index + 1), delay);
      } else {
        timer = setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    timer = setTimeout(() => loadLogs(0), 100);

    return () => clearTimeout(timer);
  }, [isEmbedded, onComplete]);

  // Scroll to bottom on logs or history change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bootLogs, history, bootStage]);

  // Matrix Digital Rain canvas animation
  useEffect(() => {
    if (!showMatrix) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 300);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}*#@$+%&';
    const charArr = chars.split('');
    const fontSize = 10;
    const columns = width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    let animationId: number;

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();
    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = 300;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [showMatrix]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdClean = inputVal.trim().toLowerCase();
    setInputVal('');
    if (!cmdClean) return;
    const newItems: HistoryItem[] = [{ type: 'input', text: `srd-OS$ ${inputVal}` }];
    switch (cmdClean) {
      case 'help':
        newItems.push({ type: 'success', text: 'Available Commands: about, skills, projects, contact, matrix, clear, exit' });
        break;
      case 'about':
        newItems.push({ type: 'output', text: `${personalInfo.name}\n${personalInfo.detailedAbout}` });
        break;
      case 'matrix':
        setShowMatrix((prev) => !prev);
        newItems.push({ type: 'success', text: 'Matrix mode toggled.' });
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        if (!isEmbedded) onComplete(); else setIsMinimized(true);
        break;
      default:
        newItems.push({ type: 'error', text: `Command not found: "${cmdClean}"` });
        break;
    }
    setHistory((prev) => [...prev, ...newItems]);
  };

  if (!isEmbedded) {
    return (
      <div className="fixed inset-0 bg-[#050505] text-[#00ff9d] font-mono flex flex-col justify-center items-center p-6 z-[9999] select-none cyber-scanlines">
        <div className="relative w-full max-w-2xl space-y-8 bg-black/40 p-12 rounded-[40px] border border-[#00ff9d]/20 shadow-[0_0_50px_rgba(0,255,157,0.05)] backdrop-blur-3xl overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#00ff9d]/5 blur-[120px] rounded-full animate-pulse" />
          <div className="text-center space-y-6 relative z-10">
            <pre className="text-[6px] leading-[7px] sm:text-[10px] sm:leading-none text-[#00ff9d] animate-pulse">
{`
   _____ ____  ____    ____  _____
  / ___/|  _ \\|  _ \\  / __ \\/ ___/
  \\__ \\ | |_) | | | |/ / / /\\__ \\ 
 ___/ / |  _ <| |_| / /_/ /___/ / 
/____/  |_| \\_\\____/\\____//____/  
`}
            </pre>
            <div className="space-y-1">
              <h1 className="text-xs font-black tracking-[0.5em] uppercase opacity-80">System Initialization</h1>
              <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Encrypted Kernel Build v7.4.2</p>
            </div>
          </div>
          <div className="space-y-2 relative z-10 max-h-[300px] overflow-y-auto custom-scrollbar">
            {bootLogs.map((log, index) => (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={index} className="flex items-center gap-4 py-0.5">
                <span className="text-[10px] opacity-30 font-black">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[11px] font-bold tracking-wide">{log}</span>
              </motion.div>
            ))}
            {bootStage < 9 && (
              <div className="flex items-center gap-4 py-0.5">
                <span className="text-[10px] opacity-30 font-black">--</span>
                <span className="text-[11px] font-bold tracking-wide animate-pulse">Running sequence...</span>
              </div>
            )}
          </div>
          <div className="relative z-10 w-full h-1 bg-[#00ff9d]/10 rounded-full overflow-hidden border border-[#00ff9d]/5">
            <motion.div className="h-full bg-[#00ff9d]" initial={{ width: 0 }} animate={{ width: `${(bootStage / 9) * 100}%` }} transition={{ duration: 0.3 }} style={{ boxShadow: '0 0 15px #00ff9d' }} />
          </div>
        </div>
        <button onClick={onComplete} className="mt-12 px-8 py-3 bg-transparent border border-[#00ff9d]/40 text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-500 rounded-full text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl group flex items-center gap-3 active:scale-95">
          <Play size={12} className="group-hover:translate-x-1 transition-transform" /> Skip Sequence
        </button>
      </div>
    );
  }

  return (
    <div className={`glass-panel overflow-hidden border w-full font-mono transition-all duration-300 ${isMinimized ? 'h-12' : 'h-96'}`} style={{ boxShadow: 'var(--theme-glow-style)' }}>
      <div className="bg-black/40 border-b border-border-custom px-4 py-3 flex justify-between items-center select-none text-xs">
        <div className="flex items-center gap-2 text-text-primary">
          <TerminalIcon size={14} className="text-accent-primary animate-pulse" />
          <span className="font-semibold text-[11px] uppercase tracking-wider opacity-80">developer@srd-OS: ~</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-accent-primary text-text-muted transition-colors">
            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
          <button onClick={() => setIsMinimized(true)} className="hover:text-red-500 text-text-muted transition-colors">
            <X size={12} />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div onClick={() => inputRef.current?.focus()} className="relative bg-black/90 p-4 h-[calc(100%-48px)] overflow-y-auto text-xs text-green-400 space-y-2 cursor-text">
          {showMatrix && <div className="absolute inset-0 pointer-events-none opacity-20"><canvas ref={matrixCanvasRef} className="w-full h-full" /></div>}
          <div className="relative z-10 space-y-1.5 leading-relaxed">
            {history.map((item, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {item.type === 'input' && <span className="text-[#3b82f6] font-bold">{item.text}</span>}
                {item.type === 'success' && <span className="text-[#8b5cf6]">{item.text}</span>}
                {item.type === 'error' && <span className="text-red-500 font-semibold">{item.text}</span>}
                {item.type === 'output' && <span className="text-gray-300">{item.text}</span>}
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center pt-1">
              <span className="text-[#3b82f6] font-bold mr-2">srd-OS$</span>
              <input ref={inputRef} type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0 p-0 font-mono text-xs" placeholder="Type 'help'..." autoComplete="off" spellCheck="false" />
            </form>
          </div>
          <div ref={logsEndRef} />
        </div>
      )}
    </div>
  );
};
