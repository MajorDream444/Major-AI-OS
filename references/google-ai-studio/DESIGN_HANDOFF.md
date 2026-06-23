# Major AI Mindset — Design Handoff & Specs Guide
**Target Interface Style:** *Dark Nexora/Aura Premium Aesthetic (Bali Tech-Luxury Layout)*

This guide serves as the specifications document for your design system, UX, and frontend production teams. Sharing this ensures that any new views, web tools, or marketing assets maintain absolute brand consistency, premium alignment, and professional layout rhythm.

---

## 📁 1. Key Code Files to Provide Your Design Team

To maintain high fidelity, provide your engineering and design team with these files from the project repository:

1. **`/src/index.css`** — Contains the core custom color tokens, font injection layers, smooth behaviors, and active webkit scrollbars.
2. **`/src/App.tsx`** — Contains the parent viewport framework including the **absolute top-viewport scroll progress bar**, responsive layout spacing grid, and **Aura corner laser line decorators** that frame the screen.
3. **`/src/data.ts`** — Houses the structured curriculum data backing the content matrices.

---

## 🎨 2. Visual Style & Atmospheric Specs

The theme blends high-status modern productivity tools (dark glass boards) with organic Bali-inspired luxury accents (glowing warm orange and gold gradients paired with subtle cinematic blue highlights).

### Core Color Palette Table
| Token Name | Preferred Style | Exact Hex / Tint Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Background** | Off-black slate | `#0b0c10` (or Tailwind standard `zinc-950` depth) | Base body container viewport background |
| **Brand Card Fill** | Translucent obsidian | `rgba(28, 32, 41, 0.4)` (with `backdrop-blur-md`) | Premium floating widgets & interactive card sheets |
| **Brand Border** | Sleek charcoal spacer | `rgba(255, 255, 255, 0.08)` (or Tailwind standard `zinc-800`) | Clean micro-dividers and container shells |
| **Brand Accent (Orange)**| Laser Coral Sunset | `#FF5A00` | Primary buttons, active state indicators, and alert tags |
| **Brand Primary (Blue)**  | Cobalt Royal Dusk | `#2563EB` | Premium "Spark Lab" sections, co-creation badges, and sprint buttons |
| **Brand Text Muted** | Silver Mist | `#888aa3` (and `zinc-400`/`zinc-500` tones) | Informational tags, secondary details, and technical labels |

---

## ✍️ 3. Typography Hierarchy
To keep the presentation "Premium, Cinematic, and not overexplained," the system leverages a stark sans-serif body paired with high-contrast display headings and strict monospaced identifiers:

* **Primary System Body Font:** **Inter (sans-serif)**
  * *Body Text:* `text-zinc-400 font-body text-xs md:text-sm` — High tracking with comfortable line space (`leading-relaxed`).
* **Display Headings Font:** **Manrope (or Inter Extra-Bold/Black)**
  * *Titles:* `font-sans font-black tracking-tight leading-tight` — Generous thickness to create authority. Usually coupled with a subtle multi-color gradient (`from-brand-orange via-amber-500 to-amber-600 bg-clip-text text-transparent`).
* **Technical Layout Data Font:** **JetBrains Mono (or standard monospace)**
  * *Indicators:* `font-mono text-3xs uppercase tracking-widest text-brand-orange` — Adds an authentic, disciplined, and systematic coding structural feel to labels and headers.

---

## 💫 4. Signature Interaction Aesthetics & Animation Guidelines

To stand out from default AI applications, use these micro-interactivity rules:

1. **Top Viewport Scroll Indicator:**
   A high-visibility horizontal bar (`4px` height) locked to the absolute top of the screen (`fixed top-0 left-0 right-0 z-[999]`), using a horizontal color transition: `from-brand-orange via-amber-500 to-brand-blue` paired with an ambient hover glow `shadow-[0_1px_8px_rgba(255,90,0,0.6)]`. This indicates real-time scroll metrics down to the absolute checkout / footer.
2. **Corner Laser Line Accent Decorators:**
   Each of the four viewport corners features standard high-contrast, double-layered laser lines (`fixed z-50 pointer-events-none`). For example, in the top-left:
   * A horizontal laser bar: `w-32 h-[1px] bg-brand-orange shadow-[0_0_8px_#FF5A00]`
   * A vertical laser bar: `h-32 w-[1px] bg-brand-orange shadow-[0_0_8px_#FF5A00]`
3. **Interactive Card Scaling Transitions:**
   Every list tile or product panel should stay locked on a base scale of `scale-98 opacity-90` and expand/brighten to `scale-100 opacity-100` on hover alongside a border color transition to `border-brand-orange/40` over exactly `300ms` with `ease-out`.

---

## 🎯 5. The Conversion Core Architecture

All page sections route in a strict cascading funnel designed to maximize user confidence:

```txt
  [1] Cinematic Hero Area 
       └─► Primary CTA: "Take the Business Pressure Test"
       └─► Secondary CTA: "Explore the ABCs"
        │
  [2] "Pick Your Path" Segment
       └─► Role selectors (Creator, Coach, Founder...) with live customized leakage diagnosis
        │
  [3] The Interactive Business Pressure Test
       └─► 4-step diagnostic wizard calculating "Mindset Leverage Score"
        │
  [4] Interactive Editorial Desk (The ABC Framework)
       └─► Direct asset creation playground to experience the system instantly
        │
  [5] Spark Lab Vault Portfolio
       └─► Showcase of Free and Paid items ($27 Workbook, $47 Masterclass, $97 complete Stack)
        │
  [6] Learner Stats Cards & Tiers (Three levels)
        │
  [7] Spark Lab 1-on-1 Bali Sprint
       └─► Premium Booking Application & co-creation inquiry form
        │
  [8] Structured Email Join List  -->  Minimal Footer System
```

## 🛠️ 6. Guidelines For Your Developers

Ensure the engineers adhere strictly to these principles to avoid "AI Slop" or visual fatigue:
* **No Telemetry or Mock Logs:** Do not pollute margins with pseudo-intellectual system coordinates, fake ping stats, or terminal loading bars (e.g., *no "PORT: 3000"* or *no "CORE_NODE_ONLINE"*). Focus on actual features.
* **Readable Margins & Positive Space:** Always maintain spacious margins (`space-y-20` on the vertical grid, `px-6 md:px-10` inside cards, and `rounded-[32px]` boundary containers).
* **High Contrast Contrast Verification:** Always ensure off-white text stays readable over translucent cards, avoiding low-contrast grays on black.
