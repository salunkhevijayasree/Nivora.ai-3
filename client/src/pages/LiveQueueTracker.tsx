import React, { useState, useEffect } from 'react';
import { Clock, Users, BellRing, MapPin } from 'lucide-react';

export default function LiveQueueTracker() {
  const [tokenNumber] = useState(42);
  const [currentToken, setCurrentToken] = useState(38);
  const [waitTime, setWaitTime] = useState(25); // minutes

  // Simulate queue moving
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentToken(prev => {
        if (prev < tokenNumber) {
          setWaitTime(t => Math.max(0, t - 5));
          return prev + 1;
        }
        return prev;
      });
    }, 15000); // moves every 15s for demo

    return () => clearInterval(timer);
  }, [tokenNumber]);

  const progress = ((currentToken) / tokenNumber) * 100;
  const isAlmostTurn = tokenNumber - currentToken <= 2;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-zoom">
      
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Queue Status</h1>
        <p className="text-gray-500">Dr. Sarah Smith - Cardiology Dept</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        {/* Animated Background Ring */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
          <div 
            className="h-full bg-hospital-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="96" cy="96" r="88"
                className="stroke-gray-100 dark:stroke-gray-700 fill-none"
                strokeWidth="12"
              />
              <circle
                cx="96" cy="96" r="88"
                className="stroke-hospital-500 fill-none transition-all duration-1000 ease-out"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Your Token</p>
              <p className="text-5xl font-black text-gray-900 dark:text-white">#{tokenNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-4 mt-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 text-center">
              <Users className="mx-auto text-hospital-500 mb-2" size={24} />
              <p className="text-xs font-medium text-gray-500 mb-1">Current Token</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">#{currentToken}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 text-center">
              <Clock className="mx-auto text-amber-500 mb-2" size={24} />
              <p className="text-xs font-medium text-gray-500 mb-1">Est. Wait Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{waitTime} <span className="text-sm">min</span></p>
            </div>
          </div>

        </div>

        {isAlmostTurn && (
          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
            <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full animate-bounce">
              <BellRing className="text-amber-600 dark:text-amber-400" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-300">Please proceed to OPD 3!</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400/80 mt-1">It's almost your turn. Please wait near the consultation room.</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 py-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <MapPin size={16} className="text-hospital-500"/>
        Room 304, Cardiology Wing, 3rd Floor
      </div>

    </div>
  );
}
