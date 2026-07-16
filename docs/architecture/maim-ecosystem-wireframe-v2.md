# MAIM Ecosystem Wireframe v2

Status: Approved design direction for implementation

Source artifact: `MAIM Ecosystem Wireframe v2 (Standalone).html`

## Core Product Decision

MAIM is not one overloaded website. It is a three-layer digital campus with one clear role for each environment.

```txt
PUBLIC SANCTUARY
majoraimindset.com
        ↓
MEMBER WORKSHOP
studio.majoraimindset.com
        ↓
PROTECTED BACK OFFICE
studio.majoraimindset.com/operator
```

Longer-term vault layer:

```txt
vault.majoraimindset.com
```

The public site builds trust and guides one next step. The Studio supports learning, building, purchases, events, and community. The operator console controls production, publishing, curriculum, commerce, and reporting.

---

## Layer 1 — Public Sanctuary

Domain: `majoraimindset.com`

Purpose:

- Introduce MAIM
- Build trust
- Reduce fear and confusion
- Explain the ABC foundation
- Invite the visitor into one clear next step

### Public Journey

```txt
Hero
  ↓
Founder Welcome
  ↓
Why MAIM Exists
  ↓
ABC Foundation
  ↓
Live Knowledge Room
  ↓
Choose Your Lane
  ↓
Meet Major
  ↓
Reserve Your Free Seat
  ↓
Studio / Product / Community Preview
  ↓
FAQ + Footer
```

### Hero

Primary line:

> AI is the tool. You are the future.

Supporting thought:

> Most people do not need more AI tools. They need a safe place to begin.

Primary CTA:

`Reserve your seat`

Secondary CTA:

`Explore the ABCs`

The hero must remain calm, cinematic, and focused. One emotional anchor. One primary action.

### Founder Welcome

A two-to-three-minute founder video immediately follows the hero.

The video should answer:

- Why Major built MAIM
- Who the room is for
- Why people feel overwhelmed
- Why MAIM begins with Awareness, Belief, and Context

This is the trust engine. It should feel like a conversation, not an advertisement.

### Why MAIM Exists

Editorial prose instead of a feature grid.

Core quote:

> If you can text, you can use AI.

The emotional movement is:

```txt
Fear → permission → confidence → action
```

### ABC Foundation

Only expose the first three letters publicly.

- A — Awareness: Notice the opportunity.
- B — Belief: You can do this.
- C — Context: Clear in, clear out.

The remaining alphabet stays behind a curiosity ladder rather than appearing as a 26-letter wall.

### Live Knowledge Room

Public event card includes:

- Next session title
- Local time in Bali / WITA
- Local time in New York / ET
- Google Meet delivery
- What participants receive

Live room promise:

1. One live idea
2. One working example
3. One simple action
4. Replay and follow-up

### Choose Your Lane

Initial lanes:

- Beginner
- Creator
- Entrepreneur
- Coach
- Parent
- Professional

Selecting a lane should pre-fill registration information and later shape the member's Studio path.

### Reserve Your Free Seat

Required fields:

- Full name
- Email
- Current lane

This is the primary conversion point. The full public page should funnel toward this action.

### Public Preview

The public site may preview:

- ABC Studio
- Books and toolkits
- Community activity

These are windows, not competing calls to action.

---

## Layer 2 — ABC Studio

Domain: `studio.majoraimindset.com`

Purpose:

- Learn
- Build
- Track progress
- Access resources
- Attend live sessions
- Watch replays
- Purchase tools
- Join the community

The Studio is active, modular, and signed-in.

### Studio Navigation

```txt
Dashboard
Learn
Resources
Events
Community
My Shelf
Account
```

### Personalized Dashboard

Example:

```txt
Welcome back, Keisha
Lane: Creator

Continue where you left off:
B2 — Belief: You can do this

ABC Foundation progress: 34%

This week:
- Live room Saturday at 7 PM ET
- One action pending
- New replay posted
```

### Pressure Test

The Pressure Test lives inside the Studio as an adaptive assessment.

Framing:

> Where does the pressure hit you?

Target experience:

- Ten questions
- Approximately seven minutes
- Produces a personalized starting point
- May be retaken as the member grows

The test is not a detached quiz. It is the bridge into a recommended learning path.

### Recommended Path

The system combines:

- Chosen lane
- Pressure Test result
- Completed lessons
- Saved resources
- Current goals

Example:

```txt
A1 → A3 → B2 → C1 → C4
```

The path should adapt over time.

### ABC Learning Area

Each lesson follows the MAIM loop:

```txt
One idea
One example
One action
```

ABC letters unlock progressively. The member should see what is next without being buried under the entire curriculum.

### Resources

Resource types include:

- Prompt cards
- Worksheets
- Templates
- Toolkits
- Replays
- Checklists

Filters:

- Letter
- Lane
- Free / paid
- Format
- Saved

### My Shelf

Contains:

- Purchased assets
- Saved prompts
- Saved replays
- Downloads
- Receipts

### Events and Replays

Upcoming sessions sync with the public website.

Replay cards should show:

- Thumbnail
- Letter or theme
- Date
- Duration
- Progress state

### Community

Community entry points:

- Introductions
- Action check-ins
- Wins wall
- Builder projects
- Questions

The community is gated to signed-in members.

---

## Layer 3 — Operator Console

Route: `studio.majoraimindset.com/operator`

Purpose:

- Manage curriculum
- Publish content
- Schedule events
- Review members
- Track products and sales
- Manage community
- Monitor system health

The operator environment is role-gated and never linked publicly.

### Operator Navigation

```txt
Overview
Curriculum
Content
Events
Members
Community
Commerce
Analytics
Assets
Settings
```

### Overview

Core signals:

- Members active
- Registrations
- Lesson completion
- Live attendance
- Pending actions
- Published assets
- Revenue
- System status

### Curriculum

The curriculum workspace controls:

- Letters
- Lessons
- Levels
- Lanes
- Unlock rules
- Recommended paths
- Resource relationships

### Content Operations

Statuses:

```txt
Idea
Drafted
Designed
Recorded
Edited
Scheduled
Published
Repurposed
Archived
```

Important rule:

```txt
Ready to Publish = enough to go live
Complete = full asset package archived
```

### Events

Event controls:

- Create session
- Time-zone display
- Registration
- Meet link
- Reminders
- Attendance
- Replay publishing
- Follow-up action

### Members

Member view should include:

- Profile
- Lane
- Pressure Test result
- Progress
- Purchases
- Attendance
- Community activity
- Last action
- Recommended next step

### Commerce

Commerce includes:

- Products
- Bundles
- Orders
- Coupons
- Access rules
- Receipts
- Revenue reporting

### Analytics

Measure learning and action, not vanity alone.

Primary signals:

- Lesson completion
- Action completion
- Return frequency
- Live attendance
- Replay completion
- Resource usage
- Community contribution
- Purchase conversion
- Path progression

---

## Learning Identity Language

Replace the generic Beginner / Medium / Expert framing in member-facing UX.

Recommended identity system:

```txt
Explorer
Builder
Architect
```

Alternative operational mapping:

```txt
Foundation
Builder
Operator
```

The final vocabulary should remain consistent across the public website, Studio, community, products, and events.

---

## Product Naming Rule

Products should lead with outcomes, not file formats.

Examples:

- `ABC Workbook` → `Build Your AI Foundation`
- `Starter Kit` → `Start Here Toolkit`
- `Business Pressure Test` → `Find Your Biggest Bottleneck`

Formats may appear as supporting details, not the main promise.

---

## Community Proof Layer

Add a public section titled:

`Meet the Builders`

It may feature:

- Recent wins
- Community projects
- Businesses launched
- Member stories
- Actions completed
- Local problems solved

This shifts the ecosystem from a founder-centered platform into a visible movement.

---

## Experience Principles

1. The hero is never AI. Humans lead; AI amplifies.
2. Every page gets one primary purpose.
3. Every screen gets one clear next action.
4. New visitors should not see operator controls.
5. Members should not be buried under the whole curriculum.
6. Products appear as useful next steps, not a gift shop.
7. The Pressure Test creates a personalized path.
8. Community becomes the public proof layer.
9. Progress should feel encouraging, not clinical.
10. The visual system remains black foundation, gold authority, Jamaican green legacy, champion blue/orange energy, and white clarity.

---

## Technical Direction

Recommended application split:

```txt
apps/
  web/          # majoraimindset.com
  studio/       # studio.majoraimindset.com
  operator/     # protected operator experience or route group

packages/
  ui/           # shared MAIM design system
  auth/         # authentication and roles
  curriculum/   # ABC data and path logic
  commerce/     # product and access logic
  analytics/    # learning signals
  content/      # CMS/content models
```

Suggested role model:

```txt
visitor
member
community_leader
mentor
editor
operator
admin
```

Suggested first implementation sequence:

1. Public sanctuary homepage
2. Seat registration flow
3. Authentication
4. Member dashboard
5. ABC lesson model
6. Events and replay library
7. Pressure Test
8. Personalized path logic
9. Resources and My Shelf
10. Operator dashboard
11. Commerce
12. Community proof layer

---

## Required Next Artifact

Create a MAIM service blueprint mapping:

```txt
Instagram / referral
        ↓
Public homepage
        ↓
Founder welcome
        ↓
ABC discovery
        ↓
Seat registration
        ↓
Live knowledge room
        ↓
Account creation
        ↓
Pressure Test
        ↓
Personalized path
        ↓
ABC Studio lesson
        ↓
Resource or product
        ↓
Community action
        ↓
Cohort / advanced pathway
        ↓
Legacy Vault
```

The service blueprint must show:

- User action
- Frontstage experience
- Backstage process
- System or agent
- Data captured
- Triggered communication
- Success signal
- Failure / recovery path

---

## Definition of Done for v2 Architecture

- Public, member, and operator layers are separated
- Each environment has one clear job
- Founder welcome is placed directly after the hero
- Only A, B, and C are exposed publicly
- Pressure Test leads to a personalized path
- Member levels use identity language
- Product names lead with outcomes
- Community proof is represented
- Operator controls are protected
- Technical implementation sequence is documented

Likkle by likkle, we build the future.
