import { VFC } from 'react';
import VisaBrandIcon from '../../../../public/Icon/CardBrand/Visa.svg';
import AmexBrandIcon from '../../../../public/Icon/CardBrand/AmericanExpress.svg';
import MastercardBrandIcon from '../../../../public/Icon/CardBrand/MasterCard.svg';
import JcbBrandIcon from '../../../../public/Icon/CardBrand/Jcb.svg';
import UnknownBrandIcon from '../../../../public//Icon//CardBrand/Unknown.svg';
import { ImageProps } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
  brandName: string;
} & ImageProps;

const BrandIconSrc = (brandName: string) => {
  switch (brandName) {
    case 'visa':
      return VisaBrandIcon;
    case 'amex':
      return AmexBrandIcon;
    case 'jcb':
      return JcbBrandIcon;
    case 'mastercard':
      return MastercardBrandIcon;
    default:
      return UnknownBrandIcon;
  }
};

export const CardBrandIcon: VFC<Props> = ({ brandName }) => (
  <Image
    src={BrandIconSrc(brandName)}
    alt={`${brandName}Icon`}
    width={60}
    height={60}
  />
);
