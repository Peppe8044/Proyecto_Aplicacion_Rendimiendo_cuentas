import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Tipos para las respuestas de Supabase
export interface Boleta {
  id: number
  nombre_archivo: string
  text: string | null
  merchant: string | null
  total_amount: number | null
  date: string | null
  confidence: number | null
  fecha: string
  user_id: string
}

export interface BoletaListResponse {
  items: Boleta[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface OCRResponse {
  success: boolean
  boleta?: Boleta
  error?: string
}
