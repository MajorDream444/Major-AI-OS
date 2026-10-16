# MAIM Blueprint Extraction & Voice Identity — Proposed Skills
Status: draft / founder review | 2026-10-09

## Guiding principle
Major Dream Williams is the **initial blueprint**, not a template for cloning people. MAIM teaches members to discover and refine their own mindset, capabilities and ethical commitments. Founder beliefs are hypotheses and teaching perspectives, not universal facts.

## Skill 01 — Founder Voice Capture & Quality Gate
**Trigger:** founder asks for narration, brand film, voice clone, or voice identity.
**Inputs:** founder-authorized original audio (ideally 5–10 minutes of clean speech), written script, approved reference footage, voice model metadata.
**Steps:**
1. Verify source permission and preserve provenance and access controls.
2. Record natural conversational storytelling, questions, humor, reflection, varied emotional pacing and deliberate pauses; minimize music and room echo.
3. Segment clean single-speaker samples; transcribe with timestamps; correct transcript without rewriting natural phrasing.
4. Generate one short, labeled voice-clone test with the existing authorized provider; do not train multiple models without a reason.
5. Blind or side-by-side human review against original for timbre, cadence, emotion, accent, pauses, pronunciation, and robotic artifacts.
6. Approve/reject explicitly; preserve original as fallback; document provider, model ID, training consent, sample origin and usage rights.
7. Only after approval, create the flagship narration and sync with approved avatar/real footage.
**Outputs:** `voice_manifest.json`, transcript, review rubric, approved or rejected proof, source-of-truth reference.
**Do not:** infer that chat dictation transcripts provide retrievable raw voice recordings; synthesize or publish founder voice without approval.

## Skill 02 — Worldview-to-Doctrine Extractor
**Trigger:** founder tells a personal story, explains a belief, analyzes an opportunity or changes a decision.
**Inputs:** consented conversation/transcript, date, relevant project and evidence.
**Steps:**
1. Extract verbatim thesis and autobiographical claims, preserving uncertainty and context.
2. Separate **observation**, **belief**, **value**, **decision heuristic**, **prediction**, **experiment**, and **verified outcome**.
3. Map to A–E (Awareness, Belief, Context, Direction, Experiment), 10 Pillars when actually relevant, and stewardship principles.
4. Identify counterexamples, alternative interpretations, limits, and possible harms.
5. Propose a practical learning exercise, measurable hypothesis, reflection prompt and rubric.
6. Submit for founder review; version approved doctrines with citations and change log.
**Outputs:** doctrine card, source links, evidence status, skill/lesson proposal, tests.
**Do not:** elevate every founder statement into an objective fact or require learners to share founder beliefs.

## Skill 03 — MAIM Learning Experiment & Versioning
**Trigger:** a doctrine is approved for a lesson, quest, mentoring session or course module.
**Steps:**
1. State learner outcome and who the module serves; offer accessible alternatives for beginners.
2. Design pre-reflection, practical experiment, stewardship check and post-reflection.
3. Collect only consented, minimum-necessary feedback; avoid sensitive personal profiling and unsupported mental-health inferences.
4. Measure comprehension, task completion, learner confidence, real-world utility and unintended consequences.
5. Review cohort results with human oversight; revise version 1 -> 2 -> 3 using changelog and evidence.
6. Allow learners to disagree, adapt, and build their own approach.
**Outputs:** lesson spec, quest, rubric, feedback schema, versioned changelog.

## Skill 04 — MAIM Founder Film Pipeline
**Trigger:** founder approves a film script or requests shorts/explainers.
**Steps:** storyboard -> authorized narration -> approved avatar or real footage -> optional Higgsfield/Veo B-roll -> Remotion brand/captions -> mobile/accessibility QA -> review -> exports -> archival metadata.
**Reuse:** `workflows/remotion-production-workflow.md`; `remotion_framework_abc/`; existing welcome-film proof where available.
**Deliverables:** 16:9 flagship, 9:16 shorts, silent homepage loop, captions, contact sheet and provenance manifest.
**Gate:** no public release or homepage swap until founder approves voice, image and final render.

## Proposed data model (human review required)
`id, source_date, source_type, quote, observation, belief, value, heuristic, evidence_status, counterpoint, abc_stage, pillar, stewardship_check, exercise, outcome_metric, consent_scope, version, review_status`

## Production priorities
1. Choose or record authentic founder speech.
2. Produce 20–30 second voice identity proof and evaluate.
3. Build one worldview doctrine card from the founder's technology-journey story.
4. Create a short A–E learning exercise from that card.
5. Render one founder-film proof in Remotion.
6. Only then scale to recurring skills, quizzes, and evolving learner journeys.
