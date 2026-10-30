import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Phone, ShieldCheck, RefreshCw, User, Bot } from 'lucide-react';
import { CONTRACTOR_INFO } from '../data/contractorData';

interface ChatAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEstimate: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const ChatAssistantModal: React.FC<ChatAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenEstimate,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      sender: 'bot',
      text: 'Hello! You are warmly welcome to BK Construction. We are a licensed California contractor (CA Lic. #1139587) specializing in luxury kitchen remodels, bathroom renovations, room additions, and custom decks across Orange County. Would you like to ask any questions today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [hasInteractedInitial, setHasInteractedInitial] = useState(false);
  const [showStarterChips, setShowStarterChips] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages, isLoading, showStarterChips]);

  if (!isOpen) return null;

  const handleInitialChoice = (choice: 'yes' | 'no') => {
    setHasInteractedInitial(true);

    if (choice === 'yes') {
      const userMsg: Message = {
        id: `user_${Date.now()}`,
        sender: 'user',
        text: 'Yes, I have a question',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: 'Wonderful! What project or questions can we help you with today? You can choose a quick topic below or type your question:',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      setShowStarterChips(true);
    } else {
      const userMsg: Message = {
        id: `user_${Date.now()}`,
        sender: 'user',
        text: 'No, thank you',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: 'No problem at all! Feel free to look around our work. If you\'d like to schedule a free on-site estimate with Ben, you can call or text him directly at (714) 884-2905.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      setShowStarterChips(false);
    }
  };

  const handleChipClick = async (chipText: string) => {
    if (chipText.includes('Call Ben directly')) {
      window.location.href = `tel:${CONTRACTOR_INFO.phoneRaw}`;
      return;
    }

    setShowStarterChips(false);
    await sendMessage(chipText);
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend.trim();
    setInputValue('');

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: historyPayload,
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Ben is available directly to answer any detailed questions. Feel free to give him a call at (714) 884-2905!';

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: `We're here to help with your home remodel! Feel free to call Ben directly at (714) 884-2905 for immediate answers and free Orange County estimates.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'greeting_reset',
        sender: 'bot',
        text: 'Hello! You are warmly welcome to BK Construction. We are a licensed California contractor (CA Lic. #1139587) specializing in luxury kitchen remodels, bathroom renovations, room additions, and custom decks across Orange County. Would you like to ask any questions today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setHasInteractedInitial(false);
    setShowStarterChips(false);
  };

  return (
    <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[540px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
      
      {/* Header titled "Chat" */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-wide">Chat</h3>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-300">BK Construction · CA Lic. #1139587</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset conversation"
            aria-label="Reset chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 text-sm">
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs leading-relaxed text-[13px] ${
                message.sender === 'user'
                  ? 'bg-amber-500 text-white font-medium rounded-br-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
              }`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              <span
                className={`block text-[10px] mt-1 ${
                  message.sender === 'user' ? 'text-amber-100 text-right' : 'text-slate-400'
                }`}
              >
                {message.timestamp}
              </span>
            </div>

            {message.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {/* Initial Yes / No Choice Buttons */}
        {!hasInteractedInitial && messages.length === 1 && (
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleInitialChoice('yes')}
              className="w-full py-2.5 px-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Yes, I have a question</span>
            </button>
            <button
              onClick={() => handleInitialChoice('no')}
              className="w-full py-2 px-3.5 bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <span>No, thank you</span>
            </button>
          </div>
        )}

        {/* Starter Chips if Yes clicked */}
        {showStarterChips && (
          <div className="pt-2 space-y-1.5 animate-in fade-in duration-200">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
              Suggested Topics:
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                '🍳 Kitchen Remodel estimate',
                '🚿 Bathroom Renovation cost',
                '📐 Room Additions & Permits',
                '🔨 Custom Decks & Patios',
                '📞 Call Ben directly: (714) 884-2905',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className="text-left text-xs font-medium py-2 px-3 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-400 text-slate-800 rounded-lg border border-slate-200 shadow-2xs transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Bar inside Chat */}
      <div className="bg-slate-100/90 border-t border-slate-200 px-3 py-1.5 flex items-center justify-between text-xs">
        <a
          href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold"
        >
          <Phone className="w-3 h-3" />
          <span>Call Ben</span>
        </a>
        <button
          onClick={() => {
            onClose();
            onOpenEstimate();
          }}
          className="text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
        >
          Request Free Quote →
        </button>
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="p-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
