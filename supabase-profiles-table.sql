-- =====================================
-- Profiles Table (for Profile Page)
-- =====================================
create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    phone text,
    avatar_url text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Create policies
create policy "Users can view own profile" on profiles
    for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
    for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
    for insert with check (auth.uid() = id);

-- Create index
create index idx_profiles_id on profiles(id);

-- Function to automatically create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();