import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play } from 'lucide-react';
import { personalInfo, skillCategories, suggestedProjects } from '../data/portfolioData';

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
      'Initializing Soumya-OS kernel loader v7.4.2...',
      'Mapping workspace memory nodes from /Users/srd/soumya-das-portfolio...',
      'Testing core frameworks: [Angular: ACTIVE] [React: ACTIVE] [NodeJS: STABLE]',
      'Loading NgRx state adaptors and modular micro-applications...',
      'Initializing SonarQube quality gates... [100% COVERAGE]',
      'Establishing connections to secure PostgreSQL and MongoDB databases...',
      'Geographical coordinates locked on Bhubaneswar, India.',
      'System status: FULLY SECURED & OPTIMIZED.',
      'Mounting developer profile dashboards...',
    ];

    let timer: any;
    const loadLogs = (index: number) => {
      if (index < bootSequences.length) {
        setBootLogs((prev) => [...prev, `[ OK ] ${bootSequences[index]}`]);
        setBootStage(index + 1);
        timer = setTimeout(() => loadLogs(index + 1), Math.random() * 400 + 200);
      } else {
        timer = setTimeout(() => {
          onComplete();
        }, 800);
      }
    };

    timer = setTimeout(() => loadLogs(0), 400);

    return () => clearTimeout(timer);
  }, [isEmbedded, onComplete]);

  // Scroll to bottom on logs or history change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bootLogs, history, bootStage]);

  // Focus terminal input
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  // 2. Matrix Digital Rain canvas animation
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

      ctx.fillStyle = '#0f0'; // Matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
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

  // 3. CLI Command Parser
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdClean = inputVal.trim().toLowerCase();
    setInputVal('');

    if (!cmdClean) return;

    // Echo original input
    const newItems: HistoryItem[] = [{ type: 'input', text: `srd-OS$ ${inputVal}` }];

    // Match command
    switch (cmdClean) {
      case 'help':
        newItems.push({
          type: 'success',
          text: 'Available Commands:\n  about     - Displays Soumya\'s professional overview\n  skills    - Shows technical expertise and ratings\n  projects  - Lists selected project highlights\n  contact   - Reveals communication channels\n  matrix    - Launches falling binary matrix rain\n  clear     - Clears the terminal screen\n  exit      - Closes the terminal dashboard',
        });
        break;
      case 'about':
        newItems.push({
          type: 'output',
          text: `${personalInfo.name} -- ${personalInfo.titles[0]}\n----------------------------------------\n${personalInfo.detailedAbout}\n\nExperience: ${personalInfo.stats[0].value} years\nCompleted Work: ${personalInfo.stats[1].value}`,
        });
        break;
      case 'skills':
        let skillStr = 'TECHNICAL SKILLS ARCHITECTURE:\n----------------------------------------\n';
        skillCategories.forEach((cat) => {
          skillStr += `\n[+] ${cat.title.toUpperCase()}\n`;
          cat.skills.forEach((sk) => {
            const barLength = Math.round(sk.level / 10);
            const bar = '█'.repeat(barLength) + '░'.repeat(10 - barLength);
            skillStr += `  ${sk.name.padEnd(20)} [${bar}] ${sk.level}%\n`;
          });
        });
        newItems.push({ type: 'output', text: skillStr });
        break;
      case 'projects':
        let projStr = 'PROJECT PORTFOLIO HIGHLIGHTS:\n----------------------------------------\n';
        suggestedProjects.forEach((p, idx) => {
          projStr += `\n${idx + 1}. ${p.title} (${p.category.toUpperCase()})\n`;
          projStr += `   Tech:  ${p.tech.join(', ')}\n`;
          projStr += `   Desc:  ${p.description}\n`;
          projStr += `   Link:  ${p.githubUrl}\n`;
        });
        newItems.push({ type: 'output', text: projStr });
        break;
      case 'contact':
        newItems.push({
          type: 'output',
          text: `CONTACT DEVELOEPR DIRECTLY:\n----------------------------------------\nEmail:    ${personalInfo.email}\nLocation: ${personalInfo.location}\nLinkedIn: ${personalInfo.linkedin}\nGitHub:   github.com/${personalInfo.github}`,
        });
        break;
      case 'matrix':
        setShowMatrix((prev) => !prev);
        newItems.push({
          type: 'success',
          text: showMatrix ? 'Deactivating Matrix Stream...' : 'Binary Matrix flow activated! (Type "matrix" again to exit digital stream)',
        });
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        if (!isEmbedded) {
          onComplete();
        } else {
          setIsMinimized(true);
        }
        break;
      default:
        // Try theme command
        if (cmdClean.startsWith('theme ')) {
          const targetTheme = cmdClean.replace('theme ', '').trim();
          const themesMap: Record<string, string> = {
            'dev': 'dark-dev',
            'ent': 'enterprise',
            'cyber': 'cyberpunk',
            'scan': 'scandinavian',
            'class': 'classical',
            'classic': 'classical'
          };
          if (themesMap[targetTheme]) {
            document.documentElement.setAttribute('data-theme', themesMap[targetTheme]);
            newItems.push({ type: 'success', text: `Global Theme shifted to "${themesMap[targetTheme]}".` });
          } else {
            newItems.push({ type: 'error', text: `Unknown theme code. Try: theme dev | ent | cyber | scan | classic` });
          }
        } else {
          newItems.push({
            type: 'error',
            text: `Command not found: "${cmdClean}". Type "help" to view core command tree.`,
          });
        }
        break;
    }

    setHistory((prev) => [...prev, ...newItems]);
  };

  // Render Full Screen Bootloader
  if (!isEmbedded) {
    return (
      <div className="fixed inset-0 bg-black text-[#00ff00] font-mono flex flex-col justify-between p-6 md:p-12 z-50 select-none cyber-scanlines">
        <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full space-y-2 text-xs md:text-sm">
          <div className="mb-4 text-center border-b border-[#00ff00]/20 pb-4">
            <pre className="hidden sm:block text-[7px] leading-[8px] md:text-xs text-[#00ff00] md:leading-none overflow-x-auto text-left md:text-center select-none">
{`
███████╗██████╗  ██████╗      ██████╗  ██████╗
██╔════╝██╔══██╗██╔════╝     ██╔═══██╗██╔════╝
███████╗██████╔╝██║  ███╗    ██║   ██║███████╗
╚════██║██╔══██╗██║   ██║    ██║   ██║╚════██║
███████║██║  ██║╚██████╔╝    ╚██████╔╝███████║
╚══════╝╚═╝  ╚═╝ ╚═════╝      ╚═════╝ ╚══════╝
`}
            </pre>
            <div className="sm:hidden text-center text-xs font-bold tracking-widest text-[#00ff00] py-4 animate-pulse uppercase">
              [ SRD-OS SYSTEM INITIALIZATION ]
            </div>
            <p className="mt-2 text-[10px] sm:text-xs md:text-sm text-[#00ff00]/60">Soumya OS v7.4.2 Kernel Bootloader</p>
          </div>

          <div className="space-y-1">
            {bootLogs.map((log, index) => (
              <div key={index} className="flex">
                <span className="text-[#00ff00]/50 mr-2">{index + 1}.</span>
                <span>{log}</span>
              </div>
            ))}
            {bootStage < 9 && (
              <div className="flex items-center text-[#00ff00]/90">
                <span className="animate-pulse mr-2">█</span>
                <span className="text-xs">Processing node initialization...</span>
              </div>
            )}
          </div>
          <div ref={logsEndRef} />
        </div>

        <div className="mt-6 flex justify-between items-center max-w-4xl mx-auto w-full border-t border-[#00ff00]/20 pt-6">
          <div className="text-xs text-[#00ff00]/40">
            System time: {new Date().toLocaleTimeString()}
          </div>
          <button
            onClick={onComplete}
            className="px-4 py-2 border border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors duration-200 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold"
          >
            <Play size={12} /> Skip and Enter Portfolio
          </button>
        </div>
      </div>
    );
  }

  // Render Embedded Collapsible Widget
  return (
    <div
      className={`glass-panel overflow-hidden border w-full font-mono transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-96'
      }`}
      style={{
        boxShadow: 'var(--theme-glow-style)',
      }}
    >
      {/* Terminal Title Bar */}
      <div className="bg-black/40 border-b border-border-custom px-4 py-3 flex justify-between items-center select-none text-xs">
        <div className="flex items-center gap-2 text-text-primary">
          <TerminalIcon size={14} className="text-accent-primary animate-pulse" />
          <span className="font-semibold text-[11px] uppercase tracking-wider opacity-80">developer@srd-OS: ~</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:text-accent-primary text-text-muted transition-colors"
          >
            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:text-red-500 text-text-muted transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Terminal Content Pane */}
      {!isMinimized && (
        <div
          onClick={focusInput}
          className="relative bg-black/90 p-4 h-[calc(100%-48px)] overflow-y-auto text-xs text-green-400 space-y-2 cursor-text"
        >
          {showMatrix && (
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <canvas ref={matrixCanvasRef} className="w-full h-full" />
            </div>
          )}

          <div className="relative z-10 space-y-1.5 leading-relaxed">
            {history.map((item, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {item.type === 'input' && (
                  <span className="text-[#3b82f6] font-bold">{item.text}</span>
                )}
                {item.type === 'success' && (
                  <span className="text-[#8b5cf6]">{item.text}</span>
                )}
                {item.type === 'error' && (
                  <span className="text-red-500 font-semibold">{item.text}</span>
                )}
                {item.type === 'output' && (
                  <span className="text-gray-300">{item.text}</span>
                )}
              </div>
            ))}

            {/* Input Form */}
            <form onSubmit={handleCommand} className="flex items-center pt-1">
              <span className="text-[#3b82f6] font-bold mr-2">srd-OS$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0 p-0 font-mono text-xs"
                placeholder="Type 'help'..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
          <div ref={logsEndRef} />
        </div>
      )}
    </div>
  );
};
