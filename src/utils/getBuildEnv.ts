export const getBuildEnv = () => {
  let buildEnv: 'production' | 'development' | 'preview' | undefined;
  try {
    buildEnv = process.env.BUILD_ENV as
      | 'production'
      | 'development'
      | 'preview';
    if (buildEnv === undefined) {
      throw new Error('envが取得できませんでした。');
    }
  } catch (err) {
    throw new Error('envが取得できませんでした。');
  }
  return buildEnv;
};
