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

export type SimpleNavLink    = { type: 'link';     label: string; href: string }
export type DropdownNavGroup = { type: 'dropdown'; label: string; children: { label: string; href: string }[] }
export type NavItem = SimpleNavLink | DropdownNavGroup

export const NAV_LINKS: NavItem[] = [
  { type: 'link',     label: 'Home',      href: '/' },
  { type: 'dropdown', label: 'About',     children: [
    { label: 'Our Story', href: '/our-story' },
    { label: 'The Cafe',  href: '/the-cafe'  },
  ]},
  { type: 'link',     label: 'Menu',      href: '/menu' },
  { type: 'link',     label: 'Events',    href: '/events' },
  { type: 'dropdown', label: 'Community', children: [
    { label: 'Podcast',    href: '/podcast'    },
    { label: 'The First Circle', href: '/the-circle' },
    { label: 'Blog',       href: '/blog'       },
    { label: 'The Bean Club', href: '/loyalty' },
  ]},
]
