import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import LeftVectorWhite from '../../../static/LeftVectorWhite.png';
import RightVectorWhite from '../../../static/RightVectorWhite.png';
import Product01 from '../../../static/Product01.jpeg';
import Product02 from '../../../static/Product02.jpeg';
import Product03 from '../../../static/Product03.jpeg';
import Product04 from '../../../static/Product04.jpeg';
import Product05 from '../../../static/Product05.jpeg';
import Product06 from '../../../static/Product06.jpeg';
import Product07 from '../../../static/Product07.jpeg';
import Product08 from '../../../static/Product08.jpeg';
import Product09 from '../../../static/Product09.jpeg';
import Product10 from '../../../static/Product10.jpeg';
import Product11 from '../../../static/Product11.jpeg';
import Product12 from '../../../static/Product12.jpeg';
import Product13 from '../../../static/Product13.jpeg';
import Product14 from '../../../static/Product14.jpeg';
import Product15 from '../../../static/Product15.jpeg';
import Product16 from '../../../static/Product16.jpeg';
import Product17 from '../../../static/Product17.jpeg';
import Product18 from '../../../static/Product18.jpeg';
import Product19 from '../../../static/Product19.jpeg';
import Product20 from '../../../static/Product20.jpeg';
import Product21 from '../../../static/Product21.jpeg';
import Product22 from '../../../static/Product22.jpeg';
import Product23 from '../../../static/Product23.jpeg';
import Product24 from '../../../static/Product24.jpeg';
import Product25 from '../../../static/Product25.jpeg';
import Product26 from '../../../static/Product26.jpeg';
import Product27 from '../../../static/Product27.jpeg';
import Product28 from '../../../static/Product28.jpeg';
import useMedia from 'use-media';
import React from 'react';
import clsx from 'clsx';

const PRODUCTS = [
  {
    img: Product01,
    discount: 7,
  },
  {
    img: Product02,
    discount: 7,
  },
  {
    img: Product03,
    discount: 14,
  },
  {
    img: Product04,
    discount: 5,
  },
  {
    img: Product05,
    discount: 6,
  },
  {
    img: Product06,
    discount: 7,
  },
  {
    img: Product07,
    discount: 14,
  },
  {
    img: Product08,
    discount: 5,
  },
  {
    img: Product09,
    discount: 18,
  },
  {
    img: Product10,
    discount: 20,
  },
  {
    img: Product11,
    discount: 14,
  },
  {
    img: Product12,
    discount: 6,
  },
  {
    img: Product13,
    discount: 20,
  },
  {
    img: Product14,
    discount: 16,
  },
  {
    img: Product15,
    discount: 8,
  },
  {
    img: Product16,
    discount: 5,
  },
  {
    img: Product17,
    discount: 16,
  },
  {
    img: Product18,
    discount: 15,
  },
  {
    img: Product19,
    discount: 9,
  },
  {
    img: Product20,
    discount: 13,
  },
  {
    img: Product21,
    discount: 20,
  },
  {
    img: Product22,
    discount: 18,
  },
  {
    img: Product23,
    discount: 19,
  },
  {
    img: Product24,
    discount: 18,
  },
  {
    img: Product25,
    discount: 8,
  },
  {
    img: Product26,
    discount: 18,
  },
  {
    img: Product27,
    discount: 20,
  },
  {
    img: Product28,
    discount: 19,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '32px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '36px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    lineBreak: {
      display: 'block',
    },
    wrapper: {
      position: 'relative',
      maxWidth: '856px',
      margin: '0 auto',
      padding: '0 40px',
    },
    prevButton: {
      position: 'absolute',
      height: '24px',
      width: '24px',
      left: '0',
      top: '0',
      bottom: '0',
      margin: 'auto',
      padding: '2px 6px',
      background: 'transparent',
    },
    nextButton: {
      position: 'absolute',
      height: '24px',
      width: '24px',
      right: '0',
      top: '0',
      bottom: '0',
      margin: 'auto',
      padding: '2px 6px',
      background: 'transparent',
    },
    disabled: {
      opacity: '0.3',
      cursor: 'default',
      '&:hover': {
        opacity: '0.3',
      },
    },
    swiper: {
      position: 'relative',
      padding: '20px 10px',
      [theme.breakpoints.down('sm')]: {
        padding: '20px 40px',
      },
    },
    product: {
      padding: '7px 8px',
      boxShadow: '0px 0.92638px 3.70552px rgba(0, 0, 0, 0.2)',
      background: '#FFFFFF',
      textAlign: 'center',
      borderRadius: '4px',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '10px',
      },
    },
    img: {
      position: 'relative',
      height: '90px',
      marginBottom: '8px',
    },
    discount: {
      backgroundColor: '#333333',
      fontSize: '18px',
      lineHeight: '20px',
      fontWeight: 800,
      color: '#FFFFFF',
      borderRadius: 4,
      [theme.breakpoints.down(360)]: {
        fontSize: '14px',
      },
    },
    percentOff: {
      fontSize: '14px',
      [theme.breakpoints.down(360)]: {
        fontSize: '10px',
      },
    },
  })
);
const DiscountProductsSlide = () => {
  const classes = useStyles();
  const isPc = useMedia({ minWidth: '960px' });
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore | null>(
    null
  );
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <h2 className={classes.title}>
          人気コスメが
          <span className={classes.lineBreak}>限定価格で買い放題</span>
        </h2>
        {isPc ? (
          <div className={classes.wrapper}>
            <button
              //@ts-ignore TODO: 修正しよう
              onClick={() => swiperInstance.slidePrev()}
              className={clsx(
                classes.prevButton,
                isBeginning && classes.disabled
              )}
            >
              <Image src={LeftVectorWhite} alt={'leftVector'} />
            </button>
            <button
              //@ts-ignore TODO: 修正しよう
              onClick={() => swiperInstance.slideNext()}
              className={clsx(classes.nextButton, isEnd && classes.disabled)}
            >
              <Image src={RightVectorWhite} alt={'rightVector'} />
            </button>
            <Swiper
              spaceBetween={16}
              slidesPerView={6}
              loop={true}
              onSlideChange={() => {
                //@ts-ignore TODO: 修正しよう
                setIsBeginning(swiperInstance?.isBeginning);
                //@ts-ignore TODO: 修正しよう
                setIsEnd(swiperInstance?.isEnd);
              }}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              className={classes.swiper}
            >
              {PRODUCTS.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className={classes.product}>
                    <div className={classes.img}>
                      <Image
                        src={product.img}
                        alt={'productImage'}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <p className={classes.discount}>
                      {product.discount}
                      <span className={classes.percentOff}>%OFF</span>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            navigation={false}
            loop={true}
            className={classes.swiper}
          >
            {PRODUCTS.map((product, index) =>
              index % 2 === 0 ? (
                <SwiperSlide key={index}>
                  <div className={classes.product}>
                    <div className={classes.img}>
                      <Image
                        src={product.img}
                        alt={'productImage'}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <p className={classes.discount}>
                      {product.discount}
                      <span className={classes.percentOff}>%OFF</span>
                    </p>
                  </div>
                  <div className={classes.product}>
                    <div className={classes.img}>
                      <Image
                        src={
                          PRODUCTS[index + 1]
                            ? PRODUCTS[index + 1].img
                            : PRODUCTS[15].img
                        }
                        alt={'productImage'}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <p className={classes.discount}>
                      {PRODUCTS[index + 1]
                        ? PRODUCTS[index + 1].discount
                        : PRODUCTS[15].discount}
                      <span className={classes.percentOff}>%OFF</span>
                    </p>
                  </div>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        )}
      </div>
    </React.Fragment>
  );
};

export default DiscountProductsSlide;
