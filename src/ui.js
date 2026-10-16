// ============================================================
// SOA · 界面逻辑
// 答题流程 + 结果渲染（原创）
// 作者 Maxx-EX · Apache License 2.0
// ============================================================

window.SOA_UI = (function () {
  'use strict';

  var state = { idx: 0, answers: {} };
  var ORDER = SOA.ORDER;

  var $ = function (id) { return document.getElementById(id); };

  function progress() {
    var answered = Object.keys(state.answers).length;
    $('progressFill').style.width = (answered / SOA_ITEMS.length * 100) + '%';
    $('qCount').textContent = (state.idx + 1) + ' / ' + ORDER.length;
  }

  function renderQuestion() {
    var it = ORDER[state.idx];
    $('qDim').textContent = SOA_DIMS.find(function (d) { return d.key === it.dim; }).name;
    $('qText').textContent = it.text;
    var box = $('qOpts');
    box.innerHTML = '';
    var labels = ['非常不符合', '较不符合', '较符合', '非常符合'];
    labels.forEach(function (lab, v) {
      var btn = document.createElement('button');
      btn.className = 'opt' + (state.answers[it.id] === v + 1 ? ' sel' : '');
      btn.textContent = lab;
      btn.addEventListener('click', function () { pick(v + 1); });
      box.appendChild(btn);
    });
    $('prevBtn').disabled = state.idx === 0;
    $('nextBtn').disabled = typeof state.answers[it.id] !== 'number';
    progress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function pick(v) {
    state.answers[ORDER[state.idx].id] = v;
    Array.prototype.forEach.call($('qOpts').children, function (el, i) {
      el.classList.toggle('sel', i === v - 1);
    });
    $('nextBtn').disabled = false;
    progress();
  }

  function next() {
    if (state.idx < ORDER.length - 1) { state.idx++; renderQuestion(); }
    else if (Object.keys(state.answers).length >= SOA_ITEMS.length) showResults();
  }
  function prev() { if (state.idx > 0) { state.idx--; renderQuestion(); } }

  // ---------- 结果渲染 ----------
  function showResults() {
    var report = SOA_Analysis.buildReport(state.answers);
    $('quizScreen').style.display = 'none';
    $('resultScreen').style.display = 'block';

    // 取向倾向
    $('tendLabel').textContent = report.tendency.label;
    $('tendText').textContent = report.tendency.text;

    // KPI
    var c = report.composite;
    $('kpiPbi').innerHTML = (c.pbi !== null ? c.pbi : '--') + '<span class="unit"> / 100</span>';
    $('kpiSc').innerHTML = (c.sc !== null ? c.sc : '--') + '<span class="unit"> 标准差</span>';
    $('pbiText').textContent = report.pbiText;
    $('scText').textContent = report.scText;

    // 维度卡
    var dg = $('dimGrid');
    dg.innerHTML = '';
    report.cards.forEach(function (card) {
      var col = card.band.cls === 'low' ? 'var(--low)' : (card.band.cls === 'high' ? 'var(--high)' : 'var(--mid)');
      var el = document.createElement('div');
      el.className = 'dim-card';
      el.innerHTML =
        '<h4>' + card.name + '<span class="tag ' + card.band.cls + '">' + card.band.label + ' · ' + card.score + '</span></h4>' +
        '<div class="full">' + card.full + '</div>' +
        '<div class="scorebar"><i style="width:' + card.score + '%;background:' + col + '"></i></div>' +
        '<div class="scoreval">' + card.score + '<span style="font-size:12px;color:var(--muted)"> / 100</span></div>' +
        '<div class="desc">' + card.desc + '</div>' +
        '<div class="anlys">' + card.text + '</div>';
      dg.appendChild(el);
    });

    // 综合画像
    $('portrait').textContent = report.portrait;

    // 免责
    $('resultDisclaimer').textContent = SOA_META.disclaimer;
  }

  // ---------- 初始化 ----------
  function init() {
    if ($('soaNotice')) $('soaNotice').textContent = SOA_META.notice;
    if ($('soaDisclaimer')) $('soaDisclaimer').textContent = SOA_META.disclaimer;

    $('startBtn').addEventListener('click', function () {
      $('startScreen').style.display = 'none';
      $('quizScreen').style.display = 'block';
      state.idx = 0; state.answers = {};
      renderQuestion();
    });
    $('prevBtn').addEventListener('click', prev);
    $('nextBtn').addEventListener('click', next);
    $('restartBtn').addEventListener('click', function () {
      state.idx = 0; state.answers = {};
      $('resultScreen').style.display = 'none';
      $('quizScreen').style.display = 'block';
      renderQuestion();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  return { ORDER: ORDER };
})();
