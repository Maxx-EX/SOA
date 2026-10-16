// ============================================================
// SOA · 分析模块（原创解读）
// 输出：维度卡 / 取向倾向 / 综合画像 / PBI·SC
// 取向倾向仅描述当前自我报告中的倾向，不定义、不贴标签
// 作者 Maxx-EX · Apache License 2.0
// ============================================================

window.SOA_Analysis = (function () {
  'use strict';

  var BANDS = {
    low:  { cls: 'low',  label: '低亮' },
    mid:  { cls: 'mid',  label: '中亮' },
    high: { cls: 'high', label: '高亮' }
  };

  // 各维度的解读骨架（band 词 + 解读段）
  var DIM_TXT = {
    atr: {
      desc: '你在情感与身体层面被怎样的人吸引，多元而非单一线。',
      text: {
        high: '你的吸引方向较为鲜明，能较清楚地觉察自己被怎样的人吸引。请继续信任并温柔对待这份真实的感受。',
        mid:  '你对吸引的感受是多层次、可流动的，并非单一方向。这是很多人在多元光谱中的常态，请给自己空间慢慢体会。',
        low:  '目前你报告的浪漫或性吸引较弱，或尚在形成之中。这与人的成长节奏、阶段都有关，也完全正常，不必勉强自己。'
      }
    },
    ide: {
      desc: '你对自身取向的清晰度与自在程度。',
      text: {
        high: '你对自己有较清晰的认知，也感到自在。这种笃定来自你持续地面对自己，值得珍惜。',
        mid:  '你对自身的认同仍在梳理之中，清晰与模糊交替出现。这恰恰是探索的常态，不必急于用一个词锁定自己。',
        low:  '你目前对自己的取向感到困惑或不确定。请理解：不确定不是缺陷，而是诚实的开始——慢慢来，答案会在感受中浮现。'
      }
    },
    aff: {
      desc: '超越身体的浪漫与情感亲近。',
      text: {
        high: '你很重视情感联结与长期陪伴，浪漫对你而言更多是灵魂层面的靠近。这样的你往往能建立深刻而真诚的关系。',
        mid:  '你同时在意情感与身体的联结，二者的比重会随对象而变化。请跟随具体的关系去感受，不必设定统一模板。',
        low:  '你当前对情感联结的强调相对较少，可能更看重其他层面，或还处在观望中。每种投入节奏都值得被尊重。'
      }
    },
    flx: {
      desc: '对取向随经历流动的开放与探索的从容。',
      text: {
        high: '你对变化保持开放，也能从容地探索自我。这种灵活性帮助你更贴近真实，而非被标签约束。',
        mid:  '你愿意了解自己，同时对变化有些谨慎。这是合理的平衡——保持开放，也不必催促自己。',
        low:  '你目前更希望保持稳定与确定，对探索持保守态度。稳定感同样重要；若哪天你愿意多看一步，那也可以。'
      }
    },
    acc: {
      desc: '不含羞耻、不自我否定的内在善待。',
      text: {
        high: '你很少用羞耻或对错来评判自己的取向，能善待真实的自己。这份自我接纳是内心稳定最坚实的底座。',
        mid:  '你大体能接纳自己，但偶尔仍会受到羞耻或他人眼光的影响。请记得：你的感受值得被温和对待。',
        low:  '你可能正承受较多的自我苛责或环境压力。请把自我接纳放在第一位——你不需要靠“正常”来证明价值，真实就是足够的理由。'
      }
    },
    ctx: {
      desc: '身边环境与你获得的接纳与安全感。',
      text: {
        high: '你身边存在接纳你的环境和可信任的人，让你能较自在地做自己。请珍惜这些关系，它们是你的支持系统。',
        mid:  '你的环境支持参差不齐——有些场合安心，有些需要谨慎。学会分辨并保护自己，是成熟而智慧的应对。',
        low:  '你目前感受到的外部支持与安全感较少，这容易带来孤独与压力。请记住：环境的态度不代表你的价值；主动寻找友善的支持（信任的人或专业心理支持）会很有帮助。'
      }
    }
  };

  function card(dim, norm) {
    var pct = Math.round(norm * 10) / 10;
    var b = SOA.bandOf(pct);
    return {
      key: dim.key, name: dim.name, full: dim.full, score: pct,
      band: BANDS[b], desc: DIM_TXT[dim.key].desc, text: DIM_TXT[dim.key].text[b]
    };
  }

  // 取向倾向：仅根据当前自我报告判断倾向，不贴死标签
  function tendency(answers) {
    function avg(ids) {
      var s = 0, n = 0;
      ids.forEach(function (id) { if (typeof answers[id] === 'number') { s += answers[id]; n++; } });
      return n ? s / n : 0;
    }
    var same = avg(['a1', 'a3']);
    var diff = avg(['a2', 'a4']);
    var fluid = avg(['a5', 'a6', 'a9', 'a10']);
    var none = avg(['a7']);

    var label = '多元探索中', text = '';
    if (none >= 3.5 && same < 3 && diff < 3) {
      label = '低浪漫/低吸引光谱';
      text = '目前你报告的浪漫或性吸引较弱。这可能与无性吸引或低浪漫（Ace / Aro）光谱相关，也可能只是阶段性的感受。是否用某个词来形容，完全由你自己决定。';
    } else if (same >= 3 && diff < 3) {
      label = '更偏同性别吸引';
      text = '在你的自我报告里，对相同性别的好感与心动更为明显。这是你当下的倾向，不等于永恒标签——请按自己的节奏去理解它。';
    } else if (diff >= 3 && same < 3) {
      label = '更偏异性吸引';
      text = '在你的自我报告里，对不同性别的好感与心动更为明显。这是你当下的倾向，不等于永恒标签——请按自己的节奏去理解它。';
    } else if (same >= 3 && diff >= 3) {
      label = '双性吸引倾向';
      text = '你同时能感受到对同性与异性的吸引。这种感受常见于双性向、泛性向等多元光谱——它们不是矛盾，而是你真实的丰富。';
    } else if (fluid >= 3.5) {
      label = '吸引方向偏流动';
      text = '你觉得自己的吸引方向难以用单一方向概括，随人与情境流动。这正是多元取向的一种形态，请允许自己不被框定。';
    } else {
      label = '取向尚在形成中';
      text = '目前你的自我报告还不足以指向某个明确方向。这再正常不过——很多人的感受是逐步清晰的，请给探索留出时间。';
    }
    return { same: same, diff: diff, fluid: fluid, label: label, text: text };
  }

  function buildReport(answers) {
    var res = SOA.score(answers);
    var norm = res.norm;
    var cards = SOA_DIMS.map(function (d) {
      return card(d, typeof norm[d.key] === 'number' ? norm[d.key] : 0);
    });

    // 综合画像
    var acc = norm.acc || 0, ctx = norm.ctx || 0, flx = norm.flx || 0;
    var portrait = '你的内在光谱已经显影。';
    if (acc >= 66) portrait += ' 你对自我接纳较为扎实，较少用羞耻或对错评判自己的取向——这是内心稳定的底座。';
    else if (acc < 40) portrait += ' 自我接纳可能是你当下最需要关照的课题：你的感受值得被温和对待，不必用“正常”来换取价值。';
    if (ctx < 40) portrait += ' 同时，你的外部支持与安全感相对不足，孤独感可能较重，请主动寻找友善的关系或专业支持。';
    if (flx >= 66) portrait += ' 你对变化保持开放，探索姿态从容而灵活。';
    portrait += ' 无论当下处于光谱的哪一端，SOA 都只描述你此刻的感受，不代表永恒，也不替你定义——你有权用自己的方式慢慢认识自己。';

    var t = tendency(answers);
    var pbi = res.pbi, sc = res.sc;
    var pbiText = '心理平衡指数 PBI（所有维度均值）：' + (pbi !== null ? pbi : '--') + ' / 100。';
    if (pbi !== null) {
      if (pbi >= 66) pbiText += ' 整体偏中高亮，说明你对自我的觉察与投入较充足。';
      else if (pbi <= 40) pbiText += ' 整体偏低调，可能正处于自我梳理或环境支持不足的阶段。';
      else pbiText += ' 处于常见的中间地带，代表一种仍在动态平衡中的状态。';
    }
    var scText = '光谱一致性 SC（维度间标准差）：' + (sc !== null ? sc : '--') + '。' +
      (sc !== null ? (sc > 18 ? ' 数值偏大，说明各维度差异明显——有些方面成熟、有些待关照。' : ' 数值较小，说明你的各维度较为均衡。') : '');

    return { cards: cards, composite: { pbi: pbi, sc: sc }, pbiText: pbiText, scText: scText,
             portrait: portrait, tendency: t };
  }

  return { buildReport: buildReport, BANDS: BANDS };
})();
