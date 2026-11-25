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
    const namedRootImage = /^[A-Za-z0-9\u3400-\u9FFF ()（）._-]+\.png$/u;
    return /^assets\/images\/[A-Za-z0-9._/-]+$/.test(value) || namedRootImage.test(value) ? value : "";
  };

  const safeWorkbook = (value) => /^[A-Za-z0-9\u3400-\u9FFF ()（）._-]+\.xlsx$/u.test(value || "") ? value : "";

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
        <section class="home-hero" id="home-intro" data-scroll-section data-section-label="活動首頁">
          <div class="shell home-hero-grid">
            <div class="home-copy reveal">
              <p class="eyebrow">2026 H2 HACKATHON</p>
              <h1>一起把想法，<span>變成下一步。</span></h1>
              <p class="hero-lead">${escapeHtml(config.event.name)}，讓我們攜手串聯數據、看見成果、探索落地解方的無限可能。</p>
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

        <section class="section guide-section" id="event-guide" data-scroll-section data-section-label="活動導覽" aria-labelledby="guide-title">
          <div class="shell">
            <div class="section-heading reveal">
              <div><p class="eyebrow">EVENT GUIDE</p><h2 id="guide-title">活動導覽</h2></div>
              <p>從這裡快速前往活動當天最常使用的資訊與服務。</p>
            </div>
            <div class="guide-grid">
              ${navigationCards.map((card, index) => {
                const page = pageById(card.id);
                return `<a class="guide-card reveal delay-${(index % 3) + 1}" href="${page.href}">
                  <span class="guide-card-meta"><span class="guide-number">${card.number}</span><span class="guide-icon">${icon(card.icon)}</span></span>
                  <h3>${escapeHtml(card.title)}</h3>
                  <p>${escapeHtml(card.description)}</p>
                  <span class="card-link">查看資訊 ${icon("arrow")}</span>
                </a>`;
              }).join("")}
            </div>
          </div>
        </section>

        <section class="section dm-section" id="event-info" data-scroll-section data-section-label="活動資訊" aria-labelledby="dm-title">
          <div class="shell">
            <div class="section-heading reveal">
              <div><p class="eyebrow">EVENT INFORMATION</p><h2 id="dm-title">活動資訊</h2></div>
              <p>查看活動時間、地點與主題資訊。</p>
            </div>
            ${dm
              ? `<figure class="dm-frame reveal"><img src="${escapeHtml(dm)}" alt="${escapeHtml(config.event.name)} 活動 DM" loading="lazy"></figure>`
              : `<div class="dm-placeholder reveal"><span>DM</span><div><h3>活動 DM 即將更新</h3><p>${escapeHtml(config.event.date)}・${escapeHtml(config.event.time)}・${escapeHtml(config.event.venue)}</p></div></div>`}
          </div>
        </section>
      </main>`;
  }

  function agendaItemsMarkup(items) {
    return items.map((item, index) => {
      const details = [
        item.unit ? `<div><dt>簡報單位</dt><dd>${escapeHtml(item.unit)}</dd></div>` : "",
        item.speaker ? `<div><dt>簡報者</dt><dd>${escapeHtml(item.speaker)}</dd></div>` : "",
        item.reviewers ? `<div><dt>講評人</dt><dd>${escapeHtml(item.reviewers)}</dd></div>` : ""
      ].filter(Boolean).join("");
      return `<article class="agenda-item${item.isBreak ? " is-break" : ""} reveal delay-${Math.min(index + 1, 3)}">
        <time>${escapeHtml(item.time)}</time><div><span class="agenda-type">${escapeHtml(item.type)}</span><h2>${escapeHtml(item.title)}</h2>${details ? `<dl class="agenda-details">${details}</dl>` : item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ""}</div>
      </article>`;
    }).join("");
  }

  function renderAgenda() {
    const fallbackAgenda = config.agenda.map((item) => ({ ...item, unit: "", speaker: "", reviewers: "", isBreak: false }));
    return `<main id="main-content">
      ${pageHero("AGENDA", "黑客松議程", "掌握活動流程與每個階段的時間安排。")}
      <section class="section"><div class="shell content-layout">
        <aside class="info-card reveal"><p class="eyebrow">EVENT TIME</p><h2>${escapeHtml(config.event.date)}</h2><p class="big-time">${escapeHtml(config.event.time)}</p><p>${escapeHtml(config.event.venue)}</p><span class="status-pill" id="agenda-status" role="status">正在讀取 Excel 議程</span></aside>
        <div class="agenda-list" id="agenda-list" aria-label="活動議程" aria-busy="true">
          ${agendaItemsMarkup(fallbackAgenda)}
        </div>
      </div></section>
    </main>`;
  }

  async function setupAgendaWorkbook() {
    if (currentPage !== "agenda") return;
    const list = document.querySelector("#agenda-list");
    const status = document.querySelector("#agenda-status");
    const workbookPath = safeWorkbook(config.assets.agendaWorkbook);
    if (!list || !status || !workbookPath || !window.XLSX) {
      if (list) list.setAttribute("aria-busy", "false");
      if (status) status.textContent = "議程備援資料";
      return;
    }

    try {
      const requestUrl = new URL(workbookPath, window.location.href);
      requestUrl.searchParams.set("refresh", String(Date.now()));
      const response = await fetch(requestUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`Excel HTTP ${response.status}`);
      const workbook = window.XLSX.read(await response.arrayBuffer(), { type: "array" });
      const source = config.agendaSource || {};
      const sheet = workbook.Sheets[source.sheet || workbook.SheetNames[0]];
      if (!sheet) throw new Error("找不到議程工作表");
      const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });
      const firstIndex = Math.max(0, Number(source.firstRow || 3) - 1);
      const lastIndex = Math.min(rows.length - 1, Number(source.lastRow || rows.length) - 1);
      const agenda = rows.slice(firstIndex, lastIndex + 1).map((row) => {
        const time = String(row[5] || "").trim();
        const sequence = String(row[4] || "").trim();
        const unit = String(row[6] || "").trim();
        const speaker = String(row[7] || "").trim();
        const topic = String(row[8] || "").trim();
        const reviewers = [row[9], row[10]].map((value) => String(value || "").trim()).filter(Boolean).join("、");
        const title = topic || unit;
        return {
          time,
          title,
          type: sequence && sequence !== "-" ? `第 ${sequence} 組` : "活動流程",
          unit: topic ? unit : "",
          speaker,
          reviewers,
          detail: "",
          isBreak: title.includes("休息")
        };
      }).filter((item) => item.time && item.title);
      if (!agenda.length) throw new Error("議程區段沒有可顯示的資料");
      list.innerHTML = agendaItemsMarkup(agenda);
      list.setAttribute("aria-busy", "false");
      status.textContent = `已讀取 Excel・共 ${agenda.length} 筆`;
      setupReveal(list);
    } catch (error) {
      console.error("議程 Excel 讀取失敗", error);
      list.setAttribute("aria-busy", "false");
      status.textContent = "Excel 讀取失敗・顯示備援資料";
      status.classList.add("status-pending");
    }
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
    const defaultMode = front ? "front" : "back";
    return `<main id="main-content">
      ${pageHero("SEATING MAP", "座位圖", "依照觀看方向切換座位圖，快速找到正確位置。")}
      <section class="section"><div class="shell">
        <div class="seat-toolbar reveal">
          <div><p class="eyebrow">VIEW DIRECTION</p><h2>選擇座位圖方向</h2></div>
          <div class="segmented-control" role="tablist" aria-label="座位圖觀看方向">
            <button id="seat-tab-front" type="button" role="tab" aria-selected="${defaultMode === "front"}" aria-controls="seat-front" data-seat="front"${defaultMode === "front" ? "" : ' tabindex="-1"'}>面對舞台</button>
            <button id="seat-tab-back" type="button" role="tab" aria-selected="${defaultMode === "back"}" aria-controls="seat-back" data-seat="back"${defaultMode === "back" ? "" : ' tabindex="-1"'}>背對舞台</button>
          </div>
        </div>
        <div class="seat-stage reveal delay-1">
          <div class="stage-label"><span>VIEW</span><strong id="seat-view-label">目前視角：${defaultMode === "front" ? "面對舞台" : "背對舞台"}</strong></div>
          ${seatingPanel("front", front, "面對舞台座位圖", defaultMode === "front")}
          ${seatingPanel("back", back, "背對舞台座位圖", defaultMode === "back")}
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
          ${config.transport.map((item, index) => {
            const itemUrl = safeHttpsUrl(item.link);
            return `<article class="transport-card reveal delay-${Math.min(index + 1, 3)}"><span>0${index + 1}</span><div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.detail)}</p><small>${escapeHtml(item.note)}</small>${itemUrl ? `<a class="text-link" href="${escapeHtml(itemUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.linkLabel || "查看詳情")} ${icon("external")}</a>` : ""}</div></article>`;
          }).join("")}
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
        if (selected) {
          const viewLabel = document.querySelector("#seat-view-label");
          if (viewLabel) viewLabel.textContent = `目前視角：${item.dataset.seat === "front" ? "面對舞台" : "背對舞台"}`;
        }
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

  function setupReveal(root = document) {
    const items = root.querySelectorAll(".reveal");
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

  function setupSectionNavigation() {
    const sections = Array.from(document.querySelectorAll("[data-scroll-section]"));
    if (currentPage !== "home" || sections.length < 2) return;

    const rail = document.createElement("aside");
    rail.className = "mobile-section-rail";
    rail.setAttribute("aria-label", "首頁區塊導覽");
    rail.innerHTML = `
      <div class="mobile-scroll-status" role="status" aria-live="polite"></div>
      <div class="mobile-section-dots">
        ${sections.map((section, index) => `<button type="button" data-section-index="${index}" aria-label="前往${escapeHtml(section.dataset.sectionLabel)}"><span aria-hidden="true"></span></button>`).join("")}
      </div>`;
    document.body.appendChild(rail);

    const dots = Array.from(rail.querySelectorAll("[data-section-index]"));
    const status = rail.querySelector(".mobile-scroll-status");
    const mobileQuery = window.matchMedia("(max-width: 600px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentIndex = 0;
    let settleTimer;
    let statusTimer;
    let snapping = false;

    const headerHeight = () => document.querySelector(".site-header")?.offsetHeight || 0;
    const sectionTop = (section) => section.getBoundingClientRect().top + window.scrollY;
    const targetTop = (section) => Math.max(0, sectionTop(section) - headerHeight());

    const updateActive = () => {
      const marker = window.scrollY + headerHeight() + Math.min(window.innerHeight * 0.34, 280);
      let nextIndex = 0;
      sections.forEach((section, index) => {
        if (sectionTop(section) <= marker) nextIndex = index;
      });
      currentIndex = nextIndex;
      dots.forEach((dot, index) => {
        const active = index === currentIndex;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      status.textContent = `${sections[currentIndex].dataset.sectionLabel}・${currentIndex + 1} / ${sections.length}`;
    };

    const showScrollStatus = () => {
      if (!mobileQuery.matches) return;
      status.classList.add("is-visible");
      clearTimeout(statusTimer);
      statusTimer = setTimeout(() => status.classList.remove("is-visible"), 1000);
    };

    const scrollToSection = (index) => {
      const section = sections[index];
      if (!section) return;
      snapping = true;
      window.scrollTo({
        top: targetTop(section),
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
      window.setTimeout(() => { snapping = false; }, reducedMotion.matches ? 80 : 650);
    };

    const settleSection = () => {
      if (snapping) return;
      const header = headerHeight();
      const anchor = window.scrollY + header;
      const viewport = Math.max(1, window.innerHeight - header);
      const documentBottom = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= documentBottom - 4) return;

      let index = 0;
      sections.forEach((section, sectionIndex) => {
        if (sectionTop(section) <= anchor + 2) index = sectionIndex;
      });

      const section = sections[index];
      const top = sectionTop(section);
      const height = section.offsetHeight;
      const progress = Math.max(0, anchor - top);
      let targetIndex = index;

      if (height <= viewport * 1.25) {
        if (progress >= height * 0.35) {
          if (index >= sections.length - 1) return;
          targetIndex = index + 1;
        }
      } else if (progress <= viewport * 0.18) {
        targetIndex = index;
      } else if (height - progress <= viewport * 0.35) {
        if (index >= sections.length - 1) return;
        targetIndex = index + 1;
      } else {
        return;
      }

      if (Math.abs(window.scrollY - targetTop(sections[targetIndex])) > 8) scrollToSection(targetIndex);
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => scrollToSection(Number(dot.dataset.sectionIndex)));
    });

    window.addEventListener("scroll", () => {
      updateActive();
      showScrollStatus();
      if (snapping) return;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settleSection, 180);
    }, { passive: true });

    window.addEventListener("resize", updateActive, { passive: true });
    updateActive();
  }

  renderHeader();
  const app = document.querySelector("#app");
  const renderer = renderers[currentPage] || renderers.notFound;
  if (app) app.innerHTML = renderer();
  renderFooter();
  setupSeatingTabs();
  setupReveal();
  setupSectionNavigation();
  setupAgendaWorkbook();
})();
