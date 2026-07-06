# MAIM ABC Database

Status: Phase 2 source data

This folder holds the real ABC lesson database for the MAIM learning engine.

Primary file:

```txt
data/abc/maim-abc-database.json
```

Each record represents one letter and includes:

```txt
Letter
Title
Lesson
Exercise
Prompt
Video
Download
CTA
Related Agent
```

The current landing-page teaching spine is:

```txt
A Awareness
B Belief
C Context
D Direction
E Execution
```

Older seed files may still reference `E = Experiment`. Treat this database as the Phase 2 landing/course source until the older seeds are reconciled.
