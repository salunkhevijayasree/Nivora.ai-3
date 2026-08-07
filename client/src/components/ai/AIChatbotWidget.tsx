import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ChevronDown, 
  Minimize2,
  Search,
  MessageSquare
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { useAuth } from '../../context/AuthContext';

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
  { label: '🥗 Recommend a healthy diet plan', prompt: 'Can you recommend a healthy heart & diabetes diet meal plan?' },
  { label: '🗺️ How to reach OPD 304 in hospital?', prompt: 'How do I navigate to OPD Room 304 on 3rd Floor using the campus map?' }
];

export default function AIChatbotWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { selectedHospital } = useHospital();
  const { activeProfile } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Hello ${activeProfile?.name || 'Puja Sharma'}! 👋 I am your NIVORA AI Health & Hospital Assistant${selectedHospital ? ` for ${selectedHospital.name}` : ''}. Ask me any medical or hospital question, or use the search bar above to look up topics!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [activeProfile, selectedHospital]);

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

    // AI Medical Triage Response Engine
    setTimeout(() => {
      let replyText = "I'm analyzing your request with NIVORA AI medical triage engine...";
      let actions: { label: string; route: string }[] = [];

      const lower = query.toLowerCase();

      if (lower.includes('chest pain') || lower.includes('heart') || lower.includes('cardio') || lower.includes('angina')) {
        replyText = `Based on your symptom description, I strongly recommend consulting a **Cardiologist**. Dr. Sarah Smith (MD, DM Cardiology) is currently available at ${selectedHospital?.name || 'Apollo Hospitals'} (OPD 304, 3rd Floor). If pain is severe or radiating, tap **Emergency SOS** immediately.`;
        actions = [
          { label: 'Book Dr. Sarah Smith (Cardiology)', route: '/patient/appointments' },
          { label: 'Trigger Emergency SOS', route: '/patient/sos' }
        ];
      } else if (lower.includes('queue') || lower.includes('token') || lower.includes('opd') || lower.includes('wait')) {
        replyText = `Your current active token at ${selectedHospital?.name || 'Apollo Hospitals'} for ${activeProfile.name} is **#42** for Dr. Smith (Cardiology). Current token serving is **#38** (~12 mins estimated wait time).`;
        actions = [{ label: 'View Live OPD Queue', route: '/patient/queue' }];
      } else if (lower.includes('lab') || lower.includes('report') || lower.includes('cbc') || lower.includes('x-ray') || lower.includes('blood test')) {
        replyText = `Your CBC Blood Report & Chest X-Ray are ready and verified by Dr. Sarah Smith. All parameters (Hemoglobin 13.8 g/dL, Platelets 250k) are within normal range.`;
        actions = [{ label: 'View Medical & Lab Reports', route: '/patient/records' }];
      } else if (lower.includes('refill') || lower.includes('medicine') || lower.includes('prescription') || lower.includes('pill')) {
        replyText = `You have 2 active prescriptions: **Lisinopril 10mg** (3 pills left) and **Metformin 500mg** (4 pills left). Free hospital pickup and ₹50 home delivery options are available.`;
        actions = [{ label: 'Order Medicine Refills', route: '/patient/pharmacy' }];
      } else if (lower.includes('diet') || lower.includes('food') || lower.includes('meal') || lower.includes('nutrition') || lower.includes('health tip')) {
        replyText = `Here is your customized health & nutrition guide:\n• Drink 3L water daily.\n• Low Sodium & Low Glycemic Index diet.\n• 30 mins morning brisk walking.\nView our complete Daily Health Tips & Healthy Meal Plans portal below.`;
        actions = [{ label: 'View Daily Health Tips & Meal Plans', route: '/patient/telemedicine' }];
      } else if (lower.includes('map') || lower.includes('direction') || lower.includes('floor') || lower.includes('room') || lower.includes('navigate')) {
        replyText = `OPD Room 304 is located on 3rd Floor, Tower B at ${selectedHospital?.name || 'Apollo Hospitals'}. Elevators are available directly near Central Lobby.`;
        actions = [{ label: 'Open Hospital Campus Map', route: '/patient/map' }];
      } else {
        replyText = `NIVORA AI Assistant is connected for **${selectedHospital?.name || 'Partner Hospital Network'}**. I can help you search specialist doctors, check real-time OPD token status, view verified lab reports, or answer any medical symptom questions.`;
        actions = [
          { label: 'Find Doctor & Book', route: '/patient/appointments' },
          { label: 'View Live Queue', route: '/patient/queue' },
          { label: 'View Daily Health Tips', route: '/patient/telemedicine' }
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
    }, 900);
  };

  const handleActionClick = (route: string) => {
    setIsOpen(false);
    navigate(route);
  };

  // Filtered suggestions based on Search Box
  const filteredSuggestions = QUICK_SUGGESTIONS.filter(s => 
    s.label.toLowerCase().includes(searchFilter.toLowerCase()) || 
    s.prompt.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Filtered message history based on Search Box
  const filteredMessages = messages.filter(m => 
    !searchFilter.trim() || m.text.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[580px] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-zoom backdrop-blur-xl">
      
      {/* AI Chat Header */}
      <div className="bg-gradient-to-r from-hospital-700 via-hospital-800 to-indigo-900 p-4 text-white flex items-center justify-between shadow-md border-b border-hospital-600/30">
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

      {/* Top Search Box inside AI Chatbot */}
      <div className="p-3 bg-slate-800/90 border-b border-slate-700/80">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search topics (e.g. chest pain, OPD queue, lab reports)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-hospital-500 outline-none transition-all font-medium"
          />
          {searchFilter && (
            <button 
              onClick={() => setSearchFilter('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/90 text-xs custom-scrollbar">
        {filteredMessages.length === 0 ? (
          <div className="text-center text-slate-400 py-8 space-y-2">
            <MessageSquare size={32} className="mx-auto text-slate-500" />
            <p className="font-semibold text-xs text-slate-300">No matching search results found.</p>
            <p className="text-[11px] text-slate-400">Type any question below or click clear search to ask NIVORA AI!</p>
          </div>
        ) : (
          filteredMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-hospital-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Quick Action Buttons attached to AI Message */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-col gap-1.5">
                    {msg.quickActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act.route)}
                        className="bg-slate-900/80 text-hospital-300 hover:bg-slate-900 px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] flex items-center justify-between border border-slate-700 text-left w-full cursor-pointer"
                      >
                        <span>{act.label}</span>
                        <ChevronDown size={14} className="-rotate-90 text-hospital-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-300 text-xs bg-slate-800 p-3 rounded-2xl w-fit border border-slate-700">
            <Bot size={16} className="animate-spin text-hospital-400" />
            <span>NIVORA AI is thinking & retrieving medical answers...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestion Chips */}
      <div className="px-3 py-2 bg-slate-800 border-t border-slate-700 flex gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
        {filteredSuggestions.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSend(item.prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-hospital-600 hover:text-white text-[10px] font-medium text-slate-300 border border-slate-700 transition-all shrink-0 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Interactive AI Chat Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask NIVORA AI any medical question or symptom..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-800 text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:border-hospital-500 outline-none transition-all font-medium"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="bg-hospital-600 hover:bg-hospital-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700 text-white p-2.5 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
        >
          <Send size={16} />
        </button>
      </div>

    </div>
  );
}
