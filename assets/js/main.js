/* ============================================================================
   MAIN — behaviour. Renders collections from data.js and wires up the UI.
   No dependencies. No build step.
   ========================================================================== */
(function () {
  "use strict";

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  /* ----------------------------- inline icons ----------------------------- */
  var ICONS = {
    code:     '<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>',
    braces:   '<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    server:   '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    spark:    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    ball:     '<circle cx="12" cy="12" r="9"/><path d="M12 3c2.5 2.4 4 5.5 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.5-4-9s1.5-6.6 4-9z"/><path d="M3.5 9h17M3.5 15h17"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7.5 8.5 6 8.5-6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    github:   '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.6 5 4.9 4.9 0 0 0 19.5 1S18.3.7 15 2.6a12.3 12.3 0 0 0-6 0C5.7.7 4.5 1 4.5 1A4.9 4.9 0 0 0 4.4 5 5.2 5.2 0 0 0 3 8.8c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V21"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
    codeRepo: '<path d="m10 9-4 3 4 3"/><path d="m14 9 4 3-4 3"/>',
    facebook: '<path fill="currentColor" stroke="none" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>',
    whatsapp: '<path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',
  };
  function icon(name, cls) {
    var p = ICONS[name] || ICONS.code;
    return '<svg class="ico ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + p + "</svg>";
  }

  /* =============================== THEME ================================= */
  var root = document.documentElement;
  var themeBtn = $("#themeToggle");
  var stored = null;
  try { stored = localStorage.getItem("mm-theme"); } catch (e) {}
  var theme = stored === "light" || stored === "dark" ? stored : "dark";

  function applyTheme(next, persist) {
    theme = next;
    root.setAttribute("data-theme", next);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", next === "light" ? "true" : "false");
      themeBtn.setAttribute("aria-label", next === "light" ? "Switch to dark theme" : "Switch to light theme");
    }
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#F6F8FC" : "#05070D");
    if (persist) { try { localStorage.setItem("mm-theme", next); } catch (e) {} }
  }
  applyTheme(theme, false);
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(theme === "dark" ? "light" : "dark", true);
    });
  }

  /* ============================== NAVBAR ================================= */
  var header = $("#navbar");
  var links  = $("#navLinks");
  var burger = $("#navBurger");
  var scrim  = $("#navScrim");

  function setMenu(open) {
    if (!links || !burger) return;
    links.classList.toggle("is-open", open);
    if (scrim) scrim.hidden = !open;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  }
  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(!links.classList.contains("is-open"));
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
  if (links) {
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* sticky shadow */
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ============================ RENDERING ================================ */
  function renderSkills() {
    var host = $("#skillsGrid");
    if (!host || typeof SKILLS === "undefined") return;
    host.innerHTML = SKILLS.map(function (grp) {
      var tiles = grp.items.map(function (it) {
        return '<li class="skill" style="--c:' + esc(it.color) + '">' +
                 '<span class="skill__mark" aria-hidden="true">' + esc(it.mark) + "</span>" +
                 '<span class="skill__name">' + esc(it.name) + "</span>" +
               "</li>";
      }).join("");
      return '<article class="skill-card" data-reveal>' +
               '<div class="skill-card__head">' +
                 '<span class="skill-card__ico">' + icon(grp.icon) + "</span>" +
                 "<div><h3>" + esc(grp.group) + "</h3><p>" + esc(grp.blurb) + "</p></div>" +
               "</div>" +
               '<ul class="skill-list">' + tiles + "</ul>" +
             "</article>";
    }).join("");
  }

  function renderLearning() {
    var host = $("#learningChips");
    if (!host || typeof LEARNING === "undefined") return;
    host.innerHTML = LEARNING.map(function (t) {
      return "<li>" + esc(t) + "</li>";
    }).join("");
  }

  function renderProjects() {
    var host = $("#projectsGrid");
    if (!host || typeof PROJECTS === "undefined") return;

    host.innerHTML = PROJECTS.map(function (p) {
      var tags = (p.tech || []).map(function (t) {
        return '<li class="tag">' + esc(t) + "</li>";
      }).join("");

      var features = (p.features && p.features.length)
        ? '<ul class="proj__features">' + p.features.map(function (f) {
            return "<li>" + esc(f) + "</li>";
          }).join("") + "</ul>"
        : "";

      var links = p.links || {};
      var btns = "";
      if (links.live) {
        btns += '<a class="btn btn--primary btn--sm" href="' + esc(links.live) +
                '" target="_blank" rel="noopener noreferrer">View Project ' + icon("external") + "</a>";
      }
      if (links.code) {
        btns += '<a class="btn btn--ghost btn--sm" href="' + esc(links.code) +
                '" target="_blank" rel="noopener noreferrer">Source Code ' + icon("codeRepo") + "</a>";
      }
      if (!btns) {
        btns = '<p class="proj__soon">Live demo and source links coming soon.</p>';
      }

      var badge = p.status === "confirmed"
        ? '<span class="tag tag--live"><span class="tag__dot"></span>Completed</span>'
        : '<span class="tag tag--muted">Learning project</span>';

      return '<article class="proj" data-reveal data-tech="' +
               esc((p.tech || []).join("|").toLowerCase()) + '">' +
               '<div class="proj__media">' +
                 '<img src="' + esc(p.image) + '" alt="Design mockup preview of the ' + esc(p.name) +
                   ' project (placeholder — not a real screenshot)" loading="lazy" width="1200" height="750">' +
                 '<span class="proj__badge">Mockup</span>' +
               "</div>" +
               '<div class="proj__body">' +
                 '<div class="proj__top"><h3>' + esc(p.name) + "</h3>" + badge + "</div>" +
                 '<p class="proj__tag">' + esc(p.tagline) + "</p>" +
                 '<p class="proj__desc">' + esc(p.description) + "</p>" +
                 features +
                 '<ul class="proj__tags">' + tags + "</ul>" +
                 '<div class="proj__actions">' + btns + "</div>" +
               "</div>" +
             "</article>";
    }).join("");

    buildFilters();
  }

  function buildFilters() {
    var bar = $("#projectFilters");
    var grid = $("#projectsGrid");
    var empty = $("#projectsEmpty");
    if (!bar || !grid || typeof PROJECTS === "undefined") return;

    var set = {};
    PROJECTS.forEach(function (p) {
      (p.tech || []).forEach(function (t) { set[t] = true; });
    });
    var techs = Object.keys(set).sort();
    if (techs.length < 3) return; /* not worth filtering */

    bar.hidden = false;
    var html = '<button class="chip is-active" type="button" data-filter="all" aria-pressed="true">All</button>';
    html += techs.map(function (t) {
      return '<button class="chip" type="button" data-filter="' + esc(t.toLowerCase()) +
             '" aria-pressed="false">' + esc(t) + "</button>";
    }).join("");
    bar.innerHTML = html;

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var f = btn.getAttribute("data-filter");
      $$("button", bar).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var shown = 0;
      $$(".proj", grid).forEach(function (card) {
        var tech = card.getAttribute("data-tech") || "";
        var show = f === "all" || ("|" + tech + "|").indexOf("|" + f + "|") !== -1;
        card.hidden = !show;
        if (show) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  }

  function renderEducation() {
    var host = $("#timeline");
    if (!host || typeof EDUCATION === "undefined") return;
    host.innerHTML = EDUCATION.map(function (e) {
      return '<article class="tl' + (e.current ? " tl--current" : "") + '" data-reveal>' +
               '<div class="tl__node" aria-hidden="true"></div>' +
               '<div class="tl__card">' +
                 '<span class="tl__date">' + esc(e.date) + (e.current ? '<span class="tl__now">Now</span>' : "") + "</span>" +
                 "<h3>" + esc(e.title) + "</h3>" +
                 '<p class="tl__org">' + esc(e.org) + "</p>" +
                 '<p class="tl__note">' + esc(e.note) + "</p>" +
               "</div>" +
             "</article>";
    }).join("");
  }

  function renderLanguages() {
    var host = $("#langsGrid");
    if (!host || typeof LANGUAGES === "undefined") return;
    host.innerHTML = LANGUAGES.map(function (l) {
      var n = Math.max(0, Math.min(5, Number(l.dots) || 0));
      var dots = "";
      for (var i = 0; i < 5; i++) dots += '<i class="' + (i < n ? "on" : "") + '"></i>';
      return '<article class="lang" data-reveal>' +
               '<span class="lang__sym" aria-hidden="true">' + esc(l.symbol) + "</span>" +
               '<div class="lang__body">' +
                 "<h3>" + esc(l.name) + "</h3>" +
                 '<p class="lang__level">' + esc(l.level) +
                   (l.detail ? ' <span class="lang__detail">· ' + esc(l.detail) + "</span>" : "") +
                 "</p>" +
                 '<div class="dots" role="img" aria-label="' + esc(l.name) + " — " + esc(l.level) + '">' + dots + "</div>" +
               "</div>" +
             "</article>";
    }).join("");
  }

  function renderInterests() {
    var host = $("#interestsList");
    if (!host || typeof INTERESTS === "undefined") return;
    host.innerHTML = INTERESTS.map(function (i) {
      return '<li><span class="interests__ico">' + icon(i.icon) + "</span>" + esc(i.text) + "</li>";
    }).join("");
  }

  function renderSocials() {
    if (typeof SOCIALS === "undefined") return;
    var live = SOCIALS.filter(function (s) { return s.url; });
    $$("[data-socials]").forEach(function (host) {
      host.innerHTML = live.map(function (s) {
        return '<a class="social" href="' + esc(s.url) + '" aria-label="' + esc(s.label) + '" ' +
               (s.url.indexOf("http") === 0 ? 'target="_blank" rel="noopener noreferrer"' : "") + ">" +
               icon(s.icon) + "</a>";
      }).join("");
    });
  }

  function renderAvailability() {
    if (typeof SITE === "undefined" || !SITE.availability) return;
    $$('[data-config="availability"]').forEach(function (el) {
      if (SITE.availability.enabled === false) {
        var pill = el.closest(".pill");
        if (pill) pill.hidden = true;
      } else {
        el.textContent = SITE.availability.text;
      }
    });
  }

  renderSkills();
  renderLearning();
  renderProjects();
  renderEducation();
  renderLanguages();
  renderInterests();
  renderSocials();
  renderAvailability();

  /* ============================== REVEALS ================================ */
  var revealEls = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ============================ ACTIVE NAV =============================== */
  var navLinks = $$(".nav__link[data-nav]");
  var sections = navLinks.map(function (a) {
    return document.querySelector(a.getAttribute("href"));
  }).filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = "#" + en.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ============================ BACK TO TOP ============================== */
  var toTop = $("#toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ============================== YEAR =================================== */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================== FORM =================================== */
  var form = $("#contactForm");
  if (form) {
    var statusEl = $("#cf-status");
    var submitBtn = $("#cf-submit");

    var rules = {
      name:    { test: function (v) { return v.trim().length >= 2; }, msg: "Please enter your name." },
      email:   { test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }, msg: "Please enter a valid email address." },
      subject: { test: function (v) { return v.trim().length >= 3; }, msg: "Please add a short subject." },
      message: { test: function (v) { return v.trim().length >= 10; }, msg: "Please write at least 10 characters." }
    };

    function fieldEl(name) { return form.elements[name]; }
    function errEl(name) { return $("#cf-" + name + "-err"); }

    function validateField(name) {
      var input = fieldEl(name);
      var rule = rules[name];
      var ok = rule.test(input.value);
      var wrap = input.closest(".field");
      if (wrap) wrap.classList.toggle("has-error", !ok);
      input.setAttribute("aria-invalid", ok ? "false" : "true");
      var e = errEl(name);
      if (e) e.textContent = ok ? "" : rule.msg;
      return ok;
    }

    Object.keys(rules).forEach(function (name) {
      var input = fieldEl(name);
      if (!input) return;
      input.addEventListener("blur", function () { validateField(name); });
      input.addEventListener("input", function () {
        var wrap = input.closest(".field");
        if (wrap && wrap.classList.contains("has-error")) validateField(name);
      });
    });

    function setStatus(msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg || "";
      statusEl.className = "form__status" + (kind ? " form__status--" + kind : "");
    }

    function mailtoFallback(data) {
      var body = "Name: " + data.name + "\nEmail: " + data.email +
                 "\n\n" + data.message;
      var href = "mailto:mihamedmadi@gmail.com" +
                 "?subject=" + encodeURIComponent("[Portfolio] " + data.subject) +
                 "&body=" + encodeURIComponent(body);
      window.location.href = href;
      setStatus("Opening your email app with the message ready to send — nothing is sent from this page automatically.", "info");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var names = Object.keys(rules);
      var allOk = true;
      names.forEach(function (n) { if (!validateField(n)) allOk = false; });

      if (!allOk) {
        setStatus("Please fix the highlighted fields.", "error");
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      var data = {};
      names.forEach(function (n) { data[n] = fieldEl(n).value.trim(); });

      var endpoint = (typeof SITE !== "undefined" && SITE.formEndpoint) ? SITE.formEndpoint : "";

      if (!endpoint) {
        mailtoFallback(data);
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");
      setStatus("Sending…", "info");

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed (" + res.status + ")");
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          form.reset();
          setStatus("Thanks — your message was sent. I'll reply as soon as I can.", "success");
        })
        .catch(function () {
          setStatus("Sorry, something went wrong sending the form. Please email me directly at mihamedmadi@gmail.com.", "error");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.classList.remove("is-loading");
        });
    });
  }

  /* first paint */
  onScroll();
})();
