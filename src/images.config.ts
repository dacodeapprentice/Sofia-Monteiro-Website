/**
 * Remote Image Registry for Sofia's Personal Website
 * All images are hosted remotely on FreeImage.host:
 * Album: https://freeimage.host/a/personal-website.HCqf1V
 *
 * Recommended file naming convention when uploading to FreeImage.host:
 * - hero_ambient_abstract.jpg      -> Sofia's luminous emerald & cyan background ribbons
 * - sofia_portrait_avatar.jpg      -> Sofia's portrait avatar photo
 * - website_01_calmflow.jpg        -> Thumbnail for website #1 (CalmFlow)
 * - website_02_pantrycraft.jpg     -> Thumbnail for website #2 (PantryCraft)
 * - website_03_kindwords.jpg       -> Thumbnail for website #3 (KindWords)
 * - project_01_aura.jpg            -> Thumbnail for project #1
 * - project_02_verdant.jpg         -> Thumbnail for project #2
 * - project_03_chronos.jpg         -> Thumbnail for project #3
 * - personal_01_studio.jpg         -> Photo for personal note #1
 * - personal_02_nature.jpg         -> Photo for personal note #2
 * - writing_01_essay.jpg           -> Cover image for essay #1
 */

export const IMAGES = {
  // Brand & Hero Imagery (Hosted on FreeImage.host / iili.io)
  HERO_AMBIENT_BG: 'https://iili.io/naGx4yb.jpg', // Abstract dark cyan & emerald luminous backdrop
  SOFIA_AVATAR: 'https://iili.io/naGxr8u.jpg',    // Sofia's portrait avatar in cyan/emerald rim light

  // Websites Page Thumbnails (Hosted links for everyday tools)
  WEBSITE_1_CALMFLOW: 'https://iili.io/naGx4yb.jpg',
  WEBSITE_2_PANTRYCRAFT: 'https://iili.io/naGx4yb.jpg',
  WEBSITE_3_KINDWORDS: 'https://iili.io/naGx4yb.jpg',

  // Project Showcase Placeholders
  PROJECT_1_AURA: 'https://iili.io/naGx4yb.jpg',
  PROJECT_2_VERDANT: 'https://iili.io/naGx4yb.jpg',
  PROJECT_3_CHRONOS: 'https://iili.io/naGx4yb.jpg',

  // Personal Life Photo Placeholders
  PERSONAL_1_STUDIO: '',
  PERSONAL_2_NATURE: '',
  PERSONAL_3_READING: '',

  // Writing / Blog Header Placeholders
  WRITING_1_ESSAY: '',
  WRITING_2_ESSAY: '',
} as const;

export default IMAGES;
