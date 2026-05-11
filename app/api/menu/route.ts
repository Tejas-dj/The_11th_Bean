import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';

// Revalidate the menu data in the background every 60 minutes.
// The first request builds the cached page; all subsequent requests
// are served from the edge cache until it expires.
export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, name, price, is_active, category, created_at')
    .eq('is_active', true)
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] }, {
    headers: {
      // Tell the browser to cache for 5 minutes and allow stale-while-revalidate
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
    },
  });
}
