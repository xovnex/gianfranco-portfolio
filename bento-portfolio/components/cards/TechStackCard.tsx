import React from 'react';
import { Terminal, Database, Code2, Brain, Cpu, Layout, Server } from 'lucide-react';

const TechIcon: React.FC<{ icon: React.ReactNode; label: string; hoverColor: string }> = ({ icon, label, hoverColor }) => (
  <div 
    className="group/tech flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-card-hover border border-border/50 shrink-0 shadow-sm cursor-default transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-[var(--hover-color)]"
    style={{ ['--hover-color' as string]: hoverColor.startsWith('var(') ? hoverColor : hoverColor }}
  >
    <span className="text-text-muted transition-colors duration-300 group-hover/tech:text-[var(--hover-color)] [&>svg]:w-[14px] [&>svg]:h-[14px] sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]">
      {icon}
    </span>
    <span className="text-[10px] sm:text-xs font-bold text-text-main whitespace-nowrap transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">
      {label}
    </span>
  </div>
);

export const TechStackContent: React.FC = () => {
  const row1 = [
    { icon: <Code2 size={18} />, label: "React", hoverColor: "#61DAFB" },
    { icon: <Cpu size={18} />, label: "Vite", hoverColor: "#646CFF" },
    { icon: <Terminal size={18} />, label: "Python", hoverColor: "#3776AB" },
    { icon: <Server size={18} />, label: "FastAPI", hoverColor: "#009688" },
    { icon: <Database size={18} />, label: "SQLAlchemy", hoverColor: "#D71F00" },
    { icon: <Layout size={18} />, label: "Git", hoverColor: "#F05032" },
  ];

  const row2 = [
    { icon: <Brain size={18} />, label: "scikit-learn", hoverColor: "#F7931E" },
    { icon: <Code2 size={18} />, label: "NumPy", hoverColor: "#4DABCF" },
    { icon: <Database size={18} />, label: "NetworkX", hoverColor: "#11557C" },
    { icon: <Terminal size={18} />, label: "pytest", hoverColor: "#0A9EDC" },
    { icon: <Cpu size={18} />, label: "GitHub Actions", hoverColor: "#2088FF" },
    { icon: <Server size={18} />, label: "Vercel", hoverColor: "#999999" },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full h-full relative overflow-hidden mask-linear-fade py-1 sm:py-2">
      <div className="flex flex-col gap-2 sm:gap-3 w-[108%] -rotate-[3deg] scale-[1.02] sm:scale-105">
        <div className="flex gap-2 sm:gap-4 overflow-x-hidden overflow-y-visible w-full py-0.5">
          <div className="flex shrink-0 animate-marquee items-center gap-2 sm:gap-4" style={{ animationDuration: '32s' }}>
            {row1.map((item, i) => <TechIcon key={`r1-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-2 sm:gap-4" style={{ animationDuration: '32s' }}>
            {row1.map((item, i) => <TechIcon key={`r1-d-${i}`} {...item} />)}
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 overflow-x-hidden overflow-y-visible w-full py-0.5">
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-2 sm:gap-4" style={{ animationDuration: '38s' }}>
            {row2.map((item, i) => <TechIcon key={`r2-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-2 sm:gap-4" style={{ animationDuration: '38s' }}>
            {row2.map((item, i) => <TechIcon key={`r2-d-${i}`} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
