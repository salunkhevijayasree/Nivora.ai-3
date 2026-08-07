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
  MessageSquare,
  RefreshCw
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
  { label: '🤒 Remedy for fever & headache', prompt: 'What are the first aid remedies for high fever and headache?' },
  { label: '📋 How to check my OPD queue token?', prompt: 'How do I check my live OPD queue status and current token number?' },
  { label: '🧪 Where is my CBC Lab Report?', prompt: 'Where can I download my latest blood test and CBC lab reports?' },
  { label: '💊 How to refill my medication?', prompt: 'How do I order a refill for my prescribed Amoxicillin & Lisinopril?' },
  { label: '🥗 Recommend a healthy diet plan', prompt: 'Can you recommend a healthy heart & diabetes diet meal plan?' },
  { label: '💡 What is NIVORA AI?', prompt: 'What is NIVORA AI and how does it automate hospital workflow?' }
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
        text: `Hello ${activeProfile?.name || 'Puja Sharma'}! 👋 I am NIVORA AI, your intelligent health & general assistant (powered like Gemini). You can ask me ANY question — medical symptoms, hospital OPD tokens, lab reports, general science, diet, or general knowledge!`,
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

  // Gemini-like Intelligent Response Generator
  const generateGeminiAIResponse = (query: string) => {
    const lower = query.toLowerCase().trim();
    const patientName = activeProfile?.name || 'Puja Sharma';
    const hospitalName = selectedHospital?.name || 'Apollo Hospitals';

    let replyText = "";
    let actions: { label: string; route: string }[] = [];

    // 1. Greetings & Chit-chat
    if (lower.startsWith('hi') || lower.startsWith('hello') || lower.startsWith('hey') || lower.includes('good morning') || lower.includes('good evening') || lower.includes('who are you') || lower.includes('what is your name')) {
      replyText = `Hello **${patientName}**! 👋 I am **NIVORA AI**, your intelligent virtual assistant.\n\nI can help you with:\n• **Medical Symptoms & Doctor Recommendations**\n• **Live OPD Queue Tokens & Appointments**\n• **Lab Test Reports & Prescriptions**\n• **Diet, Fitness & General Science Questions**\n\nWhat would you like to ask or explore today?`;
      actions = [
        { label: 'Book Specialist Doctor', route: '/patient/appointments' },
        { label: 'Check Live OPD Queue', route: '/patient/queue' },
        { label: 'Daily Health Tips & Diets', route: '/patient/telemedicine' }
      ];
    }
    // 2. Chest Pain / Cardiac Emergency
    else if (lower.includes('chest pain') || lower.includes('heart') || lower.includes('cardio') || lower.includes('angina') || lower.includes('heart attack')) {
      replyText = `⚠️ **Cardiology Triage Alert for ${patientName}**:\n\nBased on your prompt, chest tightness or pain should be evaluated immediately.\n\n• **Recommended Specialist**: Dr. Sarah Smith (MD, DM Cardiology) at **${hospitalName}** (OPD 304, 3rd Floor).\n• **Emergency Action**: If pain is sharp, radiating to arm/jaw, or accompanied by sweating, trigger **Emergency SOS** immediately.`;
      actions = [
        { label: 'Book Dr. Sarah Smith (Cardiology)', route: '/patient/appointments' },
        { label: 'Trigger Emergency SOS (Immediate)', route: '/patient/sos' }
      ];
    }
    // 3. Fever, Flu, Cough, Cold, Covid, Virus
    else if (lower.includes('fever') || lower.includes('cough') || lower.includes('cold') || lower.includes('flu') || lower.includes('temperature') || lower.includes('chills')) {
      replyText = `🌡️ **Fever & Viral Care Guidance**:\n\n• **Immediate Self-Care**: Rest, drink electrolytes, and monitor body temperature.\n• **When to Consult**: If fever rises above 101°F or lasts >48 hours.\n• **Recommended Specialist**: General Medicine or Pulmonology (Dr. Vikram Patel, OPD 405).\n• **OPD Token**: Available for same-day General Medicine consultation at **${hospitalName}**.`;
      actions = [
        { label: 'Book Doctor Appointment', route: '/patient/appointments' },
        { label: 'View OPD Queue Status', route: '/patient/queue' }
      ];
    }
    // 4. Headache / Migraine
    else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('head pain')) {
      replyText = `🧠 **Headache & Migraine Assessment**:\n\n1. Rest in a dark, quiet room and stay hydrated.\n2. Limit screen brightness.\n3. **Recommended Specialist**: Dr. James Wilson (MD, DM Neurology, OPD 412).\n4. Consult urgently if accompanied by blurry vision or numbness.`;
      actions = [
        { label: 'Book Dr. James Wilson (Neurology)', route: '/patient/appointments' }
      ];
    }
    // 5. Stomach Ache / Acidity / Digestion / Vomiting
    else if (lower.includes('stomach') || lower.includes('acidity') || lower.includes('vomit') || lower.includes('gas') || lower.includes('diarrhea') || lower.includes('gut')) {
      replyText = `🤢 **Gastrointestinal & Acidity Care**:\n\n1. Drink warm water or ORS. Avoid spicy, fried, or caffeinated items.\n2. Eat light meals (banana, rice, toast).\n3. **Recommended Specialist**: Dr. Rajesh Gupta (DM Gastroenterology, OPD 310) at **${hospitalName}**.`;
      actions = [
        { label: 'Book Dr. Rajesh Gupta (Gastroenterology)', route: '/patient/appointments' }
      ];
    }
    // 6. Queue / Token / OPD Wait Time
    else if (lower.includes('queue') || lower.includes('token') || lower.includes('opd') || lower.includes('wait time') || lower.includes('number')) {
      replyText = `📋 **Live OPD Queue Status for ${patientName}**:\n\n• **Selected Hospital**: ${hospitalName}\n• **Active OPD Token**: **#42** (Dr. Sarah Smith - Cardiology)\n• **Current Token Serving**: **#38**\n• **Estimated Wait Time**: ~12 minutes (4 patients ahead).`;
      actions = [{ label: 'Open Live Queue Tracker', route: '/patient/queue' }];
    }
    // 7. Lab Report / Blood Test / CBC / X-Ray
    else if (lower.includes('lab') || lower.includes('report') || lower.includes('cbc') || lower.includes('blood') || lower.includes('test') || lower.includes('x-ray')) {
      replyText = `🧪 **Medical & Lab Reports Update**:\n\n• **Latest Verified Report**: Complete Blood Count (CBC) & Chest X-Ray.\n• **Verified By**: Dr. Sarah Smith\n• **Status**: All parameters (Hemoglobin 13.8 g/dL, WBC 7,200/mcL) are within normal range.\n• You can download the official PDF from Medical Records.`;
      actions = [{ label: 'Download Lab Reports PDF', route: '/patient/records' }];
    }
    // 8. Pharmacy / Medication / Refill / Prescription
    else if (lower.includes('pharmacy') || lower.includes('medicine') || lower.includes('refill') || lower.includes('prescription') || lower.includes('pill') || lower.includes('drug')) {
      replyText = `💊 **Prescription & Pharmacy Status**:\n\n• **Active Prescriptions**: Lisinopril 10mg & Metformin 500mg.\n• **Refill Status**: 3 days supply remaining.\n• **Delivery Options**: Free Hospital Counter Pickup or ₹50 Doorstep Express Delivery.`;
      actions = [{ label: 'Order Prescription Refill', route: '/patient/pharmacy' }];
    }
    // 9. Diet / Nutrition / Weight Loss / Meal Plan
    else if (lower.includes('diet') || lower.includes('food') || lower.includes('meal') || lower.includes('nutrition') || lower.includes('calorie') || lower.includes('weight')) {
      replyText = `🥗 **Customized Nutrition & Diet Plan**:\n\n• **Morning**: Warm lemon water + 5 soaked almonds.\n• **Breakfast**: Oats porridge / Vegetable Dosa with sambar.\n• **Lunch**: Whole wheat roti, dal, green leafy salad, curd.\n• **Dinner**: Light soup + grilled veggies / paneer (before 8 PM).\nExplore full meal recipes & health tips in our Telemedicine portal below!`;
      actions = [{ label: 'View Health Tips & Meal Plans', route: '/patient/telemedicine' }];
    }
    // 10. Map / Directions / Location / Floor / Room
    else if (lower.includes('map') || lower.includes('direction') || lower.includes('location') || lower.includes('floor') || lower.includes('room') || lower.includes('way')) {
      replyText = `🗺️ **Hospital Campus Navigation**:\n\n• **Location**: ${hospitalName}\n• **Cardiology OPD**: 3rd Floor, Room 304 (Tower B)\n• **Radiology & Lab**: 1st Floor, Wing A\n• **Pharmacy**: Ground Floor Central Lobby.`;
      actions = [{ label: 'View Interactive Campus Map', route: '/patient/map' }];
    }
    // 11. What is NIVORA AI?
    else if (lower.includes('nivora') || lower.includes('what is this') || lower.includes('about')) {
      replyText = `✨ **About NIVORA AI**:\n\nNIVORA AI is a state-of-the-art AI-Powered Smart Hospital Workflow & Patient Portal platform.\n\nIt connects **Partner Hospitals**, **ABDM/ABHA Digital Health Records**, **Live Queue Tracking**, **AI Symptom Triage**, and **Telemedicine** into one seamless experience.`;
    }
    // 12. General Knowledge / Gemini Fallback Response (Science, Math, Coding, Advice)
    else {
      replyText = `🤖 **Gemini AI Response to "${query}"**:\n\nHere is what I found for your request:\n\n• **Overview**: I have analyzed your question regarding *${query}*.\n• **Key Takeaway**: NIVORA AI operates as a full-spectrum conversational AI assistant. For specific hospital workflows, you can manage appointments, queue tokens, lab reports, and prescriptions.\n• **Health Advice**: If this question relates to a medical symptom or discomfort, feel free to share details so I can recommend the right specialist doctor at **${hospitalName}**!\n\nHow else can I assist you today?`;
      actions = [
        { label: 'Book Specialist Doctor', route: '/patient/appointments' },
        { label: 'Check Live OPD Queue', route: '/patient/queue' },
        { label: 'Daily Health Tips', route: '/patient/telemedicine' }
      ];
    }

    return { replyText, actions };
  };

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

    // AI Medical & General Gemini Triage Response Engine
    setTimeout(() => {
      const { replyText, actions } = generateGeminiAIResponse(query);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: actions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
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
              <Sparkles size={14} className="text-amber-300 animate-pulse" />
            </h3>
            <p className="text-[11px] text-hospital-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Gemini AI Active • {selectedHospital ? selectedHospital.name : 'Partner Network'}
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
            placeholder="Search topics (e.g. fever, chest pain, OPD token, diet)..."
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
            <p className="text-[11px] text-slate-400">Type any question below or click clear search to ask Gemini AI!</p>
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
                    ? 'bg-hospital-600 text-white rounded-br-none shadow-sm font-medium'
                    : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-bl-none shadow-sm font-medium'
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
                        className="bg-slate-900/90 text-hospital-300 hover:bg-slate-900 hover:text-white px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] flex items-center justify-between border border-slate-700 text-left w-full cursor-pointer"
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
            <RefreshCw size={15} className="animate-spin text-hospital-400" />
            <span>Gemini AI is generating answer...</span>
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
          placeholder="Ask Gemini AI anything (symptoms, diet, science, queue)..."
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
