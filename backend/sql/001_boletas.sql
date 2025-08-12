-- Crear tabla de boletas
create table if not exists public.boletas (
  id bigint generated always as identity primary key,
  nombre_archivo text not null,
  text text,
  merchant text,
  total_amount numeric(12,2),
  "date" date,
  confidence numeric(4,3),
  fecha timestamptz default now() not null,
  user_id uuid not null
);

-- Habilitar Row Level Security
alter table public.boletas enable row level security;

-- Crear política de seguridad: usuarios solo ven sus propias boletas
do $$
begin
  if not exists (
    select 1 from pg_policies
    where polname = 'own-rows-only' and tablename = 'boletas'
  ) then
    create policy "own-rows-only"
    on public.boletas for all
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
  end if;
end$$;

-- Crear índices para mejor performance
create index if not exists boletas_user_fecha_idx on public.boletas (user_id, fecha desc);
create index if not exists boletas_date_idx on public.boletas ("date");

-- Crear bucket de storage para imágenes (ejecutar en Supabase Dashboard)
-- insert into storage.buckets (id, name, public) values ('receipts', 'receipts', false);
-- create policy "Users can upload their own receipts" on storage.objects for insert with check (bucket_id = 'receipts' and auth.uid()::text = (storage.foldername(name))[1]);
-- create policy "Users can view their own receipts" on storage.objects for select using (bucket_id = 'receipts' and auth.uid()::text = (storage.foldername(name))[1]);
