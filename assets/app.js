(function () {
  "use strict";

  const config = window.HACKATHON_CONFIG;
  if (!config) return;

  const pages = [
    { id: "home", href: "index.html", label: "首頁" },
    { id: "agenda", href: "agenda.html", label: "黑客松議程" },
    { id: "checkin", href: "checkin.html", label: "線上報到" },
    { id: "seating", href: "seating.html", label: "座位圖" },
    { id: "live", href: "live.html", label: "直播連結" },
    { id: "feedback", href: "feedback.html", label: "填寫需求回饋" },
    { id: "transport", href: "transport.html", label: "交通資訊" }
  ];

  const navigationCards = [
    { id: "agenda", title: "黑客松議程", description: "查看活動流程與時間安排。", number: "01", icon: "calendar" },
    { id: "checkin", title: "線上報到", description: "開啟 Microsoft Forms 完成報到。", number: "02", icon: "check" },
    { id: "seating", title: "座位圖", description: "切換面對舞台與背對舞台視角。", number: "03", icon: "seat" },
    { id: "transport", title: "交通資訊", description: "查看活動地址與導航資訊。", number: "04", icon: "pin" },
    { id: "live", title: "直播連結", description: "透過 Teams 進入活動直播。", number: "05", icon: "video" },
    { id: "feedback", title: "填寫需求回饋", description: "留下需求與活動回饋。", number: "06", icon: "message" }
  ];

  const iconPaths = {
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"></path>',
    check: '<path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
    seat: '<path d="M6 11V7a3 3 0 0 1 6 0v4"></path><path d="M4 11h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4Z"></path><path d="M7 18v3M17 18v3"></path>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    video: '<rect x="3" y="5" width="13" height="14" rx="2"></rect><path d="m16 10 5-3v10l-5-3z"></path>',
    message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path><path d="M8 9h8M8 13h5"></path>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"></path>',
    external: '<path d="M15 3h6v6M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
    close: '<path d="m6 6 12 12M18 6 6 18"></path>'
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const icon = (name, label = "") => {
    const accessibility = label
      ? `role="img" aria-label="${escapeHtml(label)}"`
      : 'aria-hidden="true"';
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${accessibility}>${iconPaths[name] || ""}</svg>`;
  };

  const safeHttpsUrl = (value) => {
    if (!value) return "";
    try {
      const url = new URL(value, window.location.href);
      return url.protocol === "https:" ? url.href : "";
    } catch {
      return "";
    }
  };

  const safeAsset = (value) => {
    if (!value) return "";
    return /^assets\/images\/[A-Za-z0-9._/-]+$/.test(value) ? value : "";
  };

  const pageById = (id) => pages.find((page) => page.id === id);
  const currentPage = document.body.dataset.page || "home";

  function renderHeader() {
    const header = document.querySelector("#site-header");
    if (!header) return;

    header.innerHTML = `
      <header class="site-header">
        <div class="shell header-inner">
          <a class="brand" href="index.html" aria-label="和潤企業 2026年 H2黑客松首頁">
            <img src="${escapeHtml(safeAsset(config.assets.logo))}" alt="和泰集團 和潤企業" width="270" height="85">
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="開啟網站選單">
            <span class="nav-toggle-icon">${icon("menu")}</span>
          </button>
          <nav class="primary-nav" id="primary-nav" aria-label="主要導覽">
            ${pages.map((page) => `<a href="${page.href}"${page.id === currentPage ? ' aria-current="page"' : ""}>${escapeHtml(page.label)}</a>`).join("")}
          </nav>
        </div>
      </header>`;

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".primary-nav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "開啟網站選單" : "關閉網站選單");
      toggle.querySelector(".nav-toggle-icon").innerHTML = icon(open ? "menu" : "close");
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "開啟網站選單");
        toggle.querySelector(".nav-toggle-icon").innerHTML = icon("menu");
        nav.classList.remove("is-open");
      }
    });
  }

  function renderFooter() {
    const footer = document.querySelector("#site-footer");
    if (!footer) return;
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="shell footer-grid">
          <div>
            <img class="footer-logo" src="${escapeHtml(safeAsset(config.assets.logo))}" alt="和泰集團 和潤企業" width="270" height="85">
            <p>${escapeHtml(config.event.name)}</p>
          </div>
          <div>
            <h2>活動資訊</h2>
            <p>${escapeHtml(config.event.date)} ${escapeHtml(config.event.time)}</p>
            <p>${escapeHtml(config.event.venue)}</p>
          </div>
          <div>
            <h2>主辦單位</h2>
            <p>${config.event.organizers.map(escapeHtml).join(" ＋ ")}</p>
            <p class="footer-note">內容更新：${escapeHtml(config.event.updatedAt)}</p>
          </div>
        </div>
        <div class="shell footer-bottom">
          <span>© 2026 和潤企業</span>
          <span>本網站僅提供活動資訊，外部服務依各平台權限為準。</span>
        </div>
      </footer>`;
  }

  const pageHero = (eyebrow, title, description) => `
    <section class="page-hero">
      <div class="page-hero-glow" aria-hidden="true"></div>
      <div class="shell page-hero-inner">
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="page-lead">${escapeHtml(description)}</p>
      </div>
    </section>`;

  const pendingState = (title, message) => `
    <div class="empty-state" role="status">
      <span class="empty-state-mark" aria-hidden="true"></span>
      <div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(message)}</p></div>
    </div>`;

  function renderHome() {
    const dm = safeAsset(config.assets.dm);
    return `
      <main id="main-content">
        <section class="home-hero">
          <div class="shell home-hero-grid">
            <div class="home-copy reveal">
              <p class="eyebrow">2026 H2 HACKATHON</p>
              <h1>一起把想法，<span>變成下一步。</span></h1>
              <p class="hero-lead">${escapeHtml(config.event.name)}，集結創意、協作與行動，在四小時內探索更多可能。</p>
              <dl class="event-meta">
                <div><dt>日期</dt><dd>${escapeHtml(config.event.date)}</dd></div>
                <div><dt>時間</dt><dd>${escapeHtml(config.event.time)}</dd></div>
                <div><dt>地點</dt><dd>${escapeHtml(config.event.venue)}</dd></div>
              </dl>
              <a class="button button-primary" href="#event-guide">前往活動導覽 ${icon("arrow")}</a>
            </div>
            <div class="hero-art reveal delay-1" aria-hidden="true"><span>AI</span><i></i><b></b></div>
          </div>
        </section>

        <section class="section dm-section" aria-labelledby="dm-title">
          <div class="shell">
            <div class="section-heading reveal">
              <div><p class="eyebrow">EVENT INFORMATION</p><h2 id="dm-title">活動資訊</h2></div>
              <p>活動 DM 將呈現完整資訊；正式圖片提供前，先保留活動資料與版位。</p>
            </div>
            ${dm
              ? `<figure class="dm-frame reveal"><img src="${escapeHtml(dm)}" alt="${escapeHtml(config.event.name)} 活動 DM" loading="lazy"></figure>`
              : `<div class="dm-placeholder reveal"><span>DM</span><div><h3>活動 DM 即將更新</h3><p>${escapeHtml(config.event.date)}・${escapeHtml(config.event.time)}・${escapeHtml(config.event.venue)}</p></div></div>`}
          </div>
        </section>

        <section class="section guide-section" id="event-guide" aria-labelledby="guide-title">
          <div class="shell">
            <div class="section-heading reveal">
              <div><p class="eyebrow">EVENT GUIDE</p><h2 id="guide-title">活動導覽</h2></div>
              <p>從這裡快速前往活動當天最常使用的資訊與服務。</p>
            </div>
            <div class="guide-grid">
              ${navigationCards.map((card, index) => {
                const page = pageById(card.id);
                return `<a class="guide-card reveal delay-${(index % 3) + 1}" href="${page.href}">
                  <span class="guide-number">${card.number}</span>
                  <span class="guide-icon">${icon(card.icon)}</span>
                  <h3>${escapeHtml(card.title)}</h3>
                  <p>${escapeHtml(card.description)}</p>
                  <span class="card-link">查看資訊 ${icon("arrow")}</span>
                </a>`;
              }).join("")}
            </div>
          </div>
        </section>

        <section class="section event-summary-section">
          <div class="shell event-summary reveal">
            <div><p class="eyebrow">SAVE THE DATE</p><h2>${escapeHtml(config.event.date)}</h2></div>
            <div><strong>${escapeHtml(config.event.time)}</strong><span>${escapeHtml(config.event.venue)}・${escapeHtml(config.event.address)}</span></div>
          </div>
        </section>
      </main>`;
  }

  function renderAgenda() {
    return `<main id="main-content">
      ${pageHero("AGENDA", "黑客松議程", "掌握活動流程與每個階段的時間安排。")}
      <section class="section"><div class="shell content-layout">
        <aside class="info-card reveal"><p class="eyebrow">EVENT TIME</p><h2>${escapeHtml(config.event.date)}</h2><p class="big-time">${escapeHtml(config.event.time)}</p><p>${escapeHtml(config.event.venue)}</p><span class="status-pill">議程持續更新中</span></aside>
        <div class="agenda-list" aria-label="活動議程">
          ${config.agenda.map((item, index) => `<article class="agenda-item reveal delay-${Math.min(index + 1, 3)}">
            <time>${escapeHtml(item.time)}</time><div><span class="agenda-type">${escapeHtml(item.type)}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.detail)}</p></div>
          </article>`).join("")}
        </div>
      </div></section>
    </main>`;
  }

  function renderFormPage(type) {
    const isCheckin = type === "checkin";
    const title = isCheckin ? "線上報到" : "填寫需求回饋";
    const eyebrow = isCheckin ? "CHECK IN" : "FEEDBACK";
    const description = isCheckin ? "使用 Microsoft Forms 完成活動報到。" : "透過 Microsoft Forms 留下需求與活動回饋。";
    const url = safeHttpsUrl(isCheckin ? config.links.checkinForm : config.links.feedbackForm);
    return `<main id="main-content">
      ${pageHero(eyebrow, title, description)}
      <section class="section"><div class="shell form-layout">
        <div class="form-guidance reveal">
          <p class="eyebrow">MICROSOFT FORMS</p><h2>${isCheckin ? "開始報到" : "告訴我們你的需求"}</h2>
          <p>若內嵌表單因公司登入、瀏覽器或網路政策無法顯示，請使用另開視窗按鈕。</p>
          ${url ? `<a class="button button-secondary" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">另開表單 ${icon("external")}</a>` : `<span class="status-pill status-pending">表單連結待提供</span>`}
        </div>
        <div class="form-frame reveal delay-1">
          ${url
            ? `<iframe src="${escapeHtml(url)}" title="${escapeHtml(title)} Microsoft Forms" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
            : pendingState("表單即將開放", "正式 Forms 連結提供後，這裡會直接顯示表單。")}
        </div>
      </div></section>
    </main>`;
  }

  function seatingPanel(mode, source, alt, active) {
    return `<div class="seat-panel${active ? " is-active" : ""}" id="seat-${mode}" role="tabpanel" aria-labelledby="seat-tab-${mode}"${active ? "" : " hidden"}>
      ${source
        ? `<figure class="seat-image"><img src="${escapeHtml(source)}" alt="${escapeHtml(alt)}" loading="lazy"></figure>`
        : pendingState(`${alt}待更新`, "座位圖提供後，可直接替換對應圖片並保留切換功能。")}
    </div>`;
  }

  function renderSeating() {
    const front = safeAsset(config.assets.seatingFront);
    const back = safeAsset(config.assets.seatingBack);
    return `<main id="main-content">
      ${pageHero("SEATING MAP", "座位圖", "依照觀看方向切換座位圖，快速找到正確位置。")}
      <section class="section"><div class="shell">
        <div class="seat-toolbar reveal">
          <div><p class="eyebrow">VIEW DIRECTION</p><h2>選擇座位圖方向</h2></div>
          <div class="segmented-control" role="tablist" aria-label="座位圖觀看方向">
            <button id="seat-tab-front" type="button" role="tab" aria-selected="true" aria-controls="seat-front" data-seat="front">面對舞台</button>
            <button id="seat-tab-back" type="button" role="tab" aria-selected="false" aria-controls="seat-back" data-seat="back" tabindex="-1">背對舞台</button>
          </div>
        </div>
        <div class="seat-stage reveal delay-1">
          <div class="stage-label"><span>STAGE</span><strong>舞台方向</strong></div>
          ${seatingPanel("front", front, "面對舞台座位圖", true)}
          ${seatingPanel("back", back, "背對舞台座位圖", false)}
        </div>
        <p class="seat-note">提醒：請先確認你面對舞台或背對舞台，再查看對應座位圖。</p>
      </div></section>
    </main>`;
  }

  function renderLive() {
    const url = safeHttpsUrl(config.links.teamsLive);
    return `<main id="main-content">
      ${pageHero("LIVE STREAM", "直播連結", "透過 Microsoft Teams 進入活動直播。")}
      <section class="section"><div class="shell live-card reveal">
        <div class="live-visual" aria-hidden="true">${icon("video")}<i></i></div>
        <div><p class="eyebrow">MICROSOFT TEAMS</p><h2>準備進入活動直播</h2><p>按下按鈕後將在新視窗開啟 Teams。實際存取權限與登入方式依公司 Microsoft 帳號設定為準。</p>
          ${url
            ? `<a class="button button-primary" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">開啟 Teams 直播 ${icon("external")}</a>`
            : `<button class="button button-primary" type="button" disabled>直播連結待提供</button>`}
        </div>
      </div></section>
    </main>`;
  }

  function renderTransport() {
    const mapUrl = safeHttpsUrl(config.links.map);
    return `<main id="main-content">
      ${pageHero("TRANSPORTATION", "交通資訊", "查看活動地址與前往 IEAT 一樓會議室的導航資訊。")}
      <section class="section"><div class="shell transport-layout">
        <div class="venue-card reveal">
          <div class="venue-pin">${icon("pin")}</div><p class="eyebrow">VENUE</p><h2>${escapeHtml(config.event.venue)}</h2><p class="address">${escapeHtml(config.event.address)}</p>
          ${mapUrl ? `<a class="button button-primary" href="${escapeHtml(mapUrl)}" target="_blank" rel="noopener noreferrer">開啟地圖導航 ${icon("external")}</a>` : ""}
        </div>
        <div class="transport-list">
          ${config.transport.map((item, index) => `<article class="transport-card reveal delay-${Math.min(index + 1, 3)}"><span>0${index + 1}</span><div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.detail)}</p><small>${escapeHtml(item.note)}</small></div></article>`).join("")}
        </div>
      </div></section>
    </main>`;
  }

  function renderNotFound() {
    return `<main id="main-content" class="not-found"><div class="shell not-found-card"><p class="eyebrow">404</p><h1>找不到這個頁面</h1><p>連結可能已更新，請回到首頁重新選擇活動資訊。</p><a class="button button-primary" href="index.html">返回首頁 ${icon("arrow")}</a></div></main>`;
  }

  const renderers = {
    home: renderHome,
    agenda: renderAgenda,
    checkin: () => renderFormPage("checkin"),
    seating: renderSeating,
    live: renderLive,
    feedback: () => renderFormPage("feedback"),
    transport: renderTransport,
    notFound: renderNotFound
  };

  function setupSeatingTabs() {
    const tabs = Array.from(document.querySelectorAll("[data-seat]"));
    if (!tabs.length) return;
    const activate = (tab) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.querySelector(`#seat-${item.dataset.seat}`);
        panel.hidden = !selected;
        panel.classList.toggle("is-active", selected);
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        activate(tabs[next]);
        tabs[next].focus();
      });
    });
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  }

  renderHeader();
  const app = document.querySelector("#app");
  const renderer = renderers[currentPage] || renderers.notFound;
  if (app) app.innerHTML = renderer();
  renderFooter();
  setupSeatingTabs();
  setupReveal();
})();

