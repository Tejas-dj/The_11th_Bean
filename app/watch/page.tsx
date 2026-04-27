import { redirect } from 'next/navigation';

// The Watch page has been replaced by the Events page.
// Redirect any old /watch links to /events.
export default function WatchRedirect() {
  redirect('/events');
}
