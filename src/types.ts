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
    id: 'about',
    label: 'About',
    description: 'Background & detailed inquiry',
    href: 'about.html',
  },
  {
    id: 'website',
    label: 'Websites',
    description: 'Tools to help people in everyday life',
    href: 'website.html',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Say hello & connect',
    href: 'contact.html',
  },
];
