import React from 'react';
import { Bot, Video, MessageSquare } from 'lucide-react';

export default function Telemedicine() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Telemedicine & AI Assistant</h1>
        <p className="text-gray-500">Consult with doctors remotely or ask our AI Health Assistant.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-hospital-500 to-hospital-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
          <Bot size={48} className="mb-6 text-hospital-100 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold mb-2">AI Health Assistant</h2>
          <p className="text-hospital-100 mb-6">Describe your symptoms to get immediate triage advice, department recommendations, and health tips.</p>
          <button className="bg-white text-hospital-700 px-6 py-2.5 rounded-full font-bold shadow-sm">Start Chat</button>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:border-hospital-400 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 p-3 rounded-xl"><Video size={24}/></div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Video Consultation</h3>
                <p className="text-sm text-gray-500">Connect face-to-face with your doctor.</p>
              </div>
            </div>
            <button className="w-full bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium py-2 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Join Waiting Room</button>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:border-hospital-400 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 p-3 rounded-xl"><MessageSquare size={24}/></div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Secure Doctor Chat</h3>
                <p className="text-sm text-gray-500">Text your doctor for quick follow-ups.</p>
              </div>
            </div>
            <button className="w-full bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium py-2 rounded-lg group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Open Messages</button>
          </div>
        </div>
      </div>
    </div>
  );
}
