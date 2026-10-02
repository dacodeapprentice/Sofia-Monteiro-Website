import React, { useState } from 'react';
import { Mail, Send, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const email = 'Sofiadmm58@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setFormSent(true);
    // Optionally prepare mailto as fallback
    setTimeout(() => {
      setName('');
      setSenderEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-teal-950/40 relative"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Personal Note */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-sans tracking-wide uppercase">
              <Mail className="w-3.5 h-3.5" />
              <span>Section 05 · Connect</span>
            </div>

            <h2 className="font-title text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Get in Touch
            </h2>

            <p className="font-serif text-slate-300 text-lg leading-relaxed">
              "Browse through them, and thank you." Whether you would like to discuss a collaboration, exchange ideas on craft, or simply say hello, my inbox is always open.
            </p>

            {/* Email Card with Copy and Direct Mailto */}
            <div className="p-5 rounded-2xl bg-[#0c1520] border border-teal-900/40 space-y-3">
              <div className="text-xs font-sans text-slate-400 uppercase tracking-wider">
                Direct Correspondence
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${email}`}
                  className="font-title text-base sm:text-lg font-semibold text-teal-300 hover:text-teal-200 transition-colors truncate"
                >
                  {email}
                </a>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium bg-[#101e2b] hover:bg-[#16293a] text-slate-300 hover:text-white border border-teal-900/50 transition-colors shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-teal-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs font-reading text-slate-400 pt-1">
                Typically replying within 24–48 hours for creative inquiries.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Message Box */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0c1520] border border-teal-900/40 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h3 className="font-title text-lg font-semibold text-white">
                  Send a Direct Message
                </h3>
              </div>

              {formSent ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/70 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-300">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-title text-base font-semibold text-white">
                    Thank you for reaching out!
                  </h4>
                  <p className="font-serif text-slate-400 text-sm max-w-sm mx-auto">
                    Your message has been dispatched. Sofia will get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-4 px-4 py-1.5 text-xs font-sans text-teal-300 hover:underline"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-slate-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 bg-[#070c12] border border-teal-900/50 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 font-sans transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-slate-400 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 bg-[#070c12] border border-teal-900/50 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 font-sans transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-slate-400 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a thought, project idea, or hello..."
                      className="w-full px-3.5 py-2.5 bg-[#070c12] border border-teal-900/50 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500 font-serif leading-relaxed transition-colors"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-reading text-slate-500 italic">
                      "Browse through them, and thank you."
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-title text-sm font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-md transition-all"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
