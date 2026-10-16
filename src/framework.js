// ============================================================
// SOA · 计分引擎（原创）
// 每维 10 题 · 选项 1–4 分 · 反向题 5−原始分 · 原始分 10–40 → 标准化 0–100
// PBI（已答维度均值）+ SC（维度间标准差）双指标
// 作者 Maxx-EX · Apache License 2.0
// ============================================================

window.SOA = (function () {
  'use strict';

  // 维度交错排序，避免连续同类题
  function buildOrder() {
    var byDim = {};
    SOA_ITEMS.forEach(function (it) { (byDim[it.dim] = byDim[it.dim] || []).push(it); });
    var dims = Object.keys(byDim);
    var order = [], i = 0, added = true;
    while (added) {
      added = false;
      dims.forEach(function (d) { if (i < byDim[d].length) { order.push(byDim[d][i]); added = true; } });
      i++;
    }
    return order;
  }
  var ORDER = buildOrder();

  function score(answers) {
    var norm = {}, raw = {};
    SOA_DIMS.forEach(function (dim) {
      var items = SOA_ITEMS.filter(function (it) { return it.dim === dim.key; });
      var vals = [], sum = 0;
      items.forEach(function (it) {
        var v = answers[it.id];
        if (typeof v === 'number') { vals.push(it.reverse ? (5 - v) : v); sum += (it.reverse ? (5 - v) : v); }
      });
      if (vals.length) {
        var avg = sum / vals.length;          // 1–4
        norm[dim.key] = Math.round((avg - 1) / 3 * 1000) / 10; // 0–100
        raw[dim.key] = Math.round(avg * 10) / 10;
      }
    });

    // PBI = 已答维度均值；SC = 维度间标准差
    var keys = Object.keys(norm);
    var pbi = null, sc = null;
    if (keys.length) {
      pbi = Math.round(keys.reduce(function (a, k) { return a + norm[k]; }, 0) / keys.length * 10) / 10;
      var m = keys.reduce(function (a, k) { return a + norm[k]; }, 0) / keys.length;
      var v = keys.reduce(function (a, k) { return a + Math.pow(norm[k] - m, 2); }, 0) / keys.length;
      sc = Math.round(Math.sqrt(v) * 10) / 10;
    }
    return { norm: norm, raw: raw, pbi: pbi, sc: sc };
  }

  // 分层（沿用 LSM 口径：低亮 / 中亮 / 高亮）
  function bandOf(pct) {
    return pct >= 66 ? 'high' : (pct >= 40 ? 'mid' : 'low');
  }

  return { ORDER: ORDER, score: score, bandOf: bandOf };
})();
