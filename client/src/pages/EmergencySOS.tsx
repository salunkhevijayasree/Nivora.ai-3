import React, { useState } from 'react';
import { PhoneCall, MapPin, Ambulance, TriangleAlert, LocateFixed } from 'lucide-react';
import clsx from 'clsx';

export default function EmergencySOS() {
  const [isSosActive, setIsSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const triggerSOS = () => {
    setIsSosActive(true);
    let count = 5;
    setCountdown(count);
    
    const id = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(id);
        // Execute actual SOS logic here (API call, location share)
      }
    }, 1000);
    setTimerId(id);
  };

  const cancelSOS = () => {
    if (timerId) clearInterval(timerId);
    setIsSosActive(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-zoom pt-8">
      
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-black text-red-600 dark:text-red-500">Emergency SOS</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Use this only in case of a medical emergency. This will immediately dispatch an ambulance to your location.</p>
      </div>

      <div className="flex justify-center mb-12">
        <button 
          onClick={triggerSOS}
          disabled={isSosActive}
          className={clsx(
            "relative w-64 h-64 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl",
            isSosActive 
              ? "bg-red-700 text-white scale-95"
              : "bg-red-600 hover:bg-red-700 text-white hover:scale-105 active:scale-95 shadow-red-500/50"
          )}
        >
          {/* Pulse effect */}
          {!isSosActive && (
            <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-20"></div>
          )}
          
          {isSosActive && countdown > 0 ? (
            <div className="text-center">
              <span className="text-6xl font-black">{countdown}</span>
              <p className="text-red-200 mt-2 font-medium">Cancel if mistaken</p>
            </div>
          ) : isSosActive && countdown <= 0 ? (
            <div className="text-center">
              <Ambulance size={64} className="mb-2 animate-bounce mx-auto text-white" />
              <p className="font-bold text-xl">Dispatched</p>
            </div>
          ) : (
            <>
              <TriangleAlert size={64} className="mb-4 text-red-100" />
              <span className="text-3xl font-black tracking-widest">SOS</span>
              <span className="text-sm text-red-200 font-medium mt-1">TAP & HOLD</span>
            </>
          )}
        </button>
      </div>

      {isSosActive && countdown > 0 && (
        <div className="flex justify-center">
          <button 
            onClick={cancelSOS}
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-bold hover:bg-gray-300 transition-colors"
          >
            Cancel SOS
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">What happens next?</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-full text-red-500 shrink-0">
              <LocateFixed size={18} />
            </div>
            <p className="mt-1">Your precise GPS location is shared instantly with the nearest hospital and ambulance dispatch.</p>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-full text-red-500 shrink-0">
              <PhoneCall size={18} />
            </div>
            <p className="mt-1">The emergency response team will call you immediately to assess the situation.</p>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-full text-red-500 shrink-0">
              <MapPin size={18} />
            </div>
            <p className="mt-1">A high-priority ER bed will be prepared for your arrival.</p>
          </li>
        </ul>
      </div>

    </div>
  );
}
