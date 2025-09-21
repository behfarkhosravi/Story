import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fghiorbmrxttcfzdkike.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnaGlvcmJtcnh0dGNmemRraWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTk3NTUsImV4cCI6MjA3NDAzNTc1NX0.PkiBH2gwlWUrU-a3LENrMsczjUN4gnQAKsSUs5ufQJg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
