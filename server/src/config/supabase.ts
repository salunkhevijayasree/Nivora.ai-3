import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
}

/**
 * Server-side Supabase client using the service_role key.
 * This bypasses RLS and has full database access.
 * NEVER expose this client or key to the frontend.
 */
export const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Anon-level client for operations that should respect RLS.
 */
export const supabaseAnon: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export { supabaseUrl, supabaseAnonKey };
