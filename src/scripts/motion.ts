import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { initCookies } from "./cookies";

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: Lenis | null = null;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

const scrollKey = (path = location.pathname) => `sole-scroll:${path}`;

const currentScroll = () => (lenis ? lenis.scroll : window.scrollY);

const saveScroll = () => {
  sessionStorage.setItem(scrollKey(), String(currentScroll()));
};

const isBackNavigation = () =>
  (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)
    ?.type === "back_forward";

const restoreScrollIfBack = () => {
  if (!isBackNavigation()) return;
  const y = Number(sessionStorage.getItem(scrollKey()) ?? "");
  if (!Number.isFinite(y) || y <= 0) return;
  if (lenis) lenis.scrollTo(y, { immediate: true });
  else window.scrollTo({ top: y, left: 0, behavior: "instant" });
};

const bindNavigationMemory = () => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  window.addEventListener("pagehide", saveScroll);

  document.addEventListener("click", (event) => {
    const link = (event.target as HTMLElement | null)?.closest("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;

    if (link.hasAttribute("data-back")) {
      try {
        if (document.referrer && new URL(document.referrer).origin === location.origin) {
          event.preventDefault();
          history.back();
          return;
        }
      } catch {
        /* keep href fallback */
      }
    }

    try {
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname !== location.pathname) {
        saveScroll();
      }
    } catch {
      /* ignore */
    }
  });

  window.addEventListener("pageswap", (event) => {
    saveScroll();
    const swap = event as Event & {
      viewTransition?: { skipTransition: () => void };
      activation?: { navigationType?: string };
    };
    if (swap.activation?.navigationType === "traverse") {
      swap.viewTransition?.skipTransition();
    }
  });

  window.addEventListener("pagereveal", (event) => {
    const reveal = event as Event & { viewTransition?: { finished: Promise<unknown> } };
    if (reveal.viewTransition) {
      void reveal.viewTransition.finished.then(() => {
        restoreScrollIfBack();
        ScrollTrigger.refresh();
      });
    }
  });
};

bindNavigationMemory();

const reveal = (targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) => {
  gsap.set(targets, { opacity: 1 });
  return gsap.from(targets, {
    y: 28,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.08,
    ...vars,
  });
};

const splitReady = async () => {
  if (document.fonts?.ready) await document.fonts.ready;
};

const initLenis = () => {
  if (reduced() || !isDesktop()) return null;

  const instance = new Lenis({
    autoRaf: false,
    duration: 1.15,
    lerp: 0.09,
  });

  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add((time) => {
    instance.raf(time * 1000);
  });

  instance.on("scroll", ScrollTrigger.update);
  return instance;
};

const preloader = () => {
  const root = document.querySelector<HTMLElement>("[data-preloader]");
  if (!root) return Promise.resolve();

  if (reduced() || sessionStorage.getItem("sole-preloader") === "1") {
    gsap.set(root, { display: "none" });
    return Promise.resolve();
  }

  sessionStorage.setItem("sole-preloader", "1");
  const mark = root.querySelector("[data-preloader-mark]");
  const panels = root.querySelectorAll("[data-preloader-panel]");

  gsap.set(mark, { scale: 0.72, opacity: 0, transformOrigin: "50% 50%" });

  return new Promise<void>((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.to(mark, { scale: 1, opacity: 1, duration: 0.75, ease: "expo.out" }).to(panels, {
      yPercent: (i: number) => (i === 0 ? -100 : 100),
      duration: 0.9,
      ease: "expo.inOut",
      stagger: 0.05,
    }).set(root, { display: "none" });
  });
};

const hero = () => {
  const section = document.querySelector("[data-hero]");
  if (!section) return;

  const media = section.querySelector("[data-hero-media]");
  const title = section.querySelector("[data-hero-title]");
  const sun = section.querySelectorAll("[data-hero-sun]");
  const rest = section.querySelectorAll("[data-hero-copy]");

  if (reduced()) {
    gsap.set([media, title, sun, rest], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(media, { clipPath: "inset(50% 50% 50% 50%)", scale: 1.12 });
  gsap.set(sun, { y: 80, opacity: 0 });

  const tl = gsap.timeline({ delay: 0.05 });
  tl.to(media, {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    duration: 1.35,
    ease: "expo.out",
  }).to(sun, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.85");

  if (title) {
    const split = SplitText.create(title, {
      type: "lines,words",
      linesClass: "line-mask",
    });
    gsap.set(title, { opacity: 1 });
    tl.from(
      split.words,
      { yPercent: 110, duration: 1.05, ease: "power3.out", stagger: 0.06 },
      "-=0.95",
    );
  }

  tl.add(reveal(rest), "-=0.7");

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      gsap.set(media, { y: self.progress * (isDesktop() ? 80 : 36) });
      if (isDesktop()) {
        gsap.set(sun, { y: -self.progress * 140, opacity: 1 - self.progress * 0.6 });
      }
    },
  });
};

const manifesto = () => {
  const el = document.querySelector("[data-manifesto]");
  if (!el) return;

  if (reduced()) {
    gsap.set(el, { opacity: 1 });
    return;
  }

  const split = SplitText.create(el, { type: "words" });
  gsap.set(el, { opacity: 1 });
  gsap.set(split.words, { color: "#c9bba8" });

  gsap.to(split.words, {
    color: "#161412",
    stagger: 0.08,
    ease: "none",
    scrollTrigger: {
      trigger: el.closest("section"),
      start: "top 72%",
      end: "bottom 42%",
      scrub: true,
    },
  });
};

const about = () => {
  const section = document.querySelector("[data-about]");
  if (!section) return;

  const portrait = section.querySelector("[data-about-portrait]");
  const lines = section.querySelectorAll("[data-about-line]");
  const side = section.querySelector("[data-about-side]");

  if (reduced()) {
    gsap.set([portrait, lines, side], { opacity: 1, clipPath: "none" });
    return;
  }

  if (portrait) {
    gsap.set(portrait, { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 });
    gsap.to(portrait, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.25,
      ease: "expo.out",
      scrollTrigger: { trigger: portrait, start: "top 80%" },
    });
  }

  reveal(lines, {
    scrollTrigger: { trigger: section, start: "top 70%" },
    y: 22,
  });

  if (side) {
    gsap.set(side, { opacity: 1 });
    gsap.fromTo(
      side,
      { y: 40 },
      {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }
};

const practice = () => {
  const wrap = document.querySelector<HTMLElement>("[data-practice]");
  const track = document.querySelector<HTMLElement>("[data-practice-track]");
  if (!wrap || !track) return;

  const cards = track.querySelectorAll("[data-practice-card]");

  if (reduced()) {
    gsap.set([wrap, track, cards], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.matchMedia().add("(min-width: 1024px)", () => {
    gsap.set(cards, { opacity: 1 });
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${distance()}`,
        invalidateOnRefresh: true,
      },
    });
    return () => tween.kill();
  });

  gsap.matchMedia().add("(max-width: 1023px)", () => {
    reveal(cards, {
      scrollTrigger: { trigger: wrap, start: "top 75%" },
      y: 36,
    });
  });
};

const services = () => {
  const intros = document.querySelectorAll("#percorsi [data-anim]:not([data-package])");
  const cards = document.querySelectorAll("[data-package]");
  if (reduced()) {
    gsap.set([intros, cards], { opacity: 1, rotateX: 0 });
    cards.forEach((card) => {
      const price = card.querySelector<HTMLElement>("[data-price]");
      if (price) price.textContent = price.dataset.price ?? "0";
    });
    return;
  }

  intros.forEach((intro) => {
    reveal(intro, { scrollTrigger: { trigger: intro, start: "top 85%" } });
  });

  cards.forEach((card, i) => {
    const price = card.querySelector<HTMLElement>("[data-price]");
    const value = Number(price?.dataset.price || price?.textContent || 0);

    gsap.set(card, { transformPerspective: 900 });
    gsap.fromTo(
      card,
      { opacity: 0, rotateX: 8, y: 28 },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: { trigger: card, start: "top 85%" },
      },
    );

    if (price) {
      const obj = { n: 0 };
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            n: value,
            duration: 1.2,
            ease: "power2.out",
            delay: i * 0.08,
            onUpdate: () => {
              price.textContent = String(Math.round(obj.n));
            },
            onComplete: () => {
              price.textContent = String(value);
            },
          });
        },
      });
    }
  });
};

const gallery = () => {
  const intro = document.querySelector("#galleria [data-anim]:not([data-gallery-item])");
  if (intro) {
    if (reduced()) gsap.set(intro, { opacity: 1 });
    else reveal(intro, { scrollTrigger: { trigger: intro, start: "top 85%" } });
  }

  const figs = document.querySelectorAll("[data-gallery-item]");
  figs.forEach((fig) => {
    const img = fig.querySelector("img");
    if (!img) return;
    if (reduced()) {
      gsap.set([fig, img], { opacity: 1, clipPath: "none", scale: 1 });
      return;
    }
    gsap.set(fig, { opacity: 1, clipPath: "inset(100% 0 0 0)" });
    gsap.set(img, { scale: 1.15 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: fig, start: "top 88%" },
    });
    tl.to(fig, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.out" }).to(
      img,
      { scale: 1, duration: 1.3, ease: "power3.out" },
      0,
    );
  });
};

const instagram = () => {
  const intro = document.querySelector("#instagram [data-anim]:not([data-ig])");
  const items = document.querySelectorAll("[data-ig]");
  if (!items.length) return;
  if (reduced()) {
    gsap.set([intro, items], { opacity: 1 });
    return;
  }
  if (intro) {
    reveal(intro, { scrollTrigger: { trigger: intro, start: "top 85%" } });
  }
  reveal(items, {
    scrollTrigger: { trigger: "[data-instagram]", start: "top 78%" },
    stagger: { from: "center", each: 0.08 },
    y: 20,
  });
};

const contact = () => {
  const section = document.querySelector("[data-contact]");
  if (!section) return;
  const sun = section.querySelector("[data-contact-sun]");
  const title = section.querySelector("[data-contact-title]");
  const rest = section.querySelectorAll("[data-contact-copy]");

  if (reduced()) {
    gsap.set([sun, title, rest], { opacity: 1 });
    return;
  }

  if (sun) {
    gsap.fromTo(
      sun,
      { y: -40, opacity: 0.5 },
      {
        y: 90,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }

  if (title) {
    const split = SplitText.create(title, {
      type: "lines,words",
      linesClass: "line-mask",
    });
    gsap.set(title, { opacity: 1 });
    gsap.from(split.words, {
      yPercent: 110,
      duration: 1.05,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: { trigger: title, start: "top 82%" },
    });
  }

  reveal(rest, { scrollTrigger: { trigger: section, start: "top 70%" } });
};

const dayShift = () => {
  const body = document.body;
  const stages = [
    { id: "#inizio", color: "#ede6dc" },
    { id: "#manifesto", color: "#ede6dc" },
    { id: "#chi-sono", color: "#e6ddd2" },
    { id: "#percorsi", color: "#d4c8b6" },
    { id: "#pratica", color: "#ddd4c4" },
    { id: "#galleria", color: "#c9bba8" },
    { id: "#contatti", color: "#2f382c" },
  ];

  stages.forEach((stage) => {
    const el = document.querySelector(stage.id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      onEnter: () => gsap.to(body, { backgroundColor: stage.color, duration: 0.8 }),
      onEnterBack: () =>
        gsap.to(body, { backgroundColor: stage.color, duration: 0.8 }),
    });
  });

  const contact = document.querySelector("#contatti");
  if (contact) {
    ScrollTrigger.create({
      trigger: contact,
      start: "top 50%",
      onEnter: () => body.classList.add("is-dusk"),
      onLeaveBack: () => body.classList.remove("is-dusk"),
    });
  }
};

const headerOffset = () => {
  const el = document.querySelector<HTMLElement>("[data-header]");
  return Math.round((el?.getBoundingClientRect().height ?? 72) + 12);
};

const samePath = (url: URL) => {
  const here = location.pathname.replace(/\/$/, "") || "/";
  const there = url.pathname.replace(/\/$/, "") || "/";
  return url.origin === location.origin && here === there;
};

const scrollToHash = (hash: string) => {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;

  const offset = headerOffset();
  if (reduced()) {
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    window.scrollTo({ top, left: 0, behavior: "auto" });
    return;
  }

  if (lenis) {
    lenis.scrollTo(target, { offset: -offset, duration: 1.2 });
    return;
  }

  const proxy = { y: window.scrollY };
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  gsap.to(proxy, {
    y: top,
    duration: 0.95,
    ease: "power3.inOut",
    overwrite: true,
    onUpdate: () => window.scrollTo(0, proxy.y),
  });
};

let menuOpen = false;
let menuTl: gsap.core.Timeline | null = null;

const setMenuOpen = (open: boolean) =>
  new Promise<void>((resolve) => {
    const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
    const btn = document.getElementById("menu-btn");
    const backdrop = menu?.querySelector("[data-menu-backdrop]");
    const items = menu?.querySelectorAll("[data-menu-item]");
    if (!menu) {
      resolve();
      return;
    }

    menuOpen = open;
    document.body.classList.toggle("menu-open", open);
    btn?.setAttribute("aria-expanded", String(open));
    btn?.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");

    const finish = () => {
      menu.classList.toggle("is-open", open);
      menu.hidden = !open;
      menu.setAttribute("aria-hidden", String(!open));
      if (!open) menuTl = null;
      resolve();
    };

    if (reduced()) {
      gsap.set([backdrop, items], { clearProps: "all" });
      finish();
      return;
    }

    menuTl?.kill();

    if (open) {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(items, { y: 28, opacity: 0 });
      menu.hidden = false;
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      menuTl = gsap.timeline({ onComplete: finish });
      menuTl
        .to(backdrop, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .to(
          items,
          { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.06 },
          "-=0.18",
        );
      return;
    }

    menuTl = gsap.timeline({ onComplete: finish });
    menuTl
      .to(items, { y: -12, opacity: 0, duration: 0.28, ease: "power2.in", stagger: 0.03 })
      .to(backdrop, { opacity: 0, duration: 0.32, ease: "power2.in" }, "-=0.12");
  });

const mobileMenu = () => {
  const btn = document.getElementById("menu-btn");
  btn?.addEventListener("click", () => {
    void setMenuOpen(!menuOpen);
  });
};

const inPageNav = () => {
  document.addEventListener("click", (event) => {
    const link = (event.target as HTMLElement | null)?.closest("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;
    if (link.hasAttribute("data-back")) return;

    let url: URL;
    try {
      url = new URL(link.href, location.href);
    } catch {
      return;
    }

    if (!samePath(url) || !url.hash) {
      if (menuOpen && link.closest("[data-mobile-menu]")) void setMenuOpen(false);
      return;
    }

    event.preventDefault();
    const go = () => {
      scrollToHash(url.hash);
      history.pushState(null, "", url.hash);
    };

    if (menuOpen) void setMenuOpen(false).then(go);
    else go();
  });
};

const header = () => {
  const el = document.querySelector<HTMLElement>("[data-header]");
  if (!el) return;
  const alwaysSolid = el.classList.contains("is-solid");
  let last = 0;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      el.classList.toggle("is-solid", alwaysSolid || y > 40);
      if (menuOpen) {
        el.classList.remove("is-hidden");
        return;
      }
      if (!reduced() && y > 80) {
        el.classList.toggle("is-hidden", y > last && y > 120);
      } else {
        el.classList.remove("is-hidden");
      }
      last = y;
    },
  });
};

const progress = () => {
  const arc = document.querySelector<SVGGeometryElement>("[data-sun-progress]");
  if (!arc) return;
  const length = arc.getTotalLength();
  gsap.set(arc, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(arc, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });
};

const cursor = () => {
  const dot = document.querySelector<HTMLElement>(".cursor-dot");
  const ring = document.querySelector<HTMLElement>(".cursor-ring");
  if (!dot || !ring || reduced() || !isDesktop()) return;

  document.documentElement.classList.add("has-custom-cursor");
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { x: pos.x, y: pos.y };

  window.addEventListener("pointermove", (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    gsap.set(dot, { x: pos.x, y: pos.y });
  });

  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.12;
    ringPos.y += (pos.y - ringPos.y) * 0.12;
    gsap.set(ring, { x: ringPos.x, y: ringPos.y });
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
  });
};

const boot = async () => {
  try {
    await splitReady();
    lenis = initLenis();
    await preloader();
    initCookies();
    hero();
    manifesto();
    about();
    practice();
    services();
    gallery();
    instagram();
    contact();
    dayShift();
    header();
    mobileMenu();
    inPageNav();
    progress();
    cursor();

    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.addEventListener("load", () => res(null), { once: true });
              img.addEventListener("error", () => res(null), { once: true });
            }),
      ),
    );
    ScrollTrigger.refresh();
    restoreScrollIfBack();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  } catch (error) {
    console.error(error);
    document.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
      el.style.opacity = "1";
    });
    const pre = document.querySelector<HTMLElement>("[data-preloader]");
    if (pre) pre.style.display = "none";
    initCookies();
    restoreScrollIfBack();
  }
};

boot();


