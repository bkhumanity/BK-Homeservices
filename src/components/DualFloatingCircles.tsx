import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { CONTRACTOR_INFO } from '../data/contractorData';

interface DualFloatingCirclesProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const DualFloatingCircles: React.FC<DualFloatingCirclesProps> = ({
  onToggleChat,
  isChatOpen,
}) => {
  return (
    <>
      {/* Bottom-Left: Small, matching circular dark navy button with sparkles/chat icon and live green dot */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={onToggleChat}
          className="relative w-13 h-13 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-slate-700/60 cursor-pointer"
          aria-label={isChatOpen ? 'Close chat assistant' : 'Open chat assistant'}
          title="Chat with BK Construction Assistant"
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
          
          {/* Live pulsing green dot */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
          </span>
        </button>
      </div>

      {/* Bottom-Right: Small, sleek, perfectly round green button with ONLY a phone/WhatsApp icon (no text label) */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
          className="relative w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-emerald-400/50 cursor-pointer group"
          aria-label={`Call Ben directly at ${CONTRACTOR_INFO.phoneDisplay}`}
          title={`Call or text Ben: ${CONTRACTOR_INFO.phoneDisplay}`}
        >
          <Phone className="w-5 h-5 fill-white text-white group-hover:rotate-12 transition-transform" />
          
          {/* Gentle pulse ring */}
          <span className="absolute -inset-1 rounded-full border border-emerald-500/40 animate-pulse pointer-events-none"></span>
        </a>
      </div>
    </>
  );
};
