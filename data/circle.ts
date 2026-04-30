export interface CircleMember {
  id: string;
  name: string;
  handle: string;
  handleUrl: string;
  category: string;
  tagline: string;
  shishirSays: string;
  regularSince: string;
  bgColor: string;
  photo?: string; // /public/circle/[id].jpg — add once real photo exists
}

export const CATEGORY_COLORS: Record<string, string> = {
  Music:       '#C8A96E',
  Photography: '#A0674B',
  Design:      '#B8B394',
  Food:        '#8B6D4A',
  Tech:        '#2A2320',
  Art:         '#C8A96E',
  Other:       '#B8B394',
};
