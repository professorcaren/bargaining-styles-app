(function () {
  "use strict";

  const screens = {
    intro: document.getElementById("screen-intro"),
    quiz: document.getElementById("screen-quiz"),
    results: document.getElementById("screen-results"),
  };

  const els = {
    begin: document.getElementById("btn-begin"),
    restart: document.getElementById("btn-restart"),
    back: document.getElementById("btn-back"),
    options: document.getElementById("options"),
    progressFill: document.getElementById("progress-fill"),
    progressText: document.getElementById("progress-text"),
    chart: document.getElementById("chart"),
    profile: document.getElementById("profile"),
    allStylesBody: document.getElementById("all-styles-body"),
  };

  let session = null;
  let itemsBank = [];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function setBeginReady(isReady, label) {
    els.begin.disabled = !isReady;
    els.begin.textContent = label;
  }

  function showLoadError(message) {
    const existing = screens.intro.querySelector("[data-load-error]");
    if (existing) existing.remove();
    const error = document.createElement("p");
    error.className = "meta";
    error.dataset.loadError = "true";
    error.textContent = message;
    screens.intro.insertBefore(error, els.begin);
  }

  function normalizeMarkdownLine(line) {
    return line
      .replace(/\[\]\{[^}]*\}/g, "")
      .replace(/\\_/g, "_")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseItems(markdown) {
    const rawLines = markdown.replace(/\r/g, "").split("\n");
    const blocks = [];
    let current = null;

    rawLines.forEach((rawLine) => {
      const line = normalizeMarkdownLine(rawLine);
      if (!line) return;

      const itemMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (itemMatch) {
        if (current) blocks.push(current);
        current = {
          id: Number(itemMatch[1]),
          lines: itemMatch[2] ? [itemMatch[2]] : [],
        };
        return;
      }

      if (current) current.lines.push(line);
    });

    if (current) blocks.push(current);

    const items = blocks.map((block) => {
      const pair = block.lines
        .filter((line) => !/^I select\b/i.test(line))
        .map((line) => {
          const optionMatch = line.match(/^([A-E])\.\s+(.+)$/);
          if (!optionMatch) return null;

          return {
            letter: optionMatch[1],
            text: optionMatch[2].replace(/\s+I select\b.*$/i, "").trim(),
          };
        })
        .filter(Boolean);

      if (pair.length !== 2) {
        throw new Error("Expected 2 options for item " + block.id + ", found " + pair.length + ".");
      }

      return {
        id: block.id,
        pair,
      };
    });

    if (items.length !== 30) {
      throw new Error("Expected 30 items, found " + items.length + ".");
    }

    return items;
  }

  async function loadItems() {
    const response = await fetch(ITEMS_SOURCE, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Could not load " + ITEMS_SOURCE + " (" + response.status + ").");
    }

    const markdown = await response.text();
    return parseItems(markdown);
  }

  function startQuiz() {
    const orderedItems = shuffle(itemsBank).map((item) => ({
      id: item.id,
      pair: shuffle(item.pair),
    }));
    session = {
      items: orderedItems,
      index: 0,
      answers: [],
    };
    renderQuestion();
    showScreen("quiz");
  }

  function renderQuestion() {
    const item = session.items[session.index];
    const total = session.items.length;
    const n = session.index + 1;

    els.progressText.textContent = n + " / " + total;
    els.progressFill.style.width = ((n - 1) / total * 100) + "%";

    els.options.innerHTML = "";
    item.pair.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.type = "button";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => recordAnswer(opt.letter), { once: true });
      els.options.appendChild(btn);
    });

    els.back.hidden = session.index === 0;
  }

  function recordAnswer(letter) {
    session.answers[session.index] = letter;
    if (session.index + 1 < session.items.length) {
      session.index += 1;
      renderQuestion();
    } else {
      els.progressFill.style.width = "100%";
      showResults();
    }
  }

  function goBack() {
    if (session.index === 0) return;
    session.index -= 1;
    session.answers.pop();
    renderQuestion();
  }

  function tallyScores() {
    const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    session.answers.forEach((letter) => {
      if (counts[letter] !== undefined) counts[letter] += 1;
    });
    const byStyle = {};
    Object.keys(counts).forEach((letter) => {
      const style = LETTER_TO_STYLE[letter];
      byStyle[style] = counts[letter];
    });
    return byStyle;
  }

  function findDominant(scores) {
    const max = Math.max(...Object.values(scores));
    return STYLE_ORDER.filter((s) => scores[s] === max);
  }

  function renderChart(scores, dominantStyles) {
    els.chart.innerHTML = "";
    const max = Math.max(...Object.values(scores), 1);
    STYLE_ORDER.forEach((style) => {
      const row = document.createElement("div");
      row.className = "chart-row";
      if (dominantStyles.includes(style)) row.classList.add("dominant");

      const label = document.createElement("div");
      label.className = "chart-label";
      label.textContent = style;

      const track = document.createElement("div");
      track.className = "chart-track";
      const fill = document.createElement("div");
      fill.className = "chart-fill";
      fill.style.width = "0%";
      track.appendChild(fill);

      const value = document.createElement("div");
      value.className = "chart-value";
      value.textContent = scores[style];

      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(value);
      els.chart.appendChild(row);

      requestAnimationFrame(() => {
        fill.style.width = (scores[style] / max * 100) + "%";
      });
    });
  }

  function renderProfile(dominantStyles) {
    els.profile.innerHTML = "";
    if (dominantStyles.length === 1) {
      const style = dominantStyles[0];
      const profile = STYLE_PROFILES[style];
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = profile.tag;
      const h2 = document.createElement("h2");
      h2.textContent = "Your dominant style: " + style;
      const lead = document.createElement("p");
      lead.innerHTML = "<strong>" + profile.short + "</strong>";
      els.profile.appendChild(tag);
      els.profile.appendChild(h2);
      els.profile.appendChild(lead);
      profile.long.forEach((para) => {
        const p = document.createElement("p");
        p.textContent = para;
        els.profile.appendChild(p);
      });
    } else {
      const h2 = document.createElement("h2");
      h2.textContent = "Tied at the top: " + dominantStyles.join(" + ");
      els.profile.appendChild(h2);
      const intro = document.createElement("p");
      intro.textContent = "Your scores are tied across more than one style. That usually means your default depends heavily on context — read each profile below and notice which one fits which situations in your life.";
      els.profile.appendChild(intro);
      dominantStyles.forEach((style) => {
        const profile = STYLE_PROFILES[style];
        const h3 = document.createElement("h3");
        h3.style.marginTop = "16px";
        h3.style.marginBottom = "4px";
        h3.style.fontSize = "16px";
        h3.textContent = style + " — " + profile.short;
        const p = document.createElement("p");
        p.textContent = profile.long[0];
        els.profile.appendChild(h3);
        els.profile.appendChild(p);
      });
    }
  }

  function renderAllStyles() {
    els.allStylesBody.innerHTML = "";
    STYLE_ORDER.forEach((style) => {
      const profile = STYLE_PROFILES[style];
      const h3 = document.createElement("h3");
      h3.textContent = style;
      const p = document.createElement("p");
      p.textContent = profile.one;
      els.allStylesBody.appendChild(h3);
      els.allStylesBody.appendChild(p);
    });
  }

  function showResults() {
    const scores = tallyScores();
    const dominant = findDominant(scores);
    renderChart(scores, dominant);
    renderProfile(dominant);
    renderAllStyles();
    showScreen("results");
  }

  els.begin.addEventListener("click", startQuiz);
  els.restart.addEventListener("click", startQuiz);
  els.back.addEventListener("click", goBack);

  setBeginReady(false, "Loading items...");
  loadItems()
    .then((items) => {
      itemsBank = items;
      setBeginReady(true, "Begin");
    })
    .catch((error) => {
      console.error(error);
      setBeginReady(false, "Items unavailable");
      showLoadError("The questionnaire items could not be loaded from " + ITEMS_SOURCE + ".");
    });
})();
