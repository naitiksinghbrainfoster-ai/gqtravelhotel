import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Phone, Sparkles, ExternalLink } from 'lucide-react';
import { contactChannels } from '../lib/contactChannels';

interface AiChatConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenTransferModal: () => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiChatConcierge: React.FC<AiChatConciergeProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  onOpenTransferModal
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hi good evening, im checking now...',
      time: '5:57 pm'
    }
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'How much is airport transfer from Saarbrücken to Frankfurt?',
    'What is the Saarbrücken City Tax and service fee?',
    'How do I get an urgent Ghana e-Visa in 72 hours?',
    'How does Medical Tourism in Germany work?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Intelligent answer engine based on GQ Travel knowledge
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('frankfurt') || lower.includes('transfer') || lower.includes('airport')) {
        reply = 'Our private transfer from Saarbrücken / Saarland to Frankfurt Airport (FRA) is a fixed rate of €219 (approx. 1h 50m). We also serve Luxembourg LUX (€159), Frankfurt-Hahn (€169), Stuttgart (€269), and Brussels (€339). The first 60 minutes after flight landing are free!';
      } else if (lower.includes('tax') || lower.includes('saarbrücken') || lower.includes('commission') || lower.includes('fee')) {
        reply = 'For accommodations in Saarbrücken, a 3.5% municipal city tax is applied to the base rate. In addition, our website features a transparent daily service commission of €3.99 per day.';
      } else if (lower.includes('ghana') || lower.includes('visa')) {
        reply = `Flying to Ghana within 72 hours? GQ Travel & Hotels offers expedited e-Visa assistance, document review, and application guidance. Contact us on ${contactChannels[0].label} (${contactChannels[0].value}), ${contactChannels[1].label} (${contactChannels[1].value}), or email ${contactChannels[2].value}.`;
      } else if (lower.includes('medical') || lower.includes('hospital') || lower.includes('treatment')) {
        reply = 'Our German Medical Tourism coordination helps international patients contact leading German hospitals, schedule specialist appointments, obtain medical visas, book comfortable accommodation in Saarbrücken, and provide trilingual translation in German, English, and Twi.';
      } else if (lower.includes('flight') || lower.includes('train') || lower.includes('rail')) {
        reply = 'We arrange competitive domestic and international flight bookings, as well as Deutsche Bahn Rail & Fly and Tourist Tickets in Germany. Let us coordinate your complete flight-and-train itinerary!';
      } else {
        reply = `Thank you for your question. As your dedicated travel partner since 2005, GQ Travel & Hotels can tailor this arrangement for you. Contact us on ${contactChannels[0].label} (${contactChannels[0].value}), ${contactChannels[1].label} (${contactChannels[1].value}), or email ${contactChannels[2].value}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-[2px]">
      <div className="relative flex h-[600px] max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-slate-700 bg-[#10171d] shadow-2xl shadow-black/45">
        <div className="flex items-center justify-between border-b border-slate-700 bg-[#10171d] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f2d37] text-teal-300">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">&amp; Hotels...</h3>
              <p className="text-[10px] text-slate-400">online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 transition hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.08),transparent_40%),linear-gradient(to_bottom,_#0d1418,_#10171d)] p-4">
          <div className="space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="mt-1 mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#1f2d37] text-[10px] font-bold text-teal-300">
                    GQ
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0f1720] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                      : 'bg-white/90 text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.12)]'
                  }`}
                >
                  <p>{m.text}</p>
                  <div
                    className={`mt-1 text-right text-[10px] ${
                      m.sender === 'user' ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 bg-[#0d1418] p-3">
          <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-slate-200">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSend(prompt)}
                className="shrink-0 rounded-full border border-slate-600 bg-slate-800 px-2.5 py-1.5 transition hover:border-teal-500 hover:text-teal-200"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your travel question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-slate-950 transition hover:bg-teal-500"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
