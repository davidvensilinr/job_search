-- Run this in Supabase SQL Editor

-- Jobs table
create table if not exists jobs (
  id bigint generated always as identity primary key,
  company_name text,
  lpa numeric(10,2),
  skills text,
  experience_needed numeric(10,2),
  logo text
);

-- User profiles table (stores KNN inputs)
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  skills text,
  experience numeric(5,2) default 0,
  updated_at timestamptz default now()
);

-- RLS
alter table jobs enable row level security;
alter table user_profiles enable row level security;

create policy "Public read jobs" on jobs for select using (true);

create policy "Users read own profile" on user_profiles for select using (auth.uid() = id);
create policy "Users insert own profile" on user_profiles for insert with check (auth.uid() = id);
create policy "Users update own profile" on user_profiles for update using (auth.uid() = id);
