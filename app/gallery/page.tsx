import { redirect } from 'next/navigation';

// The gallery has been merged into The Cafe page.
export default function GalleryRedirect() {
  redirect('/the-cafe');
}
