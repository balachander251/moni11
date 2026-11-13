// =============================================================
// ALL TEXT, DATES, PHOTOS, AND MUSIC ARE CONFIGURED FROM THIS FILE ONLY.
// Change the values below to personalize the website.
// See README.md for the full guide.
// =============================================================

export type Photo = {
  /** Path to a photo file inside /public, e.g. "/photos/1.jpg". Leave "" if there's no photo yet. */
  src: string;
  alt: string;
  caption: string;
};

export type TimelineEvent = {
  date: string;
  description: string;
};

export const content = {
  // --- Identity ---
  partnerName: "MONIKA",
  senderName: "Balachander",
  age: "20",
  birthdayDate: "November 15",
  relationshipStartDate: "November 07, 2024",
  /**
   * The anniversary date in ISO format "YYYY-MM-DD", used to compute the
   * live "days together" counter automatically and in real time.
   * Leave "" if you don't want to show this counter.
   */
  relationshipStartDateISO: "2024-11-07" as string,

  /**
   * Optional countdown to when you'll next see each other in person, shown
   * next to the days-together counter. Since you only know the month (not
   * the exact day), this counts down to the 1st of that month rather than
   * pretending to know a precise date. Leave nextMeetupDateISO as "" to
   * hide this countdown entirely.
   */
  nextMeetupDateISO: "2027-11-15" as string,
  nextMeetupLocation: "Madagadipet",
  nextMeetupWhenLabel: "Next Birthday🥹",

  /**
   * Optional PIN code (any number of digits). When set, visitors must enter
   * this code on a lock screen before the site unlocks — a nice way to make
   * sure only the right person opens it. Leave "" to skip the PIN screen
   * entirely.
   */
  accessPin: "151106" as string,
  /** Optional hint shown on the lock screen to help them guess the PIN. Leave "" to hide it. */
  pinHint: "Hint: the date of angel born 💛",

  // --- Love letter (each item becomes one short paragraph) ---
  loveLetterParagraphs: [
    "Moni, happy birthday. I've read this sentence back about ten times now trying to make it sound big enough for what I actually feel, and it never quite gets there so I'll just say it plainly instead.",
    "I'm so glad you exist. Not in a poetic, greeting-card way I mean it literally. Out of every timeline where we never meet, I somehow ended up in the one where I get to know you, and I don't take that for granted.",
    "You have this way of making ordinary days feel like they mattered. A random text, a dumb joke, just you existing in my day. I notice it every time, even when I don't say so.",
    "So today is about you. Every bit of it. I hope it's as soft and good to you as you are to everyone around you, and I hope you know today and every other day that you're loved. A lot. By me, Dudut.",
  ] as string[],

  // --- Wishes & prayers ---
  wishesIntro: "A few things I keep hoping for you, Moni:",
  wishes: [
    "May you always be healthy and happy.",
    "May all your dreams come true, one by one.",
    "May you always be surrounded by people who love you.",
    "May we keep finding reasons to smile together.",
    "May 20's be the year everything you've worked quietly for starts falling into place.",
  ] as string[],

  // --- Photos ---
  heroPhoto: {
    src: "/photos/3.png",
  } as Photo,
  closingPhoto: {
    src: "/photos/11.jpg.jpeg",
    alt: "Kutty angel",
    caption: "🥹",
  } as Photo,
  galleryPhotos: [
    {
      src: "/photos/2.png",
      alt: "",
      caption: "🫶",
    },
    {
      src: "/photos/1.jpg.jpeg",
      alt: "",
      caption: "💝",
    },


  ] as Photo[],

  // --- Relationship timeline ---
  timeline: [
    { date: "November 07, 2024", description: "The start of our story" },
    {
      date: "Somewhere in between",
      description:
        "Countless small moments that made me fall for you more than the last",
    },
    {
      date: "Every day since",
      description:
        "Learning what it means to actually love someone, one ordinary day at a time",
    },
    {
      date: "Today",
      description: "Still so many stories left for us to write together",
    },
  ] as TimelineEvent[],

  // --- Reasons why (each item becomes one flip card) ---
  reasonsWhy: [
    "The way you laugh at your own jokes before you even finish telling them.",
    "How you check in on me even on your busiest, most tiring days.",
    "You remember tiny little things I mention once and never bring up again.",
    "You're kind to people even when you think no one's watching.",
    "You make far away feel a little less far.",
    "You're just you, and somehow that's already more than enough.",
  ] as string[],

  // --- About the distance (each item becomes one short paragraph) ---
  distanceParagraphs: [
    "Being far from you isn't easy, Moni. Some days it's just a text that takes a little longer to send. Other days it's really feeling every kilometer that's between us.",
    "But distance hasn't shrunk how much I care, it's actually made me notice it more. Every call, every good morning text, every little update about your day means more than you probably know.",
    "This part is temporary though. This October in Malang isn't just a date on a countdown, it's us finally getting to be in the same place again.",
  ] as string[],

  // --- When we meet (bucket list for the reunion) ---
  reunionBucketList: [
    "Hug you first before saying anything else.",
    "Find whatever food you've been wanting to try there.",
    "Walk around slowly, no rush, just us.",
    "Take way too many photos we'll never actually post.",
    "Just sit somewhere quiet together and not have to say goodbye at the end.",
  ] as string[],

  // --- Surprise interactions ---
  hugMessage:
    "Sending you a warm hug, Moni. Even from far away, it still feels close.",
  secretButtonLabel: "One more thing",
  secretMessage: "I love you, Moni🥹, today and every day.",
  /** Tapping the generator button below shows a random line from this list. */
  sweetLines: [
    "You're my favorite notification.",
    "Distance is just a math problem, my feelings for you aren't.",
    "If missing you was a sport, I'd have a trophy by now.",
    "You make ordinary Tuesdays feel like something.",
    "I'd cross time zones just to hear you laugh.",
    "You're the best part of my day, every single day.",
    "Home isn't a place, it's wherever you are.",
    "Still not tired of you. Never will be.",
  ] as string[],

  // --- Background music ---
  // Put an audio file in public/music/ and fill in the path here, e.g. "/music/song.mp3"
  // A direct URL to an audio file also works — but it must point straight at
  // the audio file itself, not a YouTube/Spotify/Apple Music page. A page
  // link (like music.youtube.com/watch?v=...) will not play; the <audio>
  // tag can only stream an actual .mp3/.ogg/.wav file.
  songUrl: "/music/about-you.mp3" as string,
  songTitle: "MONI❤️",
};

export type Content = typeof content;
