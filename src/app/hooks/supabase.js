import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

let supabase

if (!global.supabase) {
  global.supabase = createClient(supabaseUrl, supabaseKey)
}

supabase = global.supabase

export default supabase
