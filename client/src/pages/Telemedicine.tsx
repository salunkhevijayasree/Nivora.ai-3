import { useState } from 'react';
import { 
  HeartHandshake, 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Apple, 
  Activity, 
  Moon, 
  Sun, 
  Ban, 
  Lightbulb, 
  ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HealthTip {
  id: number;
  category: 'Hydration' | 'Infection Prevention' | 'Hygiene' | 'Diet & Nutrition' | 'Fitness & Rest';
  title: string;
  shortDesc: string;
  fullGuide: string;
  icon: any;
  color: string;
  badgeBg: string;
  recommendedTime: string;
}

const HEALTH_TIPS: HealthTip[] = [
  {
    id: 1,
    category: 'Hydration',
    title: 'Drink Warm / Hot Water Daily',
    shortDesc: 'Boil drinking water and consume 2-3 liters daily for optimal digestion and immune health.',
    fullGuide: 'Drinking warm water in the morning flushes out body toxins, aids gastrointestinal motility, relieves sore throats, and improves blood circulation. Add lemon or ginger for enhanced immunity.',
    icon: Droplets,
    color: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200',
    recommendedTime: 'Morning & After Meals'
  },
  {
    id: 2,
    category: 'Infection Prevention',
    title: 'Wear a Protective Mask Outdoors',
    shortDesc: 'Use N95 or 3-ply masks in crowded places, hospitals, or during air pollution spikes.',
    fullGuide: 'Masking prevents airborne transmission of viral respiratory infections, flu, and dust allergies. Ensure the mask fits snugly over your nose and mouth without side gaps.',
    icon: ShieldCheck,
    color: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200',
    recommendedTime: 'Crowded Areas & Hospitals'
  },
  {
    id: 3,
    category: 'Hygiene',
    title: 'Sanitize & Wash Hands Thoroughly',
    shortDesc: 'Scrub hands with soap and water for 20 seconds before eating and after returning home.',
    fullGuide: 'Hand hygiene kills 99.9% of disease-causing bacteria and viruses. Pay special attention to fingertips, under fingernails, and wrists. Carry alcohol-based sanitizer when traveling.',
    icon: Sparkles,
    color: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200',
    recommendedTime: 'Before Meals & Post Transit'
  },
  {
    id: 4,
    category: 'Diet & Nutrition',
    title: 'Immune-Boosting Nutritious Diet',
    shortDesc: 'Include turmeric milk, citrus fruits (Vitamin C), green leafy vegetables, and garlic.',
    fullGuide: 'A balanced diet rich in antioxidants, zinc, and Vitamin C protects white blood cells. Limit refined sugars, deep-fried fast foods, and carbonated beverages that trigger inflammation.',
    icon: Apple,
    color: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200',
    recommendedTime: 'Daily Meal Routine'
  },
  {
    id: 5,
    category: 'Fitness & Rest',
    title: '30-Minute Daily Physical Exercise',
    shortDesc: 'Brisk walking, light jogging, yoga, or joint stretching maintains cardiovascular fitness.',
    fullGuide: 'Regular moderate exercise lowers blood pressure, stabilizes blood glucose levels, boosts lung vital capacity, and releases endorphins for mental well-being.',
    icon: Activity,
    color: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200',
    recommendedTime: '6:30 AM or Evening'
  },
  {
    id: 6,
    category: 'Fitness & Rest',
    title: '7 to 8 Hours Restful Sleep',
    shortDesc: 'Maintain a consistent bedtime schedule to allow cellular repair and mental refresh.',
    fullGuide: 'Quality deep sleep strengthens antibodies, improves memory consolidation, and balances cortisol stress hormones. Turn off digital screens 30 minutes before sleep.',
    icon: Moon,
    color: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200',
    recommendedTime: '10:00 PM - 6:00 AM'
  },
  {
    id: 7,
    category: 'Hydration',
    title: 'Morning Sunlight & Vitamin D',
    shortDesc: 'Get 15-20 minutes of early morning sunlight for strong bones and natural immunity.',
    fullGuide: 'Sunlight triggers natural Vitamin D synthesis, essential for calcium absorption in bones and joints. Early morning sun (7:00 AM - 8:30 AM) is safe and beneficial.',
    icon: Sun,
    color: 'text-amber-500 dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200',
    recommendedTime: 'Early Morning (7-8 AM)'
  },
  {
    id: 8,
    category: 'Hygiene',
    title: 'Avoid Tobacco & Limit Excess Sugar',
    shortDesc: 'Protect lung capacity, prevent liver strain, and maintain steady blood sugar levels.',
    fullGuide: 'Avoid active and passive smoking to preserve pulmonary alveoli. Reducing added sugar prevents insulin resistance, obesity, and chronic metabolic disorders.',
    icon: Ban,
    color: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200',
    recommendedTime: 'Lifestyle Habit'
  }
];

const CATEGORIES = ['All', 'Hydration', 'Infection Prevention', 'Hygiene', 'Diet & Nutrition', 'Fitness & Rest'];

export default function Telemedicine() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(HEALTH_TIPS[0]);
  const [completedHabits, setCompletedHabits] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const filteredTips = activeCategory === 'All' 
    ? HEALTH_TIPS 
    : HEALTH_TIPS.filter(t => t.category === activeCategory);

  const toggleHabit = (id: number) => {
    setCompletedHabits(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-in pb-12">
      
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/patient')}
          className="text-xs font-bold text-hospital-600 hover:text-hospital-700 flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Hospital Services
        </button>

        <span className="text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          Aug 06, 2026 • Verified Medical Guidance
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-hospital-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden space-y-3">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <HeartHandshake size={16} /> Preventive Healthcare & Wellness Guide
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Daily Health & Immunity Tips</h1>
          <p className="text-emerald-100 max-w-xl text-xs sm:text-sm leading-relaxed">
            Practical daily habits, warm water benefits, infection prevention, mask guidelines, and nutritious routines for Renu Sharma and family.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      </div>

      {/* Daily Wellness Habit Tracker Banner */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-base">
            <Lightbulb size={20} className="text-amber-500 animate-pulse" /> My Daily Wellness Tracker
          </h2>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            {Object.values(completedHabits).filter(Boolean).length} / 4 Habits Done Today
          </span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 1, name: 'Drink 3L Warm Water', time: 'Hydration' },
            { id: 2, name: 'Wear Mask Outdoors', time: 'Protection' },
            { id: 3, name: 'Wash Hands (20 Sec)', time: 'Hygiene' },
            { id: 5, name: '30-Min Walk / Exercise', time: 'Fitness' },
          ].map(habit => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                completedHabits[habit.id]
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{habit.time}</span>
                <span className="font-bold text-xs">{habit.name}</span>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                completedHabits[habit.id] ? 'bg-emerald-600 text-white' : 'border-2 border-gray-300'
              }`}>
                {completedHabits[habit.id] && <CheckCircle2 size={16} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Health Tips Grid & Detail Panel */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Tips Cards List (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          {filteredTips.map(tip => {
            const Icon = tip.icon;
            const isSelected = selectedTip?.id === tip.id;
            return (
              <div
                key={tip.id}
                onClick={() => setSelectedTip(tip)}
                className={`bg-white dark:bg-gray-800 border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-950/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${tip.badgeBg}`}>
                  <Icon size={24} />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{tip.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {tip.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{tip.shortDesc}</p>
                  
                  <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 dark:border-gray-700/60">
                    <span>Timing: <strong>{tip.recommendedTime}</strong></span>
                    <span className="text-emerald-600 font-bold">Read Full Advice &rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tip Detail Focus Panel (5 cols) */}
        <div className="md:col-span-5">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm sticky top-20 space-y-4">
            {selectedTip ? (
              <>
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${selectedTip.badgeBg}`}>
                    <selectedTip.icon size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">{selectedTip.category}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{selectedTip.title}</h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Verified Medical Guidance</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    {selectedTip.fullGuide}
                  </p>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                  <strong className="block font-bold flex items-center gap-1">
                    <CheckCircle2 size={15} className="text-emerald-600" /> Key Recommendation
                  </strong>
                  <span>Recommended for daily compliance by Nivora Preventive Care Panel.</span>
                </div>
              </>
            ) : (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-gray-400 text-center p-4">
                <HeartHandshake size={48} className="mb-4 opacity-40 text-emerald-500" />
                <p className="font-medium text-sm text-gray-600 dark:text-gray-300">Select a health tip card</p>
                <p className="text-xs text-gray-400 mt-1">Click any health tip to view complete medical instructions & benefits.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
