// data.js — configuration and profiles for the Bargaining Styles self-assessment app
//
// Item text is loaded from `bsi-items.md` at runtime. The markdown parser in
// `app.js` preserves the source instrument's A/B/C/D/E letters so scoring still
// maps cleanly through LETTER_TO_STYLE below.
//
// Letter → style mapping (standard Thomas-Kilmann descendant convention):
//   A = Competing
//   B = Collaborating
//   C = Compromising
//   D = Avoiding
//   E = Accommodating

const LETTER_TO_STYLE = {
  A: "Competing",
  B: "Collaborating",
  C: "Compromising",
  D: "Avoiding",
  E: "Accommodating",
};

const STYLE_ORDER = ["Competing", "Collaborating", "Compromising", "Avoiding", "Accommodating"];

const ITEMS_SOURCE = "bsi-items.md";

// Raw-score cut points transcribed from the percentile grid in Appendix A of
// Bargaining for Advantage. "High" corresponds to the 70th percentile or
// higher; "Low" corresponds to the 30th percentile or lower.
const STYLE_BANDS = {
  Competing: { lowMax: 3, highMin: 7 },
  Collaborating: { lowMax: 4, highMin: 8 },
  Compromising: { lowMax: 5, highMin: 8 },
  Avoiding: { lowMax: 3, highMin: 7 },
  Accommodating: { lowMax: 3, highMin: 7 },
};

// Profile descriptions shown on results screen. Each style has a high-score
// interpretation, a low-score interpretation, and a short generic blurb used
// in the "General sketches of the five styles" disclosure.
const STYLE_PROFILES = {
  Competing: {
    tag: "Assertive · Low concern for relationship",
    short: "You go after what you want.",
    long: [
      "You are likely to enjoy negotiating when the stakes are high and the setting rewards leverage, pressure, deadlines, and sharp distributive moves.",
      "This can be an advantage in transactional bargaining, but Appendix A warns that high competitors can be hard on relationships and may focus too narrowly on issues that are easiest to count as wins and losses.",
      "Stretch: before you press your position, identify one nonquantitative issue and ask one question that might expand value instead of just claiming it.",
    ],
    low: "A low competing score usually means you come across as nonthreatening and trustworthy, but you may be at a disadvantage when large stakes are on the table.",
    one: "Goes after what they want; comfortable with conflict; risks running over relationships.",
  },
  Collaborating: {
    tag: "Assertive · High concern for relationship",
    short: "You look for solutions that work for everyone.",
    long: [
      "You are likely to enjoy negotiation as an engaged problem-solving process and to probe beneath surface positions for interests, perceptions, and new options.",
      "Appendix A treats this as a major strength, but it also warns that high collaborators can overcomplicate simple situations and may need stronger claiming skills to hold their own against a very competitive counterpart.",
      "Stretch: check whether the situation really calls for deep joint problem solving, or whether a simpler agreement would do the job.",
    ],
    low: "A low collaborating score often means you prefer clarity, structure, and a preset agenda, but you may become a bottleneck when a negotiation needs real-time brainstorming.",
    one: "Hunts for joint solutions; comfortable with complexity; can over-engineer simple situations.",
  },
  Compromising: {
    tag: "Moderate on both axes",
    short: "You find the middle.",
    long: [
      "You are likely to look for fair standards, close gaps, and reach closure efficiently, especially when time is short or the stakes are modest.",
      "Appendix A notes that high compromisers are often seen as reasonable, but they can rush the process, make concessions too quickly, and settle on the first fair standard before testing whether a better deal is available.",
      "Stretch: before splitting the difference, ask one more question about standards, interests, or trades that could improve the deal.",
    ],
    low: "A low compromising score often reflects principle and commitment, but it can also make you seem stubborn or make it harder to close when time is short.",
    one: "Splits differences; reaches settlements quickly; risks settling before exploring.",
  },
  Avoiding: {
    tag: "Unassertive · Low concern for relationship",
    short: "You step back from negotiation when you can.",
    long: [
      "You are likely to use tact, diplomacy, delay, structure, or intermediaries to reduce direct confrontation in negotiation.",
      "Appendix A treats that as a real strength in some settings, but it also warns that high avoiders can let important conflicts fester and may pass up opportunities to ask for things that others would willingly grant.",
      "Stretch: when you feel the impulse to sidestep, ask whether the issue is truly low value or whether you are about to leave something important unspoken.",
    ],
    low: "A low avoiding score usually means you have a high tolerance for candid conflict, but others may experience you as overly confrontational or tactless.",
    one: "Defers and defuses; preserves composure; risks letting things be decided without them.",
  },
  Accommodating: {
    tag: "Unassertive · High concern for relationship",
    short: "You take care of the relationship.",
    long: [
      "You are likely to derive satisfaction from solving other people's problems and from preserving the relationship around the negotiation.",
      "Appendix A treats this as a genuine strength in team settings, service roles, and relationship management, while also warning that high accommodators can overweight the relationship and become vulnerable to more competitive counterparts.",
      "Stretch: name one issue in advance on which you will not concede first, so concern for the relationship does not automatically become unilateral concession.",
    ],
    low: "A low accommodating score often means you stay attached to what you see as the objectively right answer, but others may read that as stubbornness or indifference to their concerns.",
    one: "Attends to the relationship; reads emotion well; risks giving ground that did not need to be given.",
  },
};
