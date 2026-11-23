/* ==========================================================
   Abir Hasan | Portfolio scripts (jQuery + Ajax)
   ========================================================== */

$(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function escapeHTML(str) { return $("<div>").text(str == null ? "" : String(str)).html(); }

  /* ---------- 1. Theme ---------- */
  function applyTheme(theme) {
    $("html").attr("data-theme", theme);
    $("#themeToggle")
      .html(theme === "dark" ? ICON_SUN : ICON_MOON)
      .attr("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  applyTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  $("#themeToggle").on("click", function () {
    var next = $("html").attr("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- 2. Header: menu, active link, scroll state ---------- */
  $("#menuToggle").on("click", function () {
    var open = $("#navLinks").toggleClass("open").hasClass("open");
    $(this).attr("aria-expanded", open).attr("aria-label", open ? "Close menu" : "Open menu");
  });

  var page = window.location.pathname.split("/").pop() || "index.html";
  $("#navLinks a").each(function () {
    if ($(this).attr("href") === page) $(this).addClass("active").attr("aria-current", "page");
  });

  function onScroll() {
    var top = $(window).scrollTop();
    $(".site-header").toggleClass("scrolled", top > 20);
    var max = $(document).height() - $(window).height();
    $("#progress").css("width", max > 0 ? (top / max) * 100 + "%" : 0);
  }
  $(window).on("scroll resize", onScroll);
  onScroll();

  $(".to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, reduceMotion ? 0 : 400);
  });
  $(".year").text(new Date().getFullYear());

  /* ---------- 3. Hero entrance + test-run console ---------- */
  $(".reveal").each(function (i) {
    var $el = $(this);
    setTimeout(function () { $el.addClass("in"); }, reduceMotion ? 0 : 80 + i * 110);
  });

  var testLines = [
    { cls: "cmd", html: "$ npm test portfolio.spec" },
    { html: '<span class="ok">✓</span> <span class="key">name     </span> Abir Hasan' },
    { html: '<span class="ok">✓</span> <span class="key">degree   </span> B.Sc. CSE, DIU' },
    { html: '<span class="ok">✓</span> <span class="key">focus    </span> Manual &amp; API testing' },
    { html: '<span class="ok">✓</span> <span class="key">tools    </span> Postman, Newman, Jira' },
    { html: '<span class="ok">✓</span> <span class="key">languages</span> JS, Python, HTML, CSS' },
    { html: '<span class="ok">✓</span> <span class="key">location </span> Dhaka, Bangladesh' },
    { cls: "summary", html: "Tests: 6 passed, 0 failed" }
  ];
  function runConsole() {
    var $body = $("#consoleBody");
    if (!$body.length) return;
    $body.empty();
    $("#rerun").prop("disabled", true);
    var step = reduceMotion ? 0 : 300, start = reduceMotion ? 0 : 700;
    $.each(testLines, function (i, line) {
      var $line = $('<div class="console-line"></div>').addClass(line.cls || "").html(line.html);
      if (reduceMotion) { $body.append($line); return; }
      setTimeout(function () { $line.hide().appendTo($body).fadeIn(160); }, start + i * step);
    });
    setTimeout(function () { $("#rerun").prop("disabled", false); }, start + testLines.length * step);
  }
  runConsole();
  $("#rerun").on("click", runConsole);

  /* Contact: "Send a message" scrolls to the form and focuses the first field */
  $(document).on("click", ".js-to-form", function (e) {
    var $form = $("#contactForm");
    if (!$form.length) return;
    e.preventDefault();
    $("html, body").animate({ scrollTop: $form.offset().top - 90 }, reduceMotion ? 0 : 450, function () {
      $("#name").trigger("focus");
    });
  });

  /* About: run the "candidate.spec" checks once the card is on screen */
  $(".js-checks").each(function () {
    var card = this, $card = $(card), $rows = $card.find(".rc-rows li"), total = $rows.length;
    function setProgress(n) {
      $card.find(".js-pass").text(n);
      $card.find(".js-fill").css("width", (n / total) * 100 + "%");
    }
    if (reduceMotion || !("IntersectionObserver" in window)) { setProgress(total); return; }
    $card.addClass("armed");
    setProgress(0);
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      $rows.each(function (i) {
        var $li = $(this);
        setTimeout(function () { $li.addClass("done"); setProgress(i + 1); }, 350 + i * 260);
      });
    }, { threshold: 0.4 });
    io.observe(card);
  });

  /* Home stats: count up once on load */
  $(".stat .num[data-count]").each(function () {
    var $n = $(this), target = +$n.data("count");
    if (reduceMotion) return;
    $({ v: 0 }).delay(500).animate({ v: target }, {
      duration: 900,
      easing: "swing",
      step: function (v) { $n.text(("0" + Math.round(v)).slice(-2)); },
      complete: function () { $n.text(("0" + target).slice(-2)); }
    });
  });

  /* ---------- 4. Ajax ----------
     Content lives in data/*.json and is requested with $.ajax.
     Browsers block Ajax for pages opened straight from disk (file://),
     so on failure the built-in copy from js/fallback-data.js is used. */
  function loadJSON(url, onSuccess, $status) {
    $.ajax({ url: url, dataType: "json", cache: false })
      .done(onSuccess)
      .fail(function () {
        if ($status && $status.length) {
          $status.html('<div class="status-msg">Showing a built-in copy of this list, because the browser blocked the Ajax request. Run the site on a local server (for example VS Code Live Server) to load <code>' + escapeHTML(url) + "</code>.</div>");
        }
        onSuccess((window.PORTFOLIO_FALLBACK || {})[url] || []);
      });
  }

  /* ---------- 5. Project illustrations ---------- */
  function visualFor(p) {
    if (p.image) {
      return '<div class="pv pv-img"><img src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.title) + ' preview" width="' +
        (p.imageW || 1080) + '" height="' + (p.imageH || 600) + '" loading="lazy"></div>';
    }
    if (p.category === "testing") {
      var rows = $.map((p.visual && p.visual.rows) || [], function (r) {
        var bug = r[2] === "bug";
        return '<div class="pv-row"><span>' + escapeHTML(r[0]) + "</span><b>" + escapeHTML(r[1]) +
          '</b><span class="pill' + (bug ? " fail" : "") + '">' + (bug ? "Bug" : "Pass") + "</span></div>";
      }).join("");
      return '<div class="pv" aria-hidden="true"><div class="pv-card"><div class="bar"><i></i><i></i><i></i><span>' +
        escapeHTML((p.visual && p.visual.file) || "test_cases.xlsx") + '</span></div><div class="pv-rows">' + rows + "</div></div></div>";
    }
    if (p.category === "ai") {
      if (p.id === "cvmaker") {
        return '<div class="pv" aria-hidden="true"><div class="pv-card"><div class="bar"><i></i><i></i><i></i><span>cv-maker-ai</span></div>' +
          '<div class="pv-site"><div class="sk line short" style="height:.8em;background:var(--ink);opacity:.8"></div><div class="sk line"></div>' +
          '<div class="sk top" style="height:1.8em;background:var(--flag-soft)"></div><div class="sk line"></div><div class="sk line short"></div></div></div></div>';
      }
      return '<div class="pv ai" aria-hidden="true"><div class="road"></div>' +
        '<div class="car" style="left:16%;top:55%;width:20%;height:22%"></div>' +
        '<div class="det" style="left:14%;top:51%;width:24%;height:30%"><span>car</span></div>' +
        '<div class="car" style="left:60%;top:47%;width:24%;height:30%;background:#7b8aa6"></div>' +
        '<div class="det alt" style="left:58%;top:43%;width:28%;height:38%"><span>bus</span></div>' +
        '<div class="car" style="left:43%;top:44%;width:9%;height:11%"></div>' +
        '<div class="det" style="left:42%;top:41.5%;width:11%;height:15%"><span>car</span></div></div>';
    }
    return '<div class="pv" aria-hidden="true"><div class="pv-card"><div class="bar"><i></i><i></i><i></i><span>' +
      escapeHTML(p.title.toLowerCase().replace(/[’']/g, "").replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")) + '.html</span></div>' +
      '<div class="pv-site"><div class="sk top"></div><div class="cols"><div class="sk"></div><div class="sk"></div><div class="sk"></div></div>' +
      '<div class="sk line"></div><div class="sk line short"></div></div></div></div>';
  }

  var GH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>';

  var projectsById = {};

  function projectCard(p) {
    return '<article class="project" data-category="' + escapeHTML(p.category) + '">' + visualFor(p) +
      '<div class="body"><div><span class="tag ' + escapeHTML(p.category) + '">' + escapeHTML(p.label) + "</span></div>" +
      "<h3>" + escapeHTML(p.title) + "</h3><p>" + escapeHTML(p.summary) + "</p>" +
      '<div class="foot"><button class="btn btn-outline btn-sm open-project" type="button" data-id="' + escapeHTML(p.id) + '">View details</button>' +
      '<a class="btn btn-outline btn-sm" href="' + escapeHTML(p.repo) + '" target="_blank" rel="noopener">' + GH_ICON + "Code</a></div></div></article>";
  }

  function featureRow(p) {
    var items = $.map(p.highlights || [], function (h) { return "<li>" + escapeHTML(h) + "</li>"; }).join("");
    return '<article class="feature">' + visualFor(p) + "<div>" +
      '<div class="meta"><span class="tag ' + escapeHTML(p.category) + '">' + escapeHTML(p.label) + "</span></div>" +
      "<h3>" + escapeHTML(p.title) + "</h3><p>" + escapeHTML(p.description) + "</p><ul>" + items + "</ul>" +
      '<div class="actions"><button class="btn btn-primary open-project" type="button" data-id="' + escapeHTML(p.id) + '">View details</button>' +
      '<a class="btn btn-outline" href="' + escapeHTML(p.repo) + '" target="_blank" rel="noopener">' + GH_ICON + "View code</a></div></div></article>";
  }

  /* Home: featured projects */
  if ($("#featured").length) {
    loadJSON("data/projects.json", function (list) {
      var html = "";
      $.each(list, function (_, p) { projectsById[p.id] = p; if (p.featured) html += featureRow(p); });
      $("#featured").html(html);
    }, $("#featuredStatus"));
  }

  /* Projects page: "Selected Work" masonry + filter tabs */
  var ICON_GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>';
  var ICON_CODE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>';
  var ICON_OUT = '<svg class="out" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  function linkButtons(p, big) {
    var size = big ? "" : " btn-xs";
    var html = "";
    if (p.live) html += '<a class="btn btn-live' + size + '" href="' + escapeHTML(p.live) + '" target="_blank" rel="noopener">' + ICON_GLOBE + "Live Server" + ICON_OUT + "</a>";
    html += '<a class="btn ' + (p.live ? "btn-gh" : "btn-gh-dark") + size + '" href="' + escapeHTML(p.repo) + '" target="_blank" rel="noopener">' + ICON_CODE + "GitHub" + ICON_OUT + "</a>";
    return html;
  }

  function workCard(p) {
    var badge = p.live
      ? '<a class="img-badge" href="' + escapeHTML(p.live) + '" target="_blank" rel="noopener">' + ICON_GLOBE + "Live Server" + ICON_OUT + "</a>"
      : '<a class="img-badge" href="' + escapeHTML(p.repo) + '" target="_blank" rel="noopener">' + ICON_CODE + "GitHub" + ICON_OUT + "</a>";
    return '<article class="wcard ' + escapeHTML(p.category) + '" data-category="' + escapeHTML(p.category) + '">' +
      '<div class="wimg"><img src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.title) + ' preview" width="' + p.imageW + '" height="' + p.imageH + '" loading="lazy">' + badge + "</div>" +
      '<div class="wbody"><p class="wmeta"><span class="wcat">' + escapeHTML(p.label) + '</span><span class="dot" aria-hidden="true">·</span><span>' + escapeHTML(p.subtitle) + "</span></p>" +
      "<h3>" + escapeHTML(p.title) + "</h3><p class=\"wdesc\">" + escapeHTML(p.summary) + "</p>" +
      '<p class="wtags">' + $.map(p.tags || [], escapeHTML).join('<span aria-hidden="true"> · </span>') + "</p>" +
      '<div class="wfoot"><div class="wbtns">' + linkButtons(p) + '</div><button class="details-link open-project" type="button" data-id="' + escapeHTML(p.id) + '">Details</button></div></div></article>';
  }

  var allProjects = [], currentFilter = "all", lastCols = 0;
  function layoutWork(force) {
    var $grid = $("#projectGrid");
    if (!$grid.length || !allProjects.length) return;
    var cols = window.innerWidth > 760 ? 2 : 1;
    if (!force && cols === lastCols) return;
    lastCols = cols;
    var shown = $.grep(allProjects, function (p) { return currentFilter === "all" || p.category === currentFilter; });
    var buckets = [];
    for (var c = 0; c < cols; c++) buckets.push("");
    $.each(shown, function (i, p) { buckets[i % cols] += workCard(p); });
    $grid.html($.map(buckets, function (b) { return '<div class="mcol">' + b + "</div>"; }).join(""));
    if (!reduceMotion && force) $grid.find(".wcard").hide().fadeIn(220);
    $("#projectCount").text("Showing " + shown.length + (shown.length === 1 ? " project" : " projects"));
  }

  if ($("#projectGrid").length) {
    loadJSON("data/projects.json", function (list) {
      allProjects = list;
      var counts = { all: list.length };
      $.each(list, function (_, p) {
        projectsById[p.id] = p;
        counts[p.category] = (counts[p.category] || 0) + 1;
      });
      $(".filter-btn").each(function () { $(this).find(".n").text(counts[$(this).data("filter")] || 0); });
      layoutWork(true);
    }, $("#projectStatus"));

    $(".filter-btn").on("click", function () {
      currentFilter = $(this).data("filter");
      $(".filter-btn").attr("aria-pressed", "false");
      $(this).attr("aria-pressed", "true");
      layoutWork(true);
    });
    var resizeTimer;
    $(window).on("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { layoutWork(false); }, 120);
    });
  }
  function updateCount() { /* kept for the single-page router */ }

  /* ---------- 6. Project details modal ---------- */
  var $modal = $("#projectModal"), lastFocus = null;
  $(document).on("click", ".open-project", function () {
    var p = projectsById[$(this).data("id")];
    if (!p) return;
    lastFocus = this;
    var items = $.map(p.highlights || [], function (h) { return "<li>" + escapeHTML(h) + "</li>"; }).join("");
    $("#modalContent").html(visualFor(p) +
      '<div class="body"><p class="wmeta"><span class="wcat ' + escapeHTML(p.category) + '">' + escapeHTML(p.label) + '</span><span class="dot">·</span><span>' + escapeHTML(p.subtitle || "") + "</span></p>" +
      '<h2 id="modalTitle">' + escapeHTML(p.title) + "</h2><p>" + escapeHTML(p.description) + "</p>" +
      "<h3>What it covers</h3><ul>" + items + "</ul>" +
      '<p class="wtags" style="margin-bottom:1.25rem">' + $.map(p.tags || [], escapeHTML).join(" · ") + "</p>" +
      '<div class="wbtns">' + linkButtons(p, true) + "</div></div>");
    $modal.addClass("open").attr("aria-hidden", "false");
    $("body").css("overflow", "hidden");
    $modal.find(".modal-close").trigger("focus");
  });
  function closeModal() {
    $modal.removeClass("open").attr("aria-hidden", "true");
    $("body").css("overflow", "");
    if (lastFocus) $(lastFocus).trigger("focus");
  }
  $modal.on("click", function (e) { if (e.target === this) closeModal(); });
  $modal.find(".modal-close").on("click", closeModal);
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $modal.hasClass("open")) closeModal();
  });

  /* ---------- 7. Academic background via Ajax ---------- */
  if ($(".js-education").length) {
    loadJSON("data/education.json", function (items) {
      $(".js-education").html($.map(items, function (ed) {
        var place = '<span class="inst">' + escapeHTML(ed.place) + "</span>" +
          (ed.location ? '<span class="dot" aria-hidden="true">·</span><span class="loc">' + escapeHTML(ed.location) + "</span>" : "");
        return '<li><div class="acad-side"><span class="years">' + escapeHTML(ed.years) + '</span><span class="score">' + escapeHTML(ed.result) + "</span></div>" +
          "<div><h3>" + escapeHTML(ed.degree) + '</h3><p class="where">' + place + "</p>" +
          (ed.note ? '<p class="note">' + escapeHTML(ed.note) + "</p>" : "") + "</div></li>";
      }).join(""));
    }, $(".js-edu-status").first());
  }

  /* ---------- 8. Skills: expandable process steps ---------- */
  $(".process.interactive li").attr({ tabindex: 0, role: "button", "aria-expanded": "false" })
    .on("click keydown", function (e) {
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      var open = $(this).attr("aria-expanded") === "true";
      $(this).attr("aria-expanded", !open)
        .find(".hint").text(open ? "Show details" : "Hide details").end()
        .find(".more").stop(true, true).slideToggle(reduceMotion ? 0 : 180);
    });

  /* ---------- 9. Contact: copy + validation ---------- */
  $(".copy-btn").on("click", function () {
    var $b = $(this), text = $b.data("copy");
    function done() { $b.text("Copied"); setTimeout(function () { $b.text("Copy"); }, 1500); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var $t = $("<input>").val(text).appendTo("body").trigger("select");
      document.execCommand("copy"); $t.remove(); done();
    }
  });

  var $msg = $("#message");
  $msg.on("input", function () { $("#charCount").text($(this).val().length + " / 600"); });

  function validate($i) {
    var v = $.trim($i.val()), id = $i.attr("id"), ok = true;
    if (id === "name") ok = v.length >= 2;
    if (id === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (id === "message") ok = v.length >= 10;
    $i.closest(".field").toggleClass("invalid", !ok);
    $i.attr("aria-invalid", !ok);
    return ok;
  }
  $("#contactForm").find("#name, #email, #message").on("blur", function () { validate($(this)); });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    var ok = true;
    $(this).find("#name, #email, #message").each(function () { if (!validate($(this))) ok = false; });
    if (!ok) { $(this).find(".invalid").first().find("input, textarea").trigger("focus"); return; }

    var name = $.trim($("#name").val());
    var topic = $("#topic").val();
    var subject = topic + " from " + name;
    var body = $.trim($msg.val()) + "\n\n" + name + "\n" + $.trim($("#email").val());
    window.location.href = "mailto:abir11hasan09@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    $("#formResult").html('Your email app is opening with the message ready to send. If it did not open, write to <a href="mailto:abir11hasan09@gmail.com">abir11hasan09@gmail.com</a>.').slideDown(200);
    this.reset();
    $("#charCount").text("0 / 600");
  });
});
