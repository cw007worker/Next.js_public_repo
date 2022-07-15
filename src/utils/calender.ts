const PERIOD_LIST = {
  month: '月',
  year: '年',
};

export const periodHumanReadable = (period: 'month' | 'year') => {
  return PERIOD_LIST[period];
};
