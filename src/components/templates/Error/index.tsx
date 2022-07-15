import { memo, VFC } from 'react';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';

const Component: VFC = () => {
  return (
    <ErrorFetchFaild
      message="404 Not Found"
      includeSubMessage={false}
      linkProps={{ path: '/', text: 'ホームへ戻る' }}
    />
  );
};

export const ErrorTemplate = memo(Component);
