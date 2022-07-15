import { memo, VFC } from 'react';
import { NotFound } from 'components/organisms/Error/notFound';

type Props = {
  message: string;
  subMessage?: string;
};

const Component = (props: Props) => {
  return (
    <NotFound
      message={props.message}
      subMessage={props.subMessage}
      linkProps={{ path: '/', text: 'ホームへ戻る' }}
    />
  );
};

export const ClosePageTemplate = memo(Component);
