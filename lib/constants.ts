export const COLORS = {
  cream:      '#F2E8D9',
  creamLight: '#FAF7F2',
  sage:       '#B8B394',
  caramel:    '#8B6D4A',
  espresso:   '#2A2320',
  rattan:     '#C8A96E',
  brick:      '#A0674B',
  boardRed:   '#C4453A',
} as const;

export const EASE_ORGANIC = [0.16, 1, 0.3, 1] as const;

export const BREAKPOINTS = {
  mobile:  767,
  tablet:  1023,
  desktop: 1440,
} as const;

export const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Our Story',  href: '/our-story' },
  { label: 'Menu',       href: '/menu' },
  { label: 'Events',     href: '/events' },
  { label: 'The Cafe',   href: '/the-cafe' },
  { label: 'Podcast',    href: '/podcast' },
  { label: 'Gallery',    href: '/gallery' },
] as const;
