import { ImageProps, Image } from '@chakra-ui/react';
import { VFC } from 'react';

type Props = {
  varient: 'active' | 'none';
} & ImageProps;

export const Thumbnail: VFC<Props> = ({ varient, ...rest }) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...(varient === 'active'
        ? {
            opacity: 1,
          }
        : { opacity: 0.6 })}
      {...rest}
    />
  );
};
