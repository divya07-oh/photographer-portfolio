const WEDDING_ENGAGEMENT_SERVICES = [
  { name: 'Traditional Photography', price: 10000, desc: 'Classic and timeless photography.' },
  { name: 'Traditional Video', price: 12000, desc: 'Comprehensive video coverage.' },
  { name: 'Candid Photography', price: 18000, desc: 'Capturing natural, unposed moments.' },
  { name: 'Candid Video', price: 24000, desc: 'Cinematic storytelling of your day.' },
  { name: 'Album', price: 22000, desc: 'Premium photobook of your memories.' },
  { name: 'Photo Booth', price: 22000, desc: 'Interactive fun for your guests.' },
  { name: '360 degree photo booth', price: 12000, desc: 'Immersive 360-degree videos.' },
  { name: 'Drone Coverage', price: 15000, desc: 'Breathtaking aerial shots.' },
  { name: 'LED Wall (6×8)', price: 20000, desc: 'Dynamic visual display for your venue.' },
  { name: 'Canvera album 25 sheet', price: 25000, desc: 'Premium Canvera album (25 sheets).' },
  { name: 'Mini album 30 sheet', price: 3500, desc: 'Compact mini album (30 sheets).' },
  { name: 'Livestreaming (4hrs)', price: 12000, desc: 'Professional livestreaming service for 4 hours.' },
];

const PRE_POST_WEDDING_SERVICES = [
  { name: 'Candid Photography', price: 8000, desc: 'Authentic candid moments.' },
  { name: 'Candid Video', price: 13000, desc: 'Cinematic storytelling.' },
  { name: 'Album', price: 20000, desc: 'Premium pre/post wedding photobook.' },
];

const EVENT_SERVICES = [
  { name: 'Traditional Photography', price: 8000, desc: 'Classic event coverage.' },
  { name: 'Traditional Video', price: 10000, desc: 'Professional event videography.' },
  { name: 'Candid Photography', price: 14000, desc: 'Authentic candid moments.' },
  { name: 'Candid Video', price: 16000, desc: 'Highlight reels and cinematic cuts.' },
  { name: 'Album', price: 15000, desc: 'Beautiful event photobook.' },
];

export const PRICING = {
  'Wedding': WEDDING_ENGAGEMENT_SERVICES,
  'Engagement': WEDDING_ENGAGEMENT_SERVICES,
  'Pre & Post Wedding': PRE_POST_WEDDING_SERVICES,
  'Birthday': EVENT_SERVICES,
  'Puberty Ceremony': EVENT_SERVICES,
};

export const CUSTOMER_CATEGORIES = {
  'wedding-engagement': {
    title: 'Wedding & Engagement',
    heading: 'Wedding & Engagement Photography',
    description: 'Capture every special moment with photography and cinematic coverage tailored to your wedding or engagement celebration.',
    services: WEDDING_ENGAGEMENT_SERVICES
  },
  'pre-post-wedding': {
    title: 'Pre & Post Wedding',
    heading: 'Pre & Post Wedding Photography',
    description: 'Capture your journey and special moments before and after your wedding with cinematic photography and video coverage.',
    services: PRE_POST_WEDDING_SERVICES
  },
  'event': {
    title: 'Event',
    heading: 'Event Photography',
    description: 'Professional photography and video coverage for birthdays, puberty ceremonies and special events.',
    subLabels: ['Birthday', 'Puberty Ceremony'],
    services: EVENT_SERVICES
  }
};
