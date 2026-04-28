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

// Profile descriptions shown on results screen. Each style has a short
// summary used as the dominant-style narrative and a one-liner used in the
// "About all five styles" disclosure. Original prose, written about the
// well-known five-style conflict framework — edit freely for voice.
const STYLE_PROFILES = {
  Competing: {
    tag: "Assertive · Low concern for relationship",
    short: "You go after what you want.",
    long: [
      "Your instinct is to advocate hard for your own goals. You are comfortable with conflict, ready to argue your position, and confident framing the negotiation as something to win.",
      "This serves you well in transactional, time-pressured, or low-relationship situations. Your risk is treating every negotiation as a contest — which is expensive in long-term relationships and in situations where the other side has information you need.",
      "Stretch: practice asking one genuine question before making your case.",
    ],
    one: "Goes after what they want; comfortable with conflict; risks running over relationships.",
  },
  Collaborating: {
    tag: "Assertive · High concern for relationship",
    short: "You look for solutions that work for everyone.",
    long: [
      "Your instinct is to dig past stated positions to find underlying interests, then build a deal that addresses both sides' priorities. You enjoy complexity and see negotiation as a problem-solving exercise.",
      "This is the style most negotiation textbooks elevate. Its risks are real, though: collaborators can over-engineer simple deals, lose patience with people who want to be done, and leave value on the table when paired with someone who is willing to compete hard.",
      "Stretch: notice when the situation does not actually call for collaboration, and let it be simpler.",
    ],
    one: "Hunts for joint solutions; comfortable with complexity; can over-engineer simple situations.",
  },
  Compromising: {
    tag: "Moderate on both axes",
    short: "You find the middle.",
    long: [
      "Your instinct is to reach a workable settlement quickly by splitting differences and finding a fair midpoint. You read fairness signals well and dislike protracted standoffs.",
      "Compromise is functional and underrated — it gets deals done. The risk is reaching for the midpoint reflexively, before you have explored whether a better trade is available, or before you have tested whether the situation actually calls for holding firm.",
      "Stretch: before splitting the difference, ask whether one more round of exploration could find something better.",
    ],
    one: "Splits differences; reaches settlements quickly; risks settling before exploring.",
  },
  Avoiding: {
    tag: "Unassertive · Low concern for relationship",
    short: "You step back from negotiation when you can.",
    long: [
      "Your instinct is to defer, defuse, or sidestep. You are sensitive to the costs of conflict — to the relationship, to the moment, to your own composure — and you weigh those costs heavily.",
      "Avoiding is a real strategy, not an absence of one. It works when the issue is not worth the engagement, when timing is wrong, or when you need information first. The risk is that avoidance becomes the default even when the situation calls for action — so things you cared about get decided without you in the room.",
      "Stretch: pick one negotiation per week where avoidance is the easier choice, and engage anyway.",
    ],
    one: "Defers and defuses; preserves composure; risks letting things be decided without them.",
  },
  Accommodating: {
    tag: "Unassertive · High concern for relationship",
    short: "You take care of the relationship.",
    long: [
      "Your instinct is to attend to the other person's needs, smooth disagreements, and protect the relationship. You read emotional weather well and people often feel heard around you.",
      "This style is genuinely valuable — many negotiations are repeat games, and people remember who treated them well. The risk is that you give ground you did not need to give, especially against a strong competitor, and you may feel the cost as resentment afterward.",
      "Stretch: in the next negotiation, identify one issue where you will not concede first. Let the silence sit.",
    ],
    one: "Attends to the relationship; reads emotion well; risks giving ground that did not need to be given.",
  },
};
