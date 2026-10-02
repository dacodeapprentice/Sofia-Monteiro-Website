export interface NavItem {
  id: string;
  label: string;
  description: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'hero',
    label: 'Home',
    description: 'Welcome & Introduction',
    href: 'index.html#hero',
  },
  {
    id: 'personal',
    label: 'Personal',
    description: 'Life, philosophy & reflections',
    href: 'index.html#personal',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Creations & things built over the years',
    href: 'index.html#projects',
  },
  {
    id: 'career',
    label: 'Career & Work',
    description: 'Professional experience & roles',
    href: 'index.html#career',
  },
  {
    id: 'writing',
    label: 'Writing',
    description: 'Thoughts, essays & field notes',
    href: 'index.html#writing',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Say hello & connect',
    href: 'index.html#contact',
  },
];
