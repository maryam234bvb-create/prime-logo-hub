/**
 * PRIME LOGO HUB — main.js
 * All interactivity: navigation, reveal animations, portfolio
 * filters, FAQ accordion, dynamic rendering from config.js,
 * and the WhatsApp inquiry integration.
 */

(function () {
  "use strict";

  /* ----------------------------------------------------------
   * 0. WHATSAPP NUMBER FORMATTING
   * -------------------------------------------------------- */
  function toInternationalWhatsApp(raw) {
    let digits = String(raw).replace(/\D/g, "");
    if (digits.startsWith("0")) digits = digits.slice(1);
    if (!digits.startsWith("92")) digits = "92" + digits;
    return digits;
  }

  const WHATSAPP_NUMBER = toInternationalWhatsApp(SITE_CONFIG.whatsappNumberRaw);

  function openWhatsApp(message) {
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
  }

  /* ----------------------------------------------------------
   * 1. INJECT CONTACT DETAILS FROM CONFIG
   * -------------------------------------------------------- */
  function applyConfigText() {
    document.querySelectorAll("[data-config-whatsapp-display]").forEach((el) => {
      el.textContent = SITE_CONFIG.whatsappNumberRaw;
    });
    document.querySelectorAll("[data-config-address]").forEach((el) => {
      el.textContent = SITE_CONFIG.address;
    });
    document.querySelectorAll("[data-config-location]").forEach((el) => {
      el.textContent = SITE_CONFIG.location;
    });
    document.querySelectorAll("[data-config-email]").forEach((el) => {
      if (SITE_CONFIG.email) {
        el.textContent = SITE_CONFIG.email;
        el.closest("[data-config-email-wrap]")?.classList.remove("is-hidden");
      } else {
        el.closest("[data-config-email-wrap]")?.classList.add("is-hidden");
      }
    });

    // Social links — hide any icon whose URL is empty
    document.querySelectorAll("[data-social]").forEach((el) => {
      const key = el.getAttribute("data-social");
      const url = SITE_CONFIG.socials[key];
      if (url) {
        el.href = url;
        el.classList.remove("is-hidden");
      } else {
        el.classList.add("is-hidden");
      }
    });

    document.querySelectorAll("[data-config-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ----------------------------------------------------------
   * 2. RENDER TEAM
   * -------------------------------------------------------- */
  function renderTeam() {
    const grid = document.getElementById("team-grid");
    if (!grid) return;
    grid.innerHTML = SITE_CONFIG.team.map((member) => `
      <div class="team-card reveal">
        <div class="team-card__avatar" aria-hidden="true">
          <span>${member.role.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
        </div>
        <h3 class="team-card__role">${member.role}</h3>
        <p class="team-card__name">${member.placeholder ? "Placeholder — add name" : member.name}</p>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------------
   * 3. RENDER PORTFOLIO
   * -------------------------------------------------------- */
  const CATEGORY_LABELS = {
    "graphic-design": "Graphic Design",
    "video-editing": "Video Editing",
    "social-media": "Social Media",
    "branding": "Branding",
    "websites": "Websites",
    "marketing": "Marketing"
  };

  function renderPortfolio(filter) {
    const grid = document.getElementById("portfolio-grid");
    if (!grid) return;
    const items = filter && filter !== "all"
      ? SITE_CONFIG.portfolio.filter((p) => p.category === filter)
      : SITE_CONFIG.portfolio;

    if (items.length === 0) {
      grid.innerHTML = `<p class="portfolio-empty">No projects in this category yet.</p>`;
      return;
    }

    grid.innerHTML = items.map((item) => `
      <div class="portfolio-card reveal" data-category="${item.category}">
        <div class="portfolio-card__media">
          ${item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" />`
            : `<div class="portfolio-card__placeholder" aria-hidden="true">
                 <span>${CATEGORY_LABELS[item.category] || "Project"}</span>
               </div>`
          }
          ${item.placeholder ? `<span class="portfolio-card__badge">Placeholder</span>` : ""}
        </div>
        <div class="portfolio-card__info">
          <p class="portfolio-card__category">${CATEGORY_LABELS[item.category] || item.category}</p>
          <h3 class="portfolio-card__title">${item.title}</h3>
        </div>
      </div>
    `).join("");
  }

  function setupPortfolioFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        renderPortfolio(btn.getAttribute("data-filter"));
      });
    });
  }

  /* ----------------------------------------------------------
   * 4. RENDER TESTIMONIALS
   * -------------------------------------------------------- */
  function renderTestimonials() {
    const wrap = document.getElementById("testimonials-track");
    const section = document.getElementById("testimonials");
    if (!wrap || !section) return;

    if (!SITE_CONFIG.testimonials || SITE_CONFIG.testimonials.length === 0) {
      wrap.innerHTML = `
        <div class="testimonial-card testimonial-card--placeholder reveal">
          <p>Real client testimonials will appear here once available. This space is intentionally left empty — add entries to <code>testimonials</code> in <code>js/config.js</code>.</p>
        </div>`;
      return;
    }

    wrap.innerHTML = SITE_CONFIG.testimonials.map((t) => `
      <div class="testimonial-card reveal">
        <p class="testimonial-card__quote">&ldquo;${t.quote}&rdquo;</p>
        <p class="testimonial-card__name">${t.name}${t.business ? `, <span>${t.business}</span>` : ""}</p>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------------
   * 5. NAVIGATION — sticky shrink + mobile menu
   * -------------------------------------------------------- */
  function setupNav() {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");

    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
      });

      menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("nav-open");
        });
      });
    }
  }

  /* ----------------------------------------------------------
   * 6. FAQ ACCORDION
   * -------------------------------------------------------- */
  function setupFaq() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-item__question");
      btn?.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("is-open");
            openItem.querySelector(".faq-item__question")?.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  /* ----------------------------------------------------------
   * 7. SCROLL REVEAL ANIMATIONS
   * -------------------------------------------------------- */
  function setupReveal() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".reveal");

    if (prefersReduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    targets.forEach((el) => observer.observe(el));
  }

  // Re-observe newly rendered nodes (team/portfolio/testimonials render after DOMContentLoaded)
  function refreshReveal() {
    setupReveal();
  }

  /* ----------------------------------------------------------
   * 8. HERO 3D FLOATING VISUAL — pointer parallax
   * -------------------------------------------------------- */
  function setupHeroParallax() {
    const stage = document.getElementById("hero-3d-stage");
    if (!stage) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let ticking = false;

    function onMove(e) {
      const rect = stage.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) - 0.5;
      const py = ((e.clientY - rect.top) / rect.height) - 0.5;
      targetX = px * 18;
      targetY = py * -18;
      if (!ticking) {
        requestAnimationFrame(render);
        ticking = true;
      }
    }

    function render() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      stage.style.setProperty("--tiltX", currentY.toFixed(2) + "deg");
      stage.style.setProperty("--tiltY", currentX.toFixed(2) + "deg");
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        requestAnimationFrame(render);
      } else {
        ticking = false;
      }
    }

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", () => {
      targetX = 0; targetY = 0;
      if (!ticking) { requestAnimationFrame(render); ticking = true; }
    });
  }

  /* ----------------------------------------------------------
   * 9. PROJECT INQUIRY FORM -> WHATSAPP
   * -------------------------------------------------------- */
  function setupInquiryForm() {
    const form = document.getElementById("inquiry-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const whatsapp = form.whatsapp.value.trim();
      const email = form.email.value.trim();
      const service = form.service.value;
      const budget = form.budget.value;
      const deadline = form.deadline.value.trim();
      const details = form.details.value.trim();
      const reference = form.reference.value.trim();

      // Basic required-field validation
      let valid = true;
      [["name", name], ["whatsapp", whatsapp], ["details", details]].forEach(([field, value]) => {
        const input = form.elements[field];
        const errorEl = form.querySelector(`[data-error-for="${field}"]`);
        if (!value) {
          valid = false;
          input.classList.add("has-error");
          if (errorEl) errorEl.textContent = "This field is required.";
        } else {
          input.classList.remove("has-error");
          if (errorEl) errorEl.textContent = "";
        }
      });

      if (!valid) {
        form.querySelector(".has-error")?.focus();
        return;
      }

      const message = [
        `Hello ${SITE_CONFIG.brand}! 👋`,
        ``,
        `I would like to discuss a project.`,
        ``,
        `Name: ${name}`,
        `WhatsApp: ${whatsapp}`,
        `Email: ${email || "Not provided"}`,
        `Service: ${service || "Not specified"}`,
        `Budget: ${budget || "Not specified"}`,
        `Deadline: ${deadline || "Not specified"}`,
        ``,
        `Project Details:`,
        details,
        ``,
        `Reference:`,
        reference || "Not provided",
        ``,
        `I found ${SITE_CONFIG.brand} through your website.`
      ].join("\n");

      openWhatsApp(message);

      const status = document.getElementById("form-status");
      if (status) {
        status.textContent = "Opening WhatsApp with your project details…";
        status.classList.add("is-visible");
      }
    });
  }

  /* ----------------------------------------------------------
   * 10. GENERIC "CHAT ON WHATSAPP" BUTTONS
   * -------------------------------------------------------- */
  function setupWhatsAppButtons() {
    document.querySelectorAll("[data-whatsapp-cta]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openWhatsApp(`Hello ${SITE_CONFIG.brand}! 👋 I'd like to know more about your services.`);
      });
    });
  }

  /* ----------------------------------------------------------
   * 11. SMOOTH ANCHOR SCROLL (respects reduced motion)
   * -------------------------------------------------------- */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start"
        });
      });
    });
  }

  /* ----------------------------------------------------------
   * INIT
   * -------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyConfigText();
    renderTeam();
    renderPortfolio("all");
    renderTestimonials();
    setupPortfolioFilters();
    setupNav();
    setupFaq();
    setupHeroParallax();
    setupInquiryForm();
    setupWhatsAppButtons();
    setupSmoothScroll();
    refreshReveal();
  });
})();
