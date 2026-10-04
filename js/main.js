(() => {
  const C = window.WEDDING, $ = id => document.getElementById(id);
  const names = `${C.partner1} & ${C.partner2}`;
  const full = `${C.partner1} ${C.surname1 || ""} & ${C.partner2} ${C.surname2 || ""}`.replace(/\s+/g, " ");
  document.title = `${names} — Wedding Invitation`;

  // ---- fill content ----
  $("envNames").innerHTML = `${C.partner1}<br>&amp;<br>${C.partner2}`;
  $("introHint").textContent = C.introHint || "Tap to open";
  $("p1").textContent = C.partner1; $("p2").textContent = C.partner2;
  $("tagline").textContent = C.tagline; $("dateText").textContent = C.dateText;
  $("footNames").textContent = names; $("footNote").textContent = C.footerNote || "";
  if (C.heroPhoto) {
    const img = new Image();
    img.onload = () => $("heroBg").style.backgroundImage = `url(${C.heroPhoto})`;
    img.src = C.heroPhoto;
  }

  // story
  $("timeline").innerHTML = C.story.map(s => `
    <div class="t-item reveal ${s.photo ? "" : "nophoto"}">
      <div class="t-photo" ${s.photo ? `style="background-image:url('${s.photo}'),linear-gradient(135deg,#e7c9b8,#d3a0a8)"` : ""}></div>
      <div class="t-text"><span class="t-when">${s.when}</span><h3>${s.title}</h3><p>${s.text}</p></div>
    </div>`).join("");

  // gallery (images that fail to load are removed)
  const grid = $("grid");
  C.gallery.forEach(src => {
    const im = new Image(); im.alt = "Our photo"; im.loading = "lazy";
    im.onload = () => { im.classList.add("loaded"); grid.appendChild(im); };
    im.onclick = () => { const lb = $("lightbox"); lb.querySelector("img").src = src; lb.hidden = false; };
    im.src = src;
  });
  $("lightbox").onclick = () => $("lightbox").hidden = true;
  if (!C.gallery.length) $("gallery").remove();

  // events + venue
  $("cards").innerHTML = C.events.map(e => `<div class="card reveal"><h3>${e.name}</h3><p>${e.time}</p><p>${e.place}</p></div>`).join("");
  $("venueName").textContent = C.venue.name; $("venueAddr").textContent = C.venue.address;
  $("mapBtn").href = C.venue.mapsLink;

  // RSVP
  const r = C.rsvp || {}; let href = "";
  const msg = encodeURIComponent(`Hi! This is ____ replying to the invitation of ${names}. I will / will not be able to attend. Guests: __`);
  if (r.formLink) href = r.formLink;
  else if (r.whatsapp) href = `https://wa.me/${r.whatsapp}?text=${msg}`;
  else if (r.email) href = `mailto:${r.email}?subject=RSVP — ${names}&body=${msg}`;
  if (href) $("rsvpBtn").href = href; else $("rsvp").remove();
  $("deadline").textContent = r.deadlineText || "";

  // venue card + add to calendar
  $("venueCard").href = C.venue.mapsLink; $("venueSmall").textContent = `${C.venue.name} · ${C.venue.address}`;
  $("calBtn").onclick = e => {
    e.preventDefault();
    const f = d => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const st = new Date(C.date), en = new Date(st.getTime() + 4 * 3600e3);
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `DTSTART:${f(st)}`, `DTEND:${f(en)}`,
      `SUMMARY:Wedding of ${names}`, `LOCATION:${C.venue.name}, ${C.venue.address}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" })); a.download = "wedding.ics"; a.click();
  };

  // scratch-to-reveal date
  (() => {
    const box = $("scratch"), cv = $("scratchCanvas"), ctx = cv.getContext("2d");
    let w, h, drawing = false, last = 0;
    const paint = () => {
      const r = box.getBoundingClientRect(); w = cv.width = r.width; h = cv.height = r.height;
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#c9a24a"); g.addColorStop(.5, "#f1d98f"); g.addColorStop(1, "#b88a2e");
      ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(60,40,10,.75)"; ctx.font = "600 13px Inter,sans-serif"; ctx.textAlign = "center";
      ctx.fillText("SCRATCH TO REVEAL THE DATE ✦", w / 2, h / 2 + 4);
    };
    const COLS = 16, ROWS = 4, seen = new Set();
    const scratch = e => {
      if (!drawing) return;
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      ctx.globalCompositeOperation = "destination-out"; ctx.beginPath(); ctx.arc(x, y, 24, 0, 7); ctx.fill();
      // mark every grid cell the brush touches
      for (let cx = 0; cx < COLS; cx++) for (let cy = 0; cy < ROWS; cy++) {
        const mx = (cx + .5) * w / COLS, my = (cy + .5) * h / ROWS;
        if (Math.hypot(mx - x, my - y) < 24) seen.add(cx * ROWS + cy);
      }
      if (seen.size / (COLS * ROWS) > .6) { box.classList.add("done"); box.querySelector(".scratch-label").textContent = "Save the date"; }
    };
    cv.addEventListener("pointerdown", e => { drawing = true; cv.setPointerCapture(e.pointerId); scratch(e); });
    cv.addEventListener("pointermove", scratch);
    cv.addEventListener("pointerup", () => { drawing = false; });
    // hero is hidden until the intro finishes, so paint once it has size
    new ResizeObserver(() => { if (!box.classList.contains("done") && box.offsetWidth) paint(); }).observe(box);
  })();

  // countdown
  const target = new Date(C.date).getTime();
  const cd = $("countdown");
  const tick = () => {
    let d = Math.max(0, target - Date.now()) / 1000;
    const parts = [["Days", 86400], ["Hours", 3600], ["Mins", 60], ["Secs", 1]].map(([l, s]) => {
      const v = Math.floor(d / s); d -= v * s; return `<div><b>${String(v).padStart(2, "0")}</b><small>${l}</small></div>`;
    });
    cd.innerHTML = parts.join("");
  };
  if (isNaN(target)) cd.remove(); else { tick(); setInterval(tick, 1000); }

  // scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // music
  const bgm = $("bgm"), mb = $("musicBtn");
  if (C.music) {
    bgm.src = C.music; mb.hidden = false;
    mb.onclick = () => { bgm.paused ? bgm.play() : bgm.pause(); mb.classList.toggle("off", bgm.paused); };
  }

  // ---- intro ----
  const intro = $("intro"), vid = $("introVideo");
  let opened = false;
  const reveal = () => {
    intro.classList.add("done");
    document.body.classList.remove("locked");
    $("invite").classList.add("show"); $("invite").removeAttribute("aria-hidden");
    window.scrollTo(0, 0);
    setTimeout(() => intro.remove(), 1200);
  };
  const open = () => {
    if (opened) return; opened = true;
    if (C.music) bgm.play().catch(() => {});
    if (C.introVideo) { vid.muted = false; vid.play().catch(() => { vid.muted = true; vid.play(); }); vid.onended = reveal; setTimeout(reveal, 15000); }
    else { intro.classList.add("open"); setTimeout(reveal, 2200); }
  };
  if (C.introVideo) {
    vid.src = C.introVideo; vid.hidden = false; $("envelope").hidden = true;
    vid.onerror = () => { vid.hidden = true; $("envelope").hidden = false; C.introVideo = ""; };
  }
  intro.addEventListener("click", open);
  intro.addEventListener("keydown", e => (e.key === "Enter" || e.key === " ") && open());
})();
