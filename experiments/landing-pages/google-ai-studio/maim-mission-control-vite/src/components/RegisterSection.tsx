import type { FormEvent } from 'react';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const WEBHOOK_URL = 'https://script.google.com/a/macros/hanzo.ai/s/AKfycbxpxqKd_unYrHyen2cpxAU85_H4oEU_76Ck4wn2Wpf_rHq2XSl4kOVqpWTEJ0bUZis6/exec';
const GOOGLE_FORM_URL = 'https://forms.gle/RdSX2R6dyRJLqjkk7';

export default function RegisterSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [audience, setAudience] = useState('Beginner');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, role: audience, aiGoal: 'Major AI Mindset live knowledge session', notes: 'Submitted from MAIM Mission Control landing page' }),
      });
      setStatus('success');
      setName('');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <section id="register" className="bg-brand-black-light py-24 md:py-32 border-b border-brand-gold/10 studio-grid">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold mb-6">Next session</p>
        <h2 className="font-display uppercase text-4xl md:text-6xl text-brand-white leading-[0.95]">Reserve your free seat</h2>
        <p className="mt-6 text-brand-muted leading-relaxed">Sign up for the next Major AI Mindset live knowledge session and get reminders, replay access, and next steps.</p>

        <form onSubmit={handleSubmit} className="hud-panel mt-10 p-6 md:p-8 text-left space-y-5">
          <label className="relative z-10 block">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold">Full name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} required className="mt-2 w-full bg-brand-black-light border border-brand-gold/20 px-4 py-4 text-brand-white outline-none focus:border-brand-gold" />
          </label>
          <label className="relative z-10 block">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold">Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-2 w-full bg-brand-black-light border border-brand-gold/20 px-4 py-4 text-brand-white outline-none focus:border-brand-gold" />
          </label>
          <label className="relative z-10 block">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold">Current lane</span>
            <select value={audience} onChange={(event) => setAudience(event.target.value)} className="mt-2 w-full bg-brand-black-light border border-brand-gold/20 px-4 py-4 text-brand-white outline-none focus:border-brand-gold">
              <option>Beginner</option>
              <option>Creator</option>
              <option>Entrepreneur</option>
              <option>Coach</option>
              <option>Parent</option>
              <option>Professional</option>
            </select>
          </label>
          <button disabled={status === 'sending'} className="relative z-10 w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-orange transition disabled:opacity-60">
            {status === 'sending' ? 'Sending' : 'Register free'} <ArrowRight size={16} />
          </button>
          {status === 'success' && <p className="relative z-10 flex items-center gap-2 text-brand-green"><CheckCircle2 size={18} /> You are registered. Check your email for the confirmation.</p>}
          {status === 'error' && <p className="relative z-10 text-brand-orange">Something did not connect. Use the backup form link below.</p>}
        </form>
        <a href={GOOGLE_FORM_URL} className="inline-block mt-6 text-sm text-brand-gold underline underline-offset-4">Backup Google Form</a>
      </div>
    </section>
  );
}
