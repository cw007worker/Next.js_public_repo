const publicRoutesBase = [
  //501, 404, 401とか
  {
    from: new RegExp(`^\/[0-9]{3}$`),
  },
  {
    from: new RegExp(`^\/toApp$`),
  },
  //onboarding以下
  {
    from: new RegExp(`^(\/comingsoon)`),
  },
  //onboarding以下
  {
    from: new RegExp(`^(\/onboarding)`),
  },
  //auth以下
  {
    from: new RegExp(`^(\/auth)`),
  },
  //guide以下
  {
    from: new RegExp(`^(\/guide)`),
  },
  // 初売り
  {
    from: new RegExp(`^(\/firstSale)`),
  },
  // 友達紹介用リンク
  {
    from: new RegExp(`^(\/lp)`),
  },
  // TOPページ
  // NOTE:広告打つ関係で、web側のtopページも一時的に開放する
  {
    from: new RegExp(`^\/$`),
  },
  {
    from: new RegExp(`^(\/products)`),
  },
  {
    from: new RegExp(`^(\/brands)`),
  },
];

export const publicRoutesForApp = [...publicRoutesBase];

export const publicRoutesForWeb = [...publicRoutesBase];
