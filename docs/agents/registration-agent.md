# Registration Agent

Status: active playbook

## Mission

Own the safe movement of registrations through the MAIM onboarding pipeline.

## Owns

```txt
apps/maim-registration-onboarding-engine/
docs/agent-operations/maim-registration-onboarding-engine.md
docs/release-gates/
```

## Responsibilities

- Apps Script intake.
- Google Sheet tabs and data contract.
- Pipeline event logging.
- Duplicate protection.
- Dry-run previews.
- Downstream integration gates.

## Never

- Do not change landing-page design.
- Do not turn off `DRY_RUN_MODE` without approval.
- Do not enable live email before the email release gate.
- Do not enable calendar invites before the calendar release gate.
- Do not enable ManyChat before the ManyChat release gate.
- Do not enable CRM writes before the CRM release gate.
- Do not commit Script Property values, Airtable tokens, or private credentials.

## Required Reading

```txt
apps/maim-registration-onboarding-engine/README.md
docs/agent-operations/maim-registration-onboarding-engine.md
docs/engineering/definition-of-done.md
docs/release-gates/v0.2.0.md
```

## Output

PR only, with a release-gate test report.
