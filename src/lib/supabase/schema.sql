-- ============================================
-- Coach Launch — Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Profiles (extends Supabase Auth)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Questionnaires
create table public.questionnaires (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'completed', 'generating', 'done')),
  current_step integer not null default 1,
  answers jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.questionnaires enable row level security;
create policy "Users can CRUD own questionnaires"
  on public.questionnaires for all using (auth.uid() = user_id);
create index idx_questionnaires_user on public.questionnaires(user_id);

-- Deliverables
create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  questionnaire_id uuid not null references public.questionnaires(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  template_id text not null,
  title text not null,
  content text,
  status text not null default 'pending' check (status in ('pending', 'generating', 'completed', 'error')),
  error_message text,
  model_used text,
  tokens_used integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.deliverables enable row level security;
create policy "Users can CRUD own deliverables"
  on public.deliverables for all using (auth.uid() = user_id);
create index idx_deliverables_questionnaire on public.deliverables(questionnaire_id);

-- Generation Logs (for cost tracking)
create table public.generation_logs (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid references public.deliverables(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  template_id text not null,
  prompt_tokens integer,
  completion_tokens integer,
  duration_ms integer,
  error text,
  created_at timestamptz default now()
);

alter table public.generation_logs enable row level security;
create policy "Users can view own logs"
  on public.generation_logs for select using (auth.uid() = user_id);
