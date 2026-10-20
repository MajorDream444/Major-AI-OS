-- Operational registry only. No learner, client or payment records.
create schema maim_ops;
revoke all on schema maim_ops from public, anon, authenticated, service_role;
create table maim_ops.application_registry (
 application text primary key,
 repository_url text not null check(repository_url like 'https://github.com/MajorDream444/%'),
 canonical_project_ref text not null check(canonical_project_ref='njpdlomvyalxrkluaige'),
 data_schema text,
 setup_state text not null check(setup_state in ('existing','planned','pilot_draft')),
 runtime_verified boolean not null default false,
 notes text not null,
 recorded_at timestamptz not null default now()
);
alter table maim_ops.application_registry enable row level security;
revoke all on maim_ops.application_registry from public, anon, authenticated, service_role;
insert into maim_ops.application_registry(application,repository_url,canonical_project_ref,data_schema,setup_state,runtime_verified,notes) values
('maim','https://github.com/MajorDream444/Major-AI-OS','njpdlomvyalxrkluaige','maim','existing',false,'Nine existing RLS-enabled tables inspected. Existing legacy registrations database is a separate cutover task.'),
('academy','https://github.com/MajorDream444/MAIMACADEMY','njpdlomvyalxrkluaige',null,'pilot_draft',false,'Owner assigned this project. Draft schema and 26 local checks exist; hosted auth/payment/booking are not enabled.'),
('ama','https://github.com/MajorDream444/amasolagi-site','njpdlomvyalxrkluaige',null,'planned',false,'Central project selected by owner. Application schema and restricted role need implementation before connection.'),
('stb','https://github.com/MajorDream444/STB-practitioner-business-os','njpdlomvyalxrkluaige',null,'planned',false,'Central project selected by owner. Preserve product and client access boundaries.'),
('optionality','https://github.com/MajorDream444/optionality','njpdlomvyalxrkluaige',null,'planned',false,'Central project selected by owner for future build. Inactive historical project is not migrated or deleted.');
comment on table maim_ops.application_registry is 'Owner-approved database targeting registry; planned records do not claim a working runtime integration. Administrative SQL only.';
