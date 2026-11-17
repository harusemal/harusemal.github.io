/* 하루세말 시제품 동작
   - 공개일(release)이 오늘(한국 시간) 이전인 표현만 보여 준다.
   - 내 표현장·복습 진도는 localStorage(이 브라우저)에만 저장한다. */
(function () {
  "use strict";
  var DATA = window.HSM_DATA || [];
  var KEY_SAVED = "hsm.saved.v1", KEY_BOX = "hsm.box.v1", KEY_EN = "hsm.en.v1";

  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function todayKST() {
    var now = new Date(Date.now() + 9 * 3600 * 1000);
    return now.toISOString().slice(0, 10);
  }
  var TODAY = todayKST();
  var published = DATA.filter(function (x) { return x.release <= TODAY; })
    .sort(function (a, b) { return a.release < b.release ? 1 : a.release > b.release ? -1 : a.order - b.order; });
  var latestDay = published.length ? published[0].release : null;

  var saved = load(KEY_SAVED, []);
  function isSaved(id) { return saved.indexOf(id) >= 0; }
  function toggleSave(id) {
    if (isSaved(id)) saved = saved.filter(function (x) { return x !== id; }); else saved.push(id);
    save(KEY_SAVED, saved);
    document.querySelectorAll('.star[data-id="' + id + '"]').forEach(function (b) { b.classList.toggle("on", isSaved(id)); });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function cardHTML(x) {
    var sides = x.sides.map(function (s) {
      return '<div class="side ' + s.tone + '"><b>' + esc(s.word) + '</b><span class="hanja">' + esc(s.hanja) + "</span>" + s.svg + '<div class="one">' + esc(s.one) + "</div></div>";
    }).join("");
    var opts = x.quiz.options.map(function (o) { return '<button class="opt" data-ans="' + esc(o) + '">' + esc(o) + "</button>"; }).join("");
    return '<article class="card" data-id="' + x.id + '">' +
      '<div class="top"><span class="tag">' + esc(x.tag) + '</span><button class="star' + (isSaved(x.id) ? " on" : "") + '" data-id="' + x.id + '" title="내 표현장에 담기">★</button></div>' +
      "<h3>" + esc(x.pair[0]) + "<span>vs</span>" + esc(x.pair[1]) + "</h3>" +
      '<div class="q">' + esc(x.question) + "</div>" +
      '<div class="pair">' + sides + "</div>" +
      '<div class="tip"><span class="t">💡 외우기</span><br>' + x.tip.join("<br>") + "</div>" +
      '<ul class="ex">' + x.examples.map(function (e) { return "<li>" + e + "</li>"; }).join("") + "</ul>" +
      '<div class="enline">🌏 ' + esc(x.en) + "</div>" +
      '<div class="quiz" data-answer="' + esc(x.quiz.answer) + '"><b>Q.</b> ' + esc(x.quiz.q) + "<div>" + opts + '</div><div class="fb"></div></div>' +
      "</article>";
  }

  function bindQuiz(root) {
    root.querySelectorAll(".quiz").forEach(function (qz) {
      qz.querySelectorAll(".opt").forEach(function (b) {
        b.addEventListener("click", function () {
          var ok = b.dataset.ans === qz.dataset.answer;
          qz.querySelectorAll(".opt").forEach(function (o) { o.classList.remove("right", "wrong"); });
          b.classList.add(ok ? "right" : "wrong");
          qz.querySelector(".fb").textContent = ok ? "정답이에요! 👏" : "아쉬워요. 다시 골라 볼까요?";
        });
      });
    });
    root.querySelectorAll(".star").forEach(function (b) { b.addEventListener("click", function () { toggleSave(b.dataset.id); renderSaved(); }); });
  }

  function renderToday() {
    var box = document.getElementById("cards");
    var list = published.filter(function (x) { return x.release === latestDay; }).sort(function (a, b) { return a.order - b.order; });
    document.getElementById("todayDate").textContent = latestDay ? latestDay.replace(/-/g, ". ") + " 공개" : "";
    box.innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="empty">아직 공개된 표현이 없습니다.</p>';
    bindQuiz(box);
  }

  function renderSaved() {
    var box = document.getElementById("savedList");
    var list = published.filter(function (x) { return isSaved(x.id); });
    if (!list.length) { box.innerHTML = '<p class="empty">아직 담은 표현이 없어요. 카드의 ★를 눌러 보세요.</p>'; return; }
    box.innerHTML = list.map(function (x) {
      return '<div class="saveditem"><span><b>' + esc(x.pair[0]) + "</b> vs <b>" + esc(x.pair[1]) + '</b> <small style="color:#999">' + esc(x.tag) + '</small></span><button class="star on" data-id="' + x.id + '">★</button></div>';
    }).join("");
    box.querySelectorAll(".star").forEach(function (b) { b.addEventListener("click", function () { toggleSave(b.dataset.id); renderSaved(); }); });
  }

  /* 복습 카드: 간단한 상자 방식(라이트너). 맞히면 상자 번호가 올라가 덜 자주 나온다. */
  var boxes = load(KEY_BOX, {});
  var flashQueue = [], flashIdx = 0, flipped = false;
  function buildQueue() {
    var pool = published.filter(function (x) { return isSaved(x.id); });
    if (!pool.length) pool = published.slice();
    pool.sort(function (a, b) { return (boxes[a.id] || 0) - (boxes[b.id] || 0); });
    flashQueue = pool; flashIdx = 0; flipped = false;
  }
  function renderFlash() {
    var area = document.getElementById("flashArea");
    if (!flashQueue.length) buildQueue();
    if (!flashQueue.length) { area.innerHTML = '<p class="empty">복습할 표현이 없어요.</p>'; return; }
    if (flashIdx >= flashQueue.length) {
      area.innerHTML = '<p class="empty">한 바퀴 끝! 🎉<br><button class="btn good" id="again">처음부터 다시</button></p>';
      document.getElementById("again").onclick = function () { buildQueue(); renderFlash(); };
      return;
    }
    var x = flashQueue[flashIdx];
    area.innerHTML = '<div class="flashcard" id="fc">' + (flipped ? "<div><b>" + esc(x.flash.back) + '</b><span class="hint">' + x.tip[0] + "</span></div>" : "<div>" + esc(x.flash.front) + '<span class="hint">눌러서 답 보기</span></div>') + "</div>" +
      (flipped ? '<div class="flashbtns"><button class="btn again" id="b0">다시 볼래요</button><button class="btn good" id="b1">알았어요</button></div>' : "") +
      '<p class="count">' + (flashIdx + 1) + " / " + flashQueue.length + " · 상자 " + (boxes[x.id] || 0) + "</p>";
    document.getElementById("fc").onclick = function () { flipped = !flipped; renderFlash(); };
    if (flipped) {
      document.getElementById("b0").onclick = function () { boxes[x.id] = 0; save(KEY_BOX, boxes); flashIdx++; flipped = false; renderFlash(); };
      document.getElementById("b1").onclick = function () { boxes[x.id] = Math.min((boxes[x.id] || 0) + 1, 5); save(KEY_BOX, boxes); flashIdx++; flipped = false; renderFlash(); };
    }
  }

  function renderQuiz() {
    var area = document.getElementById("quizArea");
    if (!published.length) { area.innerHTML = '<p class="empty">퀴즈가 없어요.</p>'; return; }
    area.innerHTML = published.map(function (x, i) {
      var opts = x.quiz.options.map(function (o) { return '<button class="opt" data-ans="' + esc(o) + '">' + esc(o) + "</button>"; }).join("");
      return '<div class="card"><div class="quiz" data-answer="' + esc(x.quiz.answer) + '"><b>객관식 ' + (i + 1) + ".</b> " + esc(x.quiz.q) + "<div>" + opts + '</div><div class="fb"></div></div>' +
        '<div class="quiz short" data-i="' + i + '"><b>단답형 ' + (i + 1) + ".</b> " + esc(x.short.q) + '<div><input class="shortin" placeholder="답을 적고 Enter"> <button class="opt chk">확인</button></div><div class="fb"></div></div></div>';
    }).join("");
    bindQuiz(area);
    area.querySelectorAll(".quiz.short").forEach(function (qz) {
      var x = published[+qz.dataset.i], inp = qz.querySelector("input");
      function check() {
        var v = inp.value.replace(/\s+/g, "");
        var ok = x.short.answers.some(function (a) { return a.replace(/\s+/g, "") === v; });
        qz.querySelector(".fb").textContent = ok ? "정답이에요! 👏" : "정답: " + x.short.answers[0];
      }
      qz.querySelector(".chk").onclick = check;
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") check(); });
    });
  }

  function show(tab) {
    ["today", "saved", "flash", "quiz"].forEach(function (t) { document.getElementById("tab-" + t).hidden = t !== tab; });
    document.querySelectorAll("nav a").forEach(function (a) { a.classList.toggle("on", a.dataset.tab === tab); });
    if (tab === "saved") renderSaved();
    if (tab === "flash") { buildQueue(); renderFlash(); }
    if (tab === "quiz") renderQuiz();
  }
  function route() { var t = (location.hash || "#today").slice(1); show(["today", "saved", "flash", "quiz"].indexOf(t) >= 0 ? t : "today"); }

  var en = load(KEY_EN, false);
  var enBtn = document.getElementById("enToggle");
  function applyEn() { document.body.classList.toggle("en-on", en); enBtn.classList.toggle("on", en); }
  enBtn.onclick = function () { en = !en; save(KEY_EN, en); applyEn(); };

  applyEn();
  renderToday();
  window.addEventListener("hashchange", route);
  route();
})();
