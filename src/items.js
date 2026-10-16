// ============================================================
// SOA · 性取向光谱分析（Sexual Orientation Spectrum）
// 完全原创量表 · 6 维度 · 60 题 · 4 选项（非常不符合/较不符合/较符合/非常符合）
// 作者 Maxx-EX · Apache License 2.0 · 开源免费 · 版权归作者
// ============================================================

// 维度定义
window.SOA_DIMS = [
  { key: 'atr', name: '吸引取向',  full: 'Attraction Orientation', note: '你在情感与身体层面被怎样的人吸引，多元而非单一线。' },
  { key: 'ide', name: '认同舒适',  full: 'Identity Comfort',       note: '你对自身取向的清晰度与自在程度。' },
  { key: 'aff', name: '情感联结',  full: 'Affective Affinity',     note: '超越身体的浪漫与情感亲近。' },
  { key: 'flx', name: '流动探索',  full: 'Fluidity & Exploration', note: '对取向随经历流动的开放与探索的从容。' },
  { key: 'acc', name: '自我接纳',  full: 'Self-Acceptance',        note: '不含羞耻、不自我否定的内在善待。' },
  { key: 'ctx', name: '环境支持',  full: 'Context & Support',      note: '身边环境与你获得的接纳与安全感。' }
];

// 题目（60 题 · 每维 10 题 · 反向题 reverse:true）
window.SOA_ITEMS = [
  // ---------- 吸引取向 atr ----------
  { id: 'a1',  dim: 'atr', text: '我常常对与我相同性别的人产生好感。' },
  { id: 'a2',  dim: 'atr', text: '我常常对与我不同性别的人产生好感。' },
  { id: 'a3',  dim: 'atr', text: '我会设想与一位相同性别的伴侣共度余生。' },
  { id: 'a4',  dim: 'atr', text: '我会设想与一位不同性别的伴侣共度余生。' },
  { id: 'a5',  dim: 'atr', text: '无论对方是什么性别，只要彼此合拍，我都能感受到吸引。' },
  { id: 'a6',  dim: 'atr', text: '我觉得自己的吸引方向是流动的，会随感受而变化。' },
  { id: 'a7',  dim: 'atr', text: '目前我几乎感受不到对任何人的浪漫或性吸引。' },
  { id: 'a8',  dim: 'atr', text: '我清楚自己被怎样的人吸引，并愿意接受这一点。' },
  { id: 'a9',  dim: 'atr', text: '比起生理性别，我更被对方的内在特质吸引。' },
  { id: 'a10', dim: 'atr', text: '我不会用单一标签去框定自己的吸引方向。' },

  // ---------- 认同舒适 ide ----------
  { id: 'i1',  dim: 'ide', text: '我对自己目前的性取向有比较清晰的认知。' },
  { id: 'i2',  dim: 'ide', text: '我目前很难用某个词来描述自己的性取向。', reverse: true },
  { id: 'i3',  dim: 'ide', text: '我认同自己的取向，并为此感到自在。' },
  { id: 'i4',  dim: 'ide', text: '即使不告诉任何人，我也能平静地接受真实的自己。' },
  { id: 'i5',  dim: 'ide', text: '性取向是我的一部分，但我不会用它定义全部的我。' },
  { id: 'i6',  dim: 'ide', text: '我有时会反复怀疑自己到底算哪一种。', reverse: true },
  { id: 'i7',  dim: 'ide', text: '我更愿意跟随真实感受，而不是套用现成的标签。' },
  { id: 'i8',  dim: 'ide', text: '我了解性取向是一个多元的光谱，不必非此即彼。' },
  { id: 'i9',  dim: 'ide', text: '我对探索自己的取向保持耐心，不急于下结论。' },
  { id: 'i10', dim: 'ide', text: '他人的标签，无论肯定与否，都不会轻易动摇我。' },

  // ---------- 情感联结 aff ----------
  { id: 'f1',  dim: 'aff', text: '对我而言，情感上的亲近比身体上的吸引更重要。' },
  { id: 'f2',  dim: 'aff', text: '我能对不同性别的人产生深层的情感依赖。' },
  { id: 'f3',  dim: 'aff', text: '我能对相同性别的人产生深层的情感依赖。' },
  { id: 'f4',  dim: 'aff', text: '浪漫的感觉，往往在我建立情感联结后变得更强烈。' },
  { id: 'f5',  dim: 'aff', text: '我更看重长期的陪伴，而非一时的激情。' },
  { id: 'f6',  dim: 'aff', text: '我对恋爱该有的模样有自己的想象，不照搬他人。' },
  { id: 'f7',  dim: 'aff', text: '我能分辨好感、喜欢与爱之间的不同。' },
  { id: 'f8',  dim: 'aff', text: '当我喜欢一个人时，我渴望被理解，而不是被占有。' },
  { id: 'f9',  dim: 'aff', text: '我的情感联结不取决于对方的性别标签。' },
  { id: 'f10', dim: 'aff', text: '我允许自己投入感情，即使结果未知。' },

  // ---------- 流动探索 flx ----------
  { id: 'x1',  dim: 'flx', text: '我接受取向可能随时间或经历而变化这一可能。' },
  { id: 'x2',  dim: 'flx', text: '我愿意在安全的前提下，探索自己真实的感受。' },
  { id: 'x3',  dim: 'flx', text: '我不会因为害怕变化，就压抑真实的感受。' },
  { id: 'x4',  dim: 'flx', text: '对以后可能会不一样这件事，我保持开放而不焦虑。' },
  { id: 'x5',  dim: 'flx', text: '我能诚实地面对探索中冒出的新感受。' },
  { id: 'x6',  dim: 'flx', text: '我不需要用够不够彻底来证明自己的取向。' },
  { id: 'x7',  dim: 'flx', text: '我明白探索不等于一定要改变，只是更了解自己。' },
  { id: 'x8',  dim: 'flx', text: '我能区分好奇的尝试与真实的长久认同。' },
  { id: 'x9',  dim: 'flx', text: '我不会因外界的催促，就仓促给自己下定义。' },
  { id: 'x10', dim: 'flx', text: '即使当前的答案不清晰，我也不会因此否定自己。' },

  // ---------- 自我接纳 acc ----------
  { id: 'c1',  dim: 'acc', text: '无论我的取向是什么，我都不会觉得它是错误或病。' },
  { id: 'c2',  dim: 'acc', text: '我不会因为自己的感受而产生羞耻。' },
  { id: 'c3',  dim: 'acc', text: '我能像对待一位朋友那样，善待自己。' },
  { id: 'c4',  dim: 'acc', text: '我不需要用正常来证明自己。' },
  { id: 'c5',  dim: 'acc', text: '出现困惑或波动时，我会温和对待自己，而非苛责。' },
  { id: 'c6',  dim: 'acc', text: '我了解性取向不是一种可以被纠正的缺陷。' },
  { id: 'c7',  dim: 'acc', text: '我不会因他人可能不认同，就先行否定自己。' },
  { id: 'c8',  dim: 'acc', text: '我相信真实的自己值得被接纳。' },
  { id: 'c9',  dim: 'acc', text: '我可以坦然地慢慢认识自己，不必着急。' },
  { id: 'c10', dim: 'acc', text: '需要时，我愿意寻求专业的心理支持来帮助自己。' },

  // ---------- 环境支持 ctx ----------
  { id: 's1',  dim: 'ctx', text: '我身边有接纳我、让我能坦诚做自己的人。' },
  { id: 's2',  dim: 'ctx', text: '我担心他人会因我的取向而疏远或评判我。', reverse: true },
  { id: 's3',  dim: 'ctx', text: '我在大部分场合能按自己的意愿生活，不必过度隐藏。' },
  { id: 's4',  dim: 'ctx', text: '我知道在哪里可以找到可靠的心理支持或友善的社群。' },
  { id: 's5',  dim: 'ctx', text: '选择是否公开取向，是我自己的权利，不代表我羞耻。' },
  { id: 's6',  dim: 'ctx', text: '我能分辨哪些环境对我友善，哪些需要保持谨慎。' },
  { id: 's7',  dim: 'ctx', text: '家人或朋友的态度，不会成为我评判自己的标准。' },
  { id: 's8',  dim: 'ctx', text: '我会在感到安全时，向信任的人敞开心扉。' },
  { id: 's9',  dim: 'ctx', text: '我不需要用对抗或证明，来换取被接纳。' },
  { id: 's10', dim: 'ctx', text: '环境是否接纳我，不会改变我的自我价值。' }
];

// 说明与免责
window.SOA_META = {
  version: 'SOA 1.0',
  title: 'SOA · 性取向光谱分析',
  tagline: '完全原创 · 开源免费 · Apache 2.0',
  notice: '作答方式：每题在「非常不符合 / 较不符合 / 较符合 / 非常符合」4 个选项中，选择最接近自己的一项，凭第一直觉即可。全程本地运行，不收集、不上传任何数据。',
  disclaimer: '重要说明：SOA 是性取向的自我探索工具，不是诊断、不是医学鉴定，也不构成任何医疗建议。性取向不是疾病，也并非个人选择；它是多元、流动且私密的个人维度。本结果只描述你当前自我报告中的倾向，不替你定义或贴标签——你完全有权用自己的方式认同自己。若你正因取向、认同或相关压力感到持续困扰，请寻求专业的心理咨询支持（而非任何试图改变取向的做法，后者有害且无必要）。',
  author: 'Maxx-EX',
  email: 'programmingscience@foxmail.com'
};

// 自检
(function selfCheck() {
  if (!window.SOA_ITEMS) return;
  var count = window.SOA_ITEMS.length;
  var dimMap = {};
  window.SOA_ITEMS.forEach(function (it) { dimMap[it.dim] = (dimMap[it.dim] || 0) + 1; });
  console.log('[SOA 自检] 题目总数:', count, '| 各维度题数:', JSON.stringify(dimMap));
})();
