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
  ]},
]
