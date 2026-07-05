import React, { useState, useEffect } from 'react';
import { Calendar, User, Mail, ChevronRight, CheckCircle, Trash2, Heart } from 'lucide-react';

interface SavedRSVP {
  id: string;
  name: string;
  email: string;
  audience: string;
  timestamp: string;
}

export default function RegisterSection() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [audience, setAudience] = useState<string>('beginners');
  const [savedRsvps, setSavedRsvps] = useState<SavedRSVP[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Load RSVPs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('maim_rsvps');
      if (stored) {
        setSavedRsvps(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed loading RSVPs:", e);
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const newRsvp: SavedRSVP = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      audience: audience,
      timestamp: new Date().toLocaleString(),
    };

    try {
      const updated = [newRsvp, ...savedRsvps];
      setSavedRsvps(updated);
      localStorage.setItem('maim_rsvps', JSON.stringify(updated));
      setIsSubmitted(true);
      
      // Clean inputs
      setName('');
      setEmail('');
    } catch (e) {
      setErrorMsg('Failed to save reservation locally. Please try again.');
    }
  };

  const handleDeleteRsvp = (id: string) => {
    try {
      const filtered = savedRsvps.filter((rsvp) => rsvp.id !== id);
      setSavedRsvps(filtered);
      localStorage.setItem('maim_rsvps', JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to delete RSVP:", e);
    }
  };

  const getFriendlyAudience = (audId: string) => {
    const map: Record<string, string> = {
      beginners: 'Beginner Seeking Clarity',
      creators: 'Digital Creator',
      founders: 'Entrepreneur / Founder',
      parents: 'Parent / Community Leader',
      professionals: 'Industry Professional',
      coaches: 'Coach or Wellness Trainer',
    };
    return map[audId] || audId;
  };

  return (
    <section id="register" className="relative py-24 bg-brand-black border-b border-[#14141c]">
      {/* Visual background element */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
          <span className="text-xs font-mono tracking-widest text-brand-orange uppercase">07 / REGISTER SEAT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Form Info Copy & Slogans */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-brand-muted font-mono text-xs uppercase tracking-widest block mb-1">
                KNOWLEDGE SESSIONS ON GOOGLE MEET
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl uppercase tracking-tight text-brand-white leading-none mb-6">
                RESERVE YOUR FREE SEAT
              </h2>
              <div className="w-20 h-0.5 bg-brand-orange mb-8" />
              
              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6 font-sans">
                Sign up for the next Major AI Mindset live knowledge session to claim your workspace access. Registered attendees receive real-time calendars, access to complete video replays, and step-by-step workbook prompts.
              </p>

              <div className="space-y-4 text-xs font-mono text-brand-muted">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green" />
                  <span>100% Free Live Session</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span>Hosted via Google Meet weekly</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                  <span>Comprehensive replays sent to email</span>
                </div>
              </div>
            </div>

            {/* Slogan Quote card */}
            <div className="mt-12 p-6 border border-[#161622] bg-brand-black-light text-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none" />
              <p className="font-serif italic text-sm text-brand-gold mb-3">
                &ldquo;If you can text, you can use AI. Likkle by likkle, we build the future.&rdquo;
              </p>
              <span className="block font-mono text-brand-muted text-[10px] uppercase">— Major Dream Williams</span>
            </div>
          </div>

          {/* Right Column: RSVP Form or Success Screen */}
          <div id="rsvp-form-container" className="col-span-1 lg:col-span-7 p-8 border border-[#1e1e28] bg-brand-black-light flex flex-col justify-between">
            {!isSubmitted ? (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#14141d] mb-4">
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">SECURE RSVP ENTRANCE</span>
                  <span className="text-[9px] font-mono text-brand-muted">FREE SESSIONS</span>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded font-mono">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1.5">Your Full Name:</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-brand-muted" />
                    <input
                      type="text"
                      placeholder="e.g. Dream Williams"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-black border border-[#1e1e28] rounded py-3 pl-10 pr-4 text-xs text-brand-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1.5">Your Email Address:</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-brand-muted" />
                    <input
                      type="email"
                      placeholder="e.g. builder@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-black border border-[#1e1e28] rounded py-3 pl-10 pr-4 text-xs text-brand-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <p className="text-[9px] text-brand-muted/70 mt-1 font-mono">
                    Used strictly to send your Google Meet invite, replay keys, and roadmap exercises.
                  </p>
                </div>

                {/* Demographics Selection */}
                <div>
                  <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1.5">Who Are You Building For?</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full bg-brand-black border border-[#1e1e28] rounded p-3 text-xs text-brand-white focus:outline-none focus:border-brand-gold uppercase font-mono tracking-wider"
                  >
                    <option value="beginners">Beginner seeking a clean start</option>
                    <option value="creators">Creator launching digital assets</option>
                    <option value="founders">Entrepreneur establishing business systems</option>
                    <option value="parents">Parent / community educator</option>
                    <option value="professionals">Professional scaling corporate output</option>
                    <option value="coaches">Coach or wellness strategist</option>
                  </select>
                </div>

                <button
                  type="submit"
                  id="rsvp-submit-btn"
                  className="w-full group flex items-center justify-center gap-3 py-4 bg-brand-orange text-brand-white font-display font-bold text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-all rounded-sm shadow-lg"
                >
                  <span>Reserve Seat &amp; Get Invite Links</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </form>
            ) : (
              /* Success plate with direct form link */
              <div className="animate-fade-in text-center py-6">
                <div className="w-16 h-16 bg-brand-green/10 border border-brand-green/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-brand-green animate-bounce" />
                </div>

                <h3 className="font-display font-black text-2xl text-brand-white uppercase mb-2">
                  LOCAL RSVP RECORDED!
                </h3>
                <p className="text-brand-gold font-mono text-xs uppercase tracking-widest mb-6">
                  Workspace seat saved in browser
                </p>

                <div className="p-6 bg-brand-black border border-[#1b1b24] rounded-lg mb-8 max-w-md mx-auto text-left space-y-4">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    🌟 <strong>One final step is required to integrate with your Google Calendar</strong> and secure your official emails. Click the button below to submit your email to Major&apos;s official Google Form:
                  </p>

                  <a
                    href="https://forms.gle/RdSX2R6dyRJLqjkk7"
                    target="_blank"
                    rel="noreferrer"
                    id="forms-direct-btn"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-gold text-brand-black font-display font-bold text-xs uppercase tracking-widest rounded shadow-md hover:bg-brand-white transition-colors"
                  >
                    <span>Register Free on Google Forms</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-mono text-brand-muted hover:text-brand-orange uppercase underline"
                >
                  RSVP another teammate
                </button>
              </div>
            )}

            {/* Local RSVPs list - Persistent tracker demonstrating real-world functionality */}
            {savedRsvps.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#1a1a24]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-brand-gold" />
                    <span>MY RESERVED WORKSPACE SEATS ({savedRsvps.length})</span>
                  </span>
                  <p className="text-[9px] font-mono text-brand-muted/70">PROTOTYPE PERSISTENCE ENABLED</p>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-2.5 pr-2">
                  {savedRsvps.map((rsvp) => (
                    <div 
                      key={rsvp.id} 
                      className="flex justify-between items-center p-3 bg-brand-black border border-[#161622] text-xs font-mono"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-white font-bold">{rsvp.name}</span>
                          <span className="text-[9px] bg-brand-blue/15 text-brand-blue px-1.5 py-0.5 rounded uppercase">
                            {getFriendlyAudience(rsvp.audience)}
                          </span>
                        </div>
                        <span className="text-[10px] text-brand-muted block">{rsvp.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] text-brand-muted/50 hidden sm:inline">{rsvp.timestamp.split(',')[0]}</span>
                        <button
                          onClick={() => handleDeleteRsvp(rsvp.id)}
                          className="p-1 text-brand-muted hover:text-red-400 transition-colors"
                          title="Delete Reservation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
