export interface NavChildItem {
  id: string;
  label: string;
  description: string;
  href: string;
  badge?: string;
  isCategoryTitle?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  description: string;
  href?: string;
  isGroup?: boolean;
  children?: NavChildItem[];
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
    id: 'online-projects',
    label: 'Online Projects',
    description: 'Websites, UX/UI, and Social Media',
    isGroup: true,
    children: [
      {
        id: 'website',
        label: 'Websites',
        description: 'Everyday tools & web applications',
        href: 'website.html',
        badge: '4 tools',
      },
      {
        id: 'ux-ui',
        label: 'UX/UI',
        description: 'Product interfaces & design systems',
        href: 'ux-ui.html',
        badge: 'Design',
      },
      // Social Media is just a title with two subpages: YouTube and Instagram
      {
        id: 'social-media-title',
        label: 'Social Media',
        description: 'Public channels & creative content',
        href: '',
        isCategoryTitle: true,
      },
      {
        id: 'youtube',
        label: 'YouTube',
        description: '3 channels · video essays & gaming',
        href: 'youtube.html',
        badge: '3 channels',
      },
      {
        id: 'instagram',
        label: 'Instagram',
        description: 'Visual journal & photography',
        href: 'instagram.html',
        badge: 'Journal',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Say hello & connect',
    href: 'contact.html',
  },
];
