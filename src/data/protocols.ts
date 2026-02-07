export interface Protocol {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const protocols: Protocol[] = [
  {
    id: 'no-sugar-drink',
    title: '含糖饮料清零',
    description: '用无糖饮品替代含糖饮料，观察身体的变化',
    icon: '🥤',
  },
  {
    id: 'no-late-snack',
    title: '晚饭后不吃零食',
    description: '晚餐结束后不再进食，给消化系统充分休息',
    icon: '🌙',
  },
  {
    id: 'walk-8000',
    title: '每日步数 ≥ 8000',
    description: '用日常行走替代刻意运动，让活动成为生活的一部分',
    icon: '🚶',
  },
  {
    id: 'protein-breakfast',
    title: '蛋白质早餐',
    description: '以蛋白质开始新的一天，延长饱腹感',
    icon: '🥚',
  },
  {
    id: 'early-dinner',
    title: '晚饭提前',
    description: '将晚餐时间提前，给身体更长的代谢窗口',
    icon: '⏰',
  },
  {
    id: 'plate-method',
    title: '盘子法',
    description: '用视觉指引控制食量，而非计算热量',
    icon: '🍽️',
  },
  {
    id: 'limit-alcohol',
    title: '酒精限制',
    description: '减少酒精摄入，观察睡眠质量和第二天的状态',
    icon: '🍷',
  },
  {
    id: 'snack-replace',
    title: '零食替换',
    description: '用低加工食物替代精加工零食',
    icon: '🥜',
  },
];
