import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ChevronDown, 
  Minimize2 
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickActions?: { label: string; route: string }[];
}

const QUICK_SUGGESTIONS = [
  { label: '🩺 Which doctor for chest pain?', prompt: 'Which specialist doctor should I consult for chest tightness or mild chest pain?' },
  { label: '📋 How to check my OPD queue token?', prompt: 'How do I check my live OPD queue status and current token number?' },
  { label: '🧪 Where is my CBC Lab Report?', prompt: 'Where can I download my latest blood test and CBC lab reports?' },
  { label: '💊 How to refill my medication?', prompt: 'How do I order a refill for my prescribed Amoxicillin & Lisinopril?' },
];

export default function AIChatbotWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { selectedHospital } = useHospital();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello Puja Sharma! 👋 I am your NIVORA AI Health & Hospital Assistant${selectedHospital ? ` for ${selectedHospital.name}` : ''}. How can I assist you with doctor booking, queue tracking, lab reports, or symptom triage today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Listen for custom event triggered from Upper Right-Hand buttons
  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-chatbot', handleCustomOpen);
    return () => window.removeEventListener('open-ai-chatbot', handleCustomOpen);
  }, []);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      let replyText = "I'm analyzing your request with NIVORA AI medical triage engine...";
      let actions: { label: string; route: string }[] = [];

      const lower = query.toLowerCase();

      if (lower.includes('chest pain') || lower.includes('heart') || lower.includes('cardio')) {
        replyText = `Based on your symptom description, I strongly recommend consulting a **Cardiologist**. Dr. Sarah Smith (MD, DM Cardiology) is currently available at ${selectedHospital?.name || 'Apollo Hospitals'} (OPD 304, 3rd Floor). If pain is severe or radiating, tap **Emergency SOS** immediately.`;
        actions = [
          { label: 'Book Dr. Sarah Smith (Cardiology)', route: '/patient/appointments' },
          { label: 'Trigger Emergency SOS', route: '/patient/sos' }
        ];
      } else if (lower.includes('queue') || lower.includes('token') || lower.includes('opd')) {
        replyText = `Your current active token at ${selectedHospital?.name || 'Apollo Hospitals'} is **#42** for Dr. Smith (Cardiology). Current token serving is **#38** (~12 mins estimated wait time).`;
        actions = [{ label: 'View Live OPD Queue', route: '/patient/queue' }];
      } else if (lower.includes('lab') || lower.includes('report') || lower.includes('cbc') || lower.includes('x-ray')) {
        replyText = `Your CBC Blood Report & Chest X-Ray are ready and verified by Dr. Sarah Smith. All parameters (Hemoglobin 13.8 g/dL, Platelets 250k) are within normal range.`;
        actions = [{ label: 'View Medical & Lab Reports', route: '/patient/records' }];
      } else if (lower.includes('refill') || lower.includes('medicine') || lower.includes('prescription')) {
        replyText = `You have 2 active prescriptions: **Lisinopril 10mg** (3 pills left) and **Metformin 500mg** (4 pills left). Free hospital pickup and ₹50 home delivery options are available.`;
        actions = [{ label: 'Order Medicine Refills', route: '/patient/pharmacy' }];
      } else {
        replyText = `NIVORA AI Assistant is active for **${selectedHospital?.name || 'Partner Hospital'}**. I can help you search specialist doctors, check real-time OPD token status, view verified lab reports, or connect with emergency services.`;
        actions = [
          { label: 'Find Doctor & Book', route: '/patient/appointments' },
          { label: 'View Live Queue', route: '/patient/queue' }
        ];
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: actions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleActionClick = (route: string) => {
    setIsOpen(false);
    navigate(route);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[540px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-zoom">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-hospital-700 via-hospital-800 to-indigo-900 p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-hospital-200 border border-white/20">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1.5">
              NIVORA AI Assistant
              <Sparkles size={14} className="text-amber-300" />
            </h3>
            <p className="text-[11px] text-hospital-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Active • {selectedHospital ? selectedHospital.name : 'Partner Network'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            title="Minimize"
          >
            <Minimize2 size={18} />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-gray-900/50 text-xs custom-scrollbar">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-hospital-600 text-white rounded-br-none shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700/80 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Quick Action Buttons attached to AI Message */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-700/60 flex flex-col gap-1.5">
                  {msg.quickActions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleActionClick(act.route)}
                      className="bg-hospital-50 dark:bg-hospital-900/40 text-hospital-700 dark:text-hospital-300 hover:bg-hospital-100 px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] flex items-center justify-between border border-hospital-200 dark:border-hospital-800 text-left w-full cursor-pointer"
                    >
                      <span>{act.label}</span>
                      <ChevronDown size={14} className="-rotate-90 text-hospital-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400 text-xs bg-white dark:bg-gray-800 p-3 rounded-2xl w-fit border border-gray-200 dark:border-gray-700">
            <Bot size={16} className="animate-spin text-hospital-500" />
            <span>NIVORA AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestion Chips */}
      <div className="px-3 py-2 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-800 flex gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
        {QUICK_SUGGESTIONS.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSend(item.prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-hospital-50 hover:text-hospital-600 text-[10px] font-medium text-gray-600 dark:text-gray-300 transition-all shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask NIVORA AI about symptoms, OPD tokens, lab reports..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:border-hospital-500 outline-none transition-all"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="bg-hospital-600 hover:bg-hospital-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white p-2.5 rounded-xl transition-all shadow-md shrink-0"
        >
          <Send size={16} />
        </button>
      </div>

    </div>
  );
}
