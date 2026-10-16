/**
 * Objectif Visa — Hero plein ecran a slider (page d accueil uniquement).
 * Classique, sans modules ni fetch : fonctionne en file:// et sur Vercel.
 *
 * Principe : l utilisateur depose ses images dans images/hero/
 * (hero-1.webp, hero-2.webp...), redéploie, le slider les utilise.
 * Aucune edition de code requise.
 */

/* ---------- Constantes et surcharges ---------- */

/* Nombre maximum d images scrutees (hero-1 a hero-8). */
var HERO_MAX_IMAGES = 8;

/* Extensions testees dans cet ordre pour chaque index. */
var HERO_EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"];

/* Duree d affichage d une slide en millisecondes. */
var HERO_SLIDE_DURATION_MS = 4000;

/* Duree du fondu entre slides en millisecondes. */
var HERO_FADE_MS = 1000;

/* Point focal par index, ex. { 1: "70% 40%", 3: "80% 60%" }.
   Defaut : 75% 50% en desktop, 78% 50% en mobile portrait (voir hero.css). */
var HERO_FOCAL = {};

/* Graines de l apercu ?placeholder=1 (aucun fichier local requis). */
var HERO_PLACEHOLDER_SEEDS = ["ov1", "ov2", "ov3", "ov4"];

(function () {
  "use strict";

  var heroEl = document.getElementById("accueil-hero");
  var bgEl = document.getElementById("hero-bg");
  if (!heroEl || !bgEl) return;

  var dotsEl = document.getElementById("hero-dots");
  var controlsEl = document.getElementById("hero-controls");
  var prevBtn = document.getElementById("hero-prev");
  var nextBtn = document.getElementById("hero-next");
  var playBtn = document.getElementById("hero-play");

  var slides = [];
  var slideEls = [];
  var dotEls = [];
  var current = 0;
  var timer = null;
  var userPaused = false;
  var focusPaused = false;
  var touchPaused = false;
  var tabHidden = false;
  var offscreen = false;
  var enteredLive = false;

  var reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var params = new URLSearchParams(window.location.search || "");
  var previewMode = params.get("placeholder") === "1";

  /* ---------- Hauteur au dessus du hero (nav fixe) ---------- */

  function measureAbove() {
    var nav = document.getElementById("main-nav");
    var h = nav ? Math.round(nav.getBoundingClientRect().height) : 68;
    document.documentElement.style.setProperty("--above-hero-h", h + "px");
  }

  measureAbove();
  window.addEventListener("resize", measureAbove);
  if ("ResizeObserver" in window) {
    var navEl = document.getElementById("main-nav");
    if (navEl) {
      var ro = new ResizeObserver(measureAbove);
      ro.observe(navEl);
    }
  }

  /* ---------- Synchro des durees JS -> CSS (vitesse + fluidite) ---------- */
  heroEl.style.setProperty("--hero-slide-ms", HERO_SLIDE_DURATION_MS + "ms");
  heroEl.style.setProperty("--hero-fade-ms", HERO_FADE_MS + "ms");

  /* ---------- Decouverte des images (Image onload onerror, sequentiel) ---------- */

  function probe(url) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(true); };
      img.onerror = function () { resolve(false); };
      img.src = url;
    });
  }

  function findFirst(base) {
    var chain = Promise.resolve(null);
    HERO_EXTENSIONS.forEach(function (ext) {
      chain = chain.then(function (found) {
        if (found) return found;
        var url = base + "." + ext;
        return probe(url).then(function (ok) { return ok ? url : null; });
      });
    });
    return chain;
  }

  function discoverLocal() {
    var found = [];
    var chain = Promise.resolve();
    for (var i = 1; i <= HERO_MAX_IMAGES; i++) {
      (function (index) {
        chain = chain.then(function () {
          return findFirst("images/hero/hero-" + index).then(function (desktop) {
            if (!desktop) return { stop: true };
            return findFirst("images/hero/hero-" + index + "-mobile").then(function (mobile) {
              found.push({ desktop: desktop, mobile: mobile });
              return { stop: false };
            });
          }).then(function (res) {
            /* Premier index absent : on s arrete. */
            if (res && res.stop) throw { done: true };
          }).catch(function (err) {
            if (err && err.done) throw err;
          });
        });
      })(i);
    }
    return chain.then(function () { return found; }).catch(function () { return found; });
  }

  function discoverPreview() {
    return HERO_PLACEHOLDER_SEEDS.map(function (seed) {
      return {
        desktop: "https://picsum.photos/seed/" + seed + "/2400/1350",
        mobile: "https://picsum.photos/seed/" + seed + "/1080/1350"
      };
    });
  }

  /* ---------- Construction des slides ---------- */

  function focalFor(index) {
    if (HERO_FOCAL && HERO_FOCAL[index]) return HERO_FOCAL[index];
    return null;
  }

  function buildSlides(list) {
    slides = list;
    slideEls = [];
    dotEls = [];
    bgEl.querySelectorAll(".hero__slide").forEach(function (n) { n.remove(); });
    if (dotsEl) dotsEl.innerHTML = "";

    if (!slides.length) {
      /* Etat vide : fond degrade CSS, texte intact, sans controles. */
      bgEl.classList.remove("is-loading");
      heroEl.classList.add("is-ready", "is-empty");
      if (controlsEl) controlsEl.hidden = true;
      return;
    }

    slides.forEach(function (s, idx) {
      var slide = document.createElement("div");
      slide.className = "hero__slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", (idx + 1) + " sur " + slides.length);

      var picture = document.createElement("picture");
      if (s.mobile) {
        var source = document.createElement("source");
        source.setAttribute("media", "(max-width: 767px)");
        source.setAttribute("srcset", s.mobile);
        picture.appendChild(source);
      }
      var img = document.createElement("img");
      img.setAttribute("src", s.desktop);
      img.setAttribute("alt", "");
      img.setAttribute("decoding", "async");
      /* 1re image prioritaire, les suivantes en chargement differe : pas de saccade. */
      if (idx === 0) {
        img.setAttribute("fetchpriority", "high");
        img.setAttribute("loading", "eager");
      } else {
        img.setAttribute("loading", "lazy");
      }
      var focal = focalFor(idx + 1);
      if (focal) img.style.objectPosition = focal;
      picture.appendChild(img);
      slide.appendChild(picture);
      bgEl.appendChild(slide);
      slideEls.push(slide);

      if (dotsEl && slides.length > 1) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero__dot";
        dot.setAttribute("aria-label", "Afficher la slide " + (idx + 1) + " sur " + slides.length);
        dot.innerHTML = '<span class="hero__dot-track"><span class="hero__dot-fill"></span></span>';
        dot.addEventListener("click", function () { goTo(idx, true); });
        dotsEl.appendChild(dot);
        dotEls.push(dot);
      }
    });

    if (controlsEl) controlsEl.hidden = slides.length <= 1;
    show(0);
    bgEl.classList.remove("is-loading");
    heroEl.classList.add("is-ready");

    if (slides.length > 1 && !reducedMotion) start();
    else pause();
    updatePlayLabel();
  }

  /* ---------- Navigation ---------- */

  function show(index) {
    current = (index + slides.length) % slides.length;
    slideEls.forEach(function (el, i) {
      el.classList.toggle("is-active", i === current);
    });
    dotEls.forEach(function (el, i) {
      el.classList.toggle("is-active", i === current);
      /* Relance la barre de progression de la slide active. */
      if (i === current) {
        var fill = el.querySelector(".hero__dot-fill");
        if (fill) {
          fill.style.animation = "none";
          void fill.offsetWidth;
          fill.style.animation = "";
        }
      }
    });
  }

  function goTo(index, manual) {
    if (!slides.length) return;
    if (manual && !enteredLive) {
      enteredLive = true;
      bgEl.setAttribute("aria-live", "polite");
    }
    show(index);
    if (manual) restart();
  }

  function next(manual) { goTo(current + 1, manual); }
  function prev(manual) { goTo(current - 1, manual); }

  function isPaused() {
    return userPaused || focusPaused || touchPaused || tabHidden || offscreen || reducedMotion;
  }

  function start() {
    stop();
    if (reducedMotion || slides.length <= 1) return;
    heroEl.classList.remove("is-paused");
    timer = window.setTimeout(function tick() {
      if (isPaused()) {
        heroEl.classList.add("is-paused");
        timer = window.setTimeout(tick, 500);
        return;
      }
      heroEl.classList.remove("is-paused");
      next(false);
      timer = window.setTimeout(tick, HERO_SLIDE_DURATION_MS);
    }, HERO_SLIDE_DURATION_MS);
  }

  function stop() {
    if (timer) window.clearTimeout(timer);
    timer = null;
  }

  function restart() {
    if (slides.length > 1 && !reducedMotion) start();
    heroEl.classList.toggle("is-paused", isPaused());
  }

  function pause() {
    stop();
    heroEl.classList.add("is-paused");
  }

  function updatePlayLabel() {
    if (!playBtn) return;
    var pausedState = userPaused || reducedMotion;
    playBtn.setAttribute(
      "aria-label",
      pausedState ? "Reprendre le diaporama" : "Mettre en pause le diaporama"
    );
    playBtn.setAttribute("aria-pressed", pausedState ? "true" : "false");
    var iconPause = playBtn.querySelector(".icon-pause");
    var iconPlay = playBtn.querySelector(".icon-play");
    if (iconPause && iconPlay) {
      iconPause.style.display = pausedState ? "none" : "";
      iconPlay.style.display = pausedState ? "" : "none";
    }
  }

  /* ---------- Evenements ---------- */

  if (prevBtn) prevBtn.addEventListener("click", function () { prev(true); });
  if (nextBtn) nextBtn.addEventListener("click", function () { next(true); });
  if (playBtn) playBtn.addEventListener("click", function () {
    userPaused = !userPaused;
    updatePlayLabel();
    restart();
  });

  heroEl.addEventListener("focusin", function () { focusPaused = true; restart(); });
  heroEl.addEventListener("focusout", function () { focusPaused = false; restart(); });

  /* Pause au toucher, reprise apres un delai. */
  var touchTimer = null;
  heroEl.addEventListener("pointerdown", function () {
    touchPaused = true;
    restart();
    if (touchTimer) window.clearTimeout(touchTimer);
  }, { passive: true });
  heroEl.addEventListener("pointerup", function () {
    if (touchTimer) window.clearTimeout(touchTimer);
    touchTimer = window.setTimeout(function () { touchPaused = false; restart(); }, 4000);
  }, { passive: true });

  /* Clavier : fleches precedente et suivante. */
  heroEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(true); }
    else if (e.key === "ArrowRight") { e.preventDefault(); next(true); }
  });

  /* Swipe tactile en pointer events. */
  var startX = null;
  var startY = null;
  heroEl.addEventListener("pointerdown", function (e) {
    if (e.target.closest && e.target.closest("a, button, .hero__controls")) return;
    startX = e.clientX;
    startY = e.clientY;
  }, { passive: true });
  window.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    startX = null;
    startY = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(true);
      else prev(true);
    }
  }, { passive: true });

  /* Onglet cache : pause. */
  document.addEventListener("visibilitychange", function () {
    tabHidden = document.hidden;
    restart();
  });

  /* Hero hors ecran : pause. */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      offscreen = !entries[0].isIntersecting;
      restart();
    }, { threshold: 0.05 });
    io.observe(heroEl);
  }

  /* ---------- Demarrage ---------- */

  bgEl.classList.add("is-loading");
  if (previewMode) {
    buildSlides(discoverPreview());
  } else {
    discoverLocal().then(buildSlides);
  }
})();
