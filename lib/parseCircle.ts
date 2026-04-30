import fs from 'fs';
import path from 'path';
import type { CircleMember } from '@/data/circle';

/**
 * Reads `the-circle.md` from the project root and parses it into CircleMember objects.
 *
 * Format expected in the markdown:
 *
 *   ## Full Name
 *   id: the-id
 *   category: Music
 *   handle: @handle
 *   url: https://...
 *   tagline: What they do.
 *   since: 2023
 *   color: #2A2320
 *   photo: filename.jpg        ← optional; leave blank if no photo yet
 *   shishir_says: Quote text here.
 *
 * Each member block is separated by --- or a new ## heading.
 */
export function getCircleMembers(): CircleMember[] {
  const filePath = path.join(process.cwd(), 'the-circle.md');

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch {
    console.warn('[circle] the-circle.md not found — returning empty list');
    return [];
  }

  const members: CircleMember[] = [];

  // Only parse the section after <!-- MEMBERS_START --> to ignore the instructions block
  const startMarker = '<!-- MEMBERS_START -->';
  const startIdx = raw.indexOf(startMarker);
  const content = startIdx !== -1 ? raw.slice(startIdx + startMarker.length) : raw;

  // Split on lines that start with `## ` — each is a member heading
  const sections = content.split(/\n(?=## )/);

  for (const section of sections) {
    const lines = section.split('\n').map((l) => l.trim());

    // First line must start with `## ` (the name)
    if (!lines[0].startsWith('## ')) continue;

    const name = lines[0].replace(/^##\s+/, '').trim();
    if (!name) continue;

    // Collect key: value pairs from the rest of the block
    const fields: Record<string, string> = {};
    for (const line of lines.slice(1)) {
      const match = line.match(/^(\w+):\s*(.*)/);
      if (match) {
        const [, key, value] = match;
        fields[key] = value.trim();
      }
    }

    // Require at minimum: id and category
    if (!fields.id || !fields.category) continue;

    members.push({
      id:           fields.id,
      name,
      handle:       fields.handle  ?? '',
      handleUrl:    fields.url     ?? '#',
      category:     fields.category,
      tagline:      fields.tagline ?? '',
      shishirSays:  fields.shishir_says ?? '',
      regularSince: fields.since   ?? '',
      bgColor:      fields.color   ?? '#2A2320',
      photo:        fields.photo   || undefined,
    });
  }

  return members;
}
