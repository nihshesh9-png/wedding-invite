// ============================================================
//  EDIT THIS FILE ONLY — everything on the invitation comes from here.
//  Put your photos in assets/photos/ and reference them below.
// ============================================================
window.WEDDING = {
  partner1: "Nihshesh",
  partner2: "Khyati",
  surname1: "Dixit", surname2: "Vats",
  tagline: "are getting married",

  // ISO date-time, local time of the venue
  date: "2027-01-26T17:00:00",
  dateText: "Tuesday, 26 January 2027",

  // ---- Opening animation -----------------------------------
  // Option A: a video made with Gemini/Veo etc. (put file in assets/intro/)
  //   introVideo: "assets/intro/intro.mp4",
  // Option B: leave empty to use the built-in animated envelope.
  introVideo: "", // e.g. "assets/intro/intro.mp4"
  introHint: "Tap to open your invitation",

  // Optional background music (put file in assets/), or "" for none
  music: "",

  heroPhoto: "assets/photos/hero.jpg", // falls back to a gradient if missing

  // ---- Our story -------------------------------------------
  story: [
    { when: "The Beginning", title: "Two strangers",    text: "Somewhere between a hello and a very long conversation, we forgot how to say goodbye.", photo: "assets/photos/story1.jpg" },
    { when: "The Friendship", title: "Our favourite person", text: "Turns out the best love stories start with someone who laughs at your worst jokes.", photo: "assets/photos/story2.jpg" },
    { when: "The Moment",  title: "She said yes",       text: "One question, one nervous smile, and a yes that changed everything.", photo: "assets/photos/story3.jpg" },
    { when: "Forever",     title: "And now, the wedding", text: "Come celebrate with us — the story is better with you in it.", photo: "" }
  ],

  // ---- Gallery ---------------------------------------------
  gallery: [
    "assets/photos/g1.jpg", "assets/photos/g2.jpg", "assets/photos/g3.jpg",
    "assets/photos/g4.jpg", "assets/photos/g5.jpg", "assets/photos/g6.jpg"
  ],

  // ---- Events ----------------------------------------------
  events: [
    { name: "Mehendi",   time: "24 Jan · 4:00 PM", place: "Family Home" },
    { name: "Ceremony",  time: "26 Jan · 5:00 PM", place: "The Grand Venue" },
    { name: "Reception", time: "26 Jan · 8:00 PM", place: "The Grand Venue" }
  ],

  venue: {
    name: "The Grand Venue",
    address: "123 Example Road, City, Country",
    mapsLink: "https://maps.google.com/?q=Your+Venue" // paste your Google Maps share link
  },

  // ---- RSVP ------------------------------------------------
  // Pick one: whatsapp (number with country code, digits only), email, or formLink (Google Form)
  rsvp: {
    whatsapp: "910000000000",
    email: "",
    formLink: "",
    deadlineText: "Please reply by 10 January 2027"
  },

  footerNote: "With love, and hoping to celebrate with you."
};
