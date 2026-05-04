import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return _client;
}

// Proxy so the module can be evaluated at build time without env vars being set.
// The actual client is only created on first use (browser-side).
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop: string) {
    return (getClient() as unknown as Record<string, unknown>)[prop];
  },
});
