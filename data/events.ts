export type EventType = 'at-the-bean' | 'collab' | 'pop-up';
export type EventStatus = 'upcoming' | 'past' | 'sold-out';

export interface EventEntry {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  venue: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: EventStatus;
  accentColor: string;
  mascot?: string;
  posterImage?: string;
  rsvpLink?: string;
}

export const eventCategories: { id: EventType; label: string; description: string }[] = [
  { id: 'at-the-bean', label: 'At The Bean', description: 'Events happening right here at The 11th Bean.' },
  { id: 'collab', label: 'Collab', description: 'Co-hosted with other spaces, brands and collectives.' },
  { id: 'pop-up', label: 'Pop-Up', description: 'One-day experiences — markets, tastings, and surprise guests.' },
];

export const events: EventEntry[] = [
  {
    id: 'matcha-run-may',
    title: 'Matcha Run',
    type: 'collab',
    date: '2026-05-03',
    time: '7:00 AM – 9:30 AM',
    venue: 'The 11th Bean, Basavanagudi',
    description: 'A 3k morning lake run followed by free matcha brewing, Afro beats, and luxury essential oils.',
    longDescription: `Run, Matcha, Music.\n\nWe're teaming up with JP Nagar Runners and Oilori for the ultimate Sunday morning reset. We'll kick things off with a 3k run around a beautiful local lake. Once we wrap up, head back to the cafe to claim your free matcha and learn the art of brewing it straight from our founder, Shishir.\n\nThe cool down is just as good as the run. DJ Deemanth will be bringing the vibes with Afro music while you experience luxury essential oils by Oilori.\n\nRegistration is totally free, but we are strictly capping this at 30 spots.`,
    tags: ['run', 'matcha', 'morning', 'community'],
    status: 'past',
    accentColor: '#B8B394',
    mascot: '/mascot/marathon.svg',
    posterImage: '/event_posters/matcha_run.png',
    rsvpLink: '#rsvp-placeholder',
  },
  {
    id: 'pickleball-tournament-apr',
    title: 'Pickleball Tournament',
    type: 'collab',
    date: '2026-04-26',
    time: '9:00 AM – 1:00 PM',
    venue: 'Pickle and Play, Basavanagudi × The 11th Bean',
    description: 'Get ready to serve, volley, and smash your way to victory in our team-of-two Pickleball tournament.',
    longDescription: `We're taking the competitive spirit out of the cafe and onto the courts. In association with Scalable, The 11th Bean Sports Club is hosting a high-energy Pickleball Tournament for teams of two.\n\nThere are cash prizes and trophies on the line for the ultimate winners, but we're making the deal a tad bit sweeter. Finish anywhere in the top 3 to score heavy on cafe perks: 1st place takes home 10 free coffees, 2nd gets 6, and 3rd place bags 3.\n\nIt's time to bring your A-game and your paddle.`,
    tags: ['sport', 'pickleball', 'tournament', 'outdoor'],
    status: 'past',
    accentColor: '#C8A96E',
    mascot: '/mascot/pickleball.svg',
    posterImage: '/event_posters/pickleball_tournament.png',
  },
  {
    id: 'grounds-for-suspicion-jan',
    title: 'Grounds for Suspicion',
    type: 'at-the-bean',
    date: '2026-01-31',
    time: '6:11 PM – 9:00 PM',
    venue: 'The 11th Bean, Basavanagudi',
    description: 'An interactive mystery game night at the cafe. Study case materials, make your inferences, and see if you can solve the mystery.',
    longDescription: `Grab your magnifying glass and prepare for an interactive mystery game night.\n\nWhether you want to play as a lone wolf or form an investigative team (2-4 players), your goal is to study, interpret, and infer from the provided case materials. Present your conclusion and find out if you cracked the case.\n\nRegistered investigators get exclusive game-night privileges: 11% off all drink purchases, special gifts for the winning team, and 3 lucky detectives will enjoy drinks on us.`,
    tags: ['game-night', 'mystery', 'evening', 'interactive'],
    status: 'past',
    accentColor: '#2A2320',
    mascot: '/mascot/game_night.svg',
    posterImage: '/event_posters/grounds_of_suspicion.png',
  },
  {
    id: 'terrarium-workshop-dec',
    title: 'Terrarium Workshop',
    type: 'collab',
    date: '2025-12-13',
    time: '11:00 AM – 1:00 PM',
    venue: 'The 11th Bean, Basavanagudi',
    description: 'Build your own miniature ecosystem. A hands-on terrarium crafting session led by Mr. Rishi Kiran.',
    longDescription: `Bring a little piece of nature indoors with our hands-on terrarium building workshop.\n\nLed by plant expert Mr. Rishi Kiran, this session will guide you through the process of designing, planting, and caring for your very own self-sustaining glass ecosystem. You'll learn about the right soil layers, plant selection, and moisture balance needed to keep your terrarium thriving.\n\nRegistration is Rs 2310 and includes all materials, plants, and the glass vessel. The best part? You get to take home the terrarium you design.`,
    tags: ['workshop', 'plants', 'nature', 'hands-on'],
    status: 'past',
    accentColor: '#B8B394',
    mascot: undefined,
    posterImage: '/event_posters/terranium_workshop.png',
  },
  {
    id: 'pickleball-league-s1-may',
    title: 'The 11th Bean Pickleball League — Season 1',
    type: 'at-the-bean',
    date: 'TBD',
    time: 'Flexible Start',
    venue: 'Basavanagudi / Jayanagar',
    description: 'From a 1-day tournament to a structured league. A 3-week pickleball season with two tiers, rankings, playoffs, and DUPR tracking support.',
    longDescription: `The 11th Bean Sports Club is going bigger. What started as a one-day tournament is now a full-blown structured league — and Season 1 is here.\n\nPlayers are split across two tiers: Prathama (Top League) and Dwitheeya (Challenger League). Every match is played to 11, with rankings tracked throughout the 3-week season leading into playoffs. Top performers get promoted; bottom finishers get relegated — so every point counts.\n\nThe league also includes full DUPR tracking support, trophies, medals, and cash prizes for standout players. Entry is ₹999 per player (not per team), and spots are strictly capped at 60.\n\nDM "IN" on 8105585901 to join.`,
    tags: ['sport', 'pickleball', 'league', 'outdoor', 'competitive'],
    status: 'upcoming',
    accentColor: '#3B5C2F',
    mascot: '/mascot/pickleball.svg',
    posterImage: '/event_posters/pickleball_league_s1.png',
    rsvpLink: '#rsvp-placeholder',
  },
];

