import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Group1273 from '../../../static/Group1273.png';
import PS5 from '../../../static/PS5.png';
import Tesla from '../../../static/Tesla.png';
import WashingMachine from '../../../static/WashingMachine.png';
import Image from 'next/image';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import Group1351 from '../../../static/Group1351.png';
import Group1352 from '../../../static/Group1352.png';
import Group1357 from '../../../static/Group1357.png';
import Group1359 from '../../../static/Group1359.png';
import Group1361 from '../../../static/Group1361.png';
import Group1362 from '../../../static/Group1362.png';
import LeftBigCloud from '../../../static/LeftBigCloud.png';
import RightBigCloud from '../../../static/RightBigCloud.png';
import OpenSaleTitle from '../../../static/OpenSaleTitle.png';
import image5 from '../../../static/image5.png';
import image6 from '../../../static/image6.png';
import image7 from '../../../static/image7.png';
import React from 'react';
import useMedia from 'use-media';

const PRODUCTS: {
  image: StaticImageData;
  height: number;
  width: number;
  name: string;
  nameSecondLine?: string;
}[] = [
  {
    image: PS5,
    height: 53.84,
    width: 48.26,
    name: 'PS5',
  },
  {
    image: WashingMachine,
    height: 54.17,
    width: 45.9,
    name: 'シャープ SHARP',
    nameSecondLine: 'ES-S7F-WR',
  },
  {
    image: image5,
    height: 53.77,
    width: 30.56,
    name: 'iphone 13',
  },
  {
    image: image6,
    height: 47.17,
    width: 47.17,
    name: '資生堂ホワイトニング',
    nameSecondLine: 'スキンケアパウダー',
  },
  {
    image: image7,
    height: 43.66,
    width: 47.17,
    name: 'dior book tate',
  },
  {
    image: PS5,
    height: 53.84,
    width: 48.26,
    name: 'PS5',
  },
  {
    image: WashingMachine,
    height: 54.17,
    width: 45.9,
    name: 'シャープ SHARP',
    nameSecondLine: 'ES-S7F-WR',
  },
  {
    image: image5,
    height: 53.77,
    width: 30.56,
    name: 'iphone 13',
  },
  {
    image: image6,
    height: 47.17,
    width: 47.17,
    name: '資生堂ホワイトニング',
    nameSecondLine: 'スキンケアパウダー',
  },
  {
    image: image7,
    height: 43.66,
    width: 47.17,
    name: 'dior book tate',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '529px',
      padding: '45px 0 35.28px',
      position: 'relative',
      backgroundColor: '#FBD81E',
      overflow: 'hidden',
      zIndex: 0,
    },
    image: {
      objectFit: 'cover',
    },
    leftLantern: {
      position: 'absolute',
      maxWidth: '46vw',
      left: '0',
      top: '0',
    },
    rightLantern: {
      position: 'absolute',
      maxWidth: '46vw',
      right: '0',
      top: '0',
    },
    leftCloud: {
      position: 'absolute',
      maxWidth: '400px',
      left: '0',
      bottom: '-5px',
      zIndex: -1,
      [theme.breakpoints.down('sm')]: {
        width: '50vw',
      },
    },
    rightCloud: {
      position: 'absolute',
      maxWidth: '400px',
      right: '0',
      bottom: '-5px',
      zIndex: -1,
      [theme.breakpoints.down('sm')]: {
        width: '50vw',
      },
    },
    leftLowerLeaf: {
      position: 'absolute',
      maxWidth: '35vw',
      left: '0',
      bottom: '98.63px',
      zIndex: -1,
    },
    rightLowerLeaf: {
      position: 'absolute',
      maxWidth: '25vw',
      right: '0',
      bottom: '98.63px',
      zIndex: -1,
    },
    leftUpperLeaf: {
      position: 'absolute',
      maxWidth: '45vw',
      left: '0px',
      top: '48px',
    },
    rightUpperLeaf: {
      position: 'absolute',
      maxWidth: '45vw',
      right: '0px',
      top: '48px',
    },
    item: {
      borderRadius: '2.47px',
      backgroundColor: '#FFFFFF',
      width: '72.14px',
      padding: '3.2px 3.2px 5.6px',
      filter: 'drop-shadow(0px 3.70775px 4.63469px rgba(0, 0, 0, 0.2))',
      [theme.breakpoints.up('md')]: {
        borderRadius: '5px',
        width: '140px',
        padding: '6.5px 3.2px 10px',
      },
    },
    imageWrapper: {
      height: '60px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        height: '120px',
      },
    },
    itemImage: {
      textAlign: 'center',
    },
    itemName: {
      fontSize: '6.5px',
      lineHeight: '8.27px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '3px',
      height: '17px',
      [theme.breakpoints.up('md')]: {
        fontSize: '13px',
        lineHeight: '13px',
        height: '34px',
        marginBottom: '6px',
      },
    },
    oneYen: {
      fontSize: '23.09px',
      lineHeight: '23.09px',
      fontWeight: 'bold',
      color: '#E03311',
      [theme.breakpoints.up('md')]: {
        fontSize: '46px',
        lineHeight: '46px',
      },
    },
    onePerson: {
      fontSize: '5.46px',
      lineHeight: '10.24px',
      color: '#FFFFFF',
      backgroundColor: '#FF823C',
      padding: '0 3.92px',
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        fontSize: '10px',
        lineHeight: '20.48px',
        padding: '0 4px',
      },
    },
    title: {
      fontSize: '38.44px',
      lineHeight: '56px',
      fontWeight: 900,
      textAlign: 'center',
      letterSpacing: '0.101998px',
      color: '#C20325',
      textShadow: '5.70964px 5.70964px 0px rgba(255, 156, 40, 0.7)',
      WebkitTextStroke: '2px #FBD81E',
      transform: 'rotate(-3.78deg)',
    },
    one: {
      fontSize: '102.77px',
    },
    yen: {
      fontSize: '44.25px',
    },
    lineBreak: {
      display: 'block',
    },
    mainItem: {
      borderRadius: '3.83px',
      width: '111.92px',
      height: '152.44px',
      padding: '0 5px 9.36px',
      position: 'relative',
      margin: '0 auto 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      [theme.breakpoints.up('md')]: {
        borderRadius: '6px',
        width: '220px',
        height: '300px',
      },
    },
    mainImage: {
      position: 'absolute',
      height: '86.13px',
      width: '184.92px',
      top: '8.29px',
      left: '50%',
      transform: 'translateX(-50%)',
      [theme.breakpoints.up('md')]: {
        height: '172.26px',
        width: '369.84px',
        top: '18px',
      },
    },
    texts: {
      marginTop: 'auto',
    },
    mainItemName: {
      fontSize: '11.73px',
      lineHeight: '22.87px',
      marginBottom: '3px',
      [theme.breakpoints.up('md')]: {
        fontSize: '22px',
        lineHeight: '22px',
        marginBottom: '6px',
      },
    },
    prices: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: '0 auto',
    },
    mainOneYen: {
      fontSize: '36px',
      lineHeight: '36px',
      padding: '0 5px',
      [theme.breakpoints.up('md')]: {
        fontSize: '72px',
        lineHeight: '72px',
      },
    },
    mainOnePerson: {
      fontSize: '8.53px',
      lineHeight: '16px',
      padding: '0 5px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
        lineHeight: '32px',
      },
    },
    mainOff: {
      position: 'absolute',
      top: '-32.22px',
      left: '-39.76px',
      height: '78.09px',
      width: '78.09px',
      [theme.breakpoints.up('md')]: {
        top: '-50px',
        left: '-60px',
        height: '120px',
        width: '120px',
      },
    },
    swiper: {
      padding: '12px',
    },
    secondLine: {
      display: 'block',
      fontSize: '44px',
      lineHeight: '64px',
      letterSpacing: '10px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '39px',
      },
    },
    titleImage: {
      maxWidth: '600px',
      width: '95vw',
      padding: '0 13px',
      margin: '0 auto',
    },
  })
);

const OpenSale = () => {
  const classes = useStyles();
  const isPc: boolean = useMedia({ minWidth: '960px' });
  const slideWidth: number = isPc ? 160 : 80;
  const isClient: boolean = typeof window === 'object';
  const getScreenWidth = React.useCallback(() => {
    return isClient ? window?.innerWidth : 0;
  }, [isClient]);
  const [screenWidth, setScreenWidth] = React.useState(getScreenWidth());
  React.useEffect(() => {
    const onResize = () => {
      setScreenWidth(getScreenWidth());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getScreenWidth]);
  return (
    <div className={classes.root}>
      <div className={classes.leftLantern}>
        <Image src={Group1351} alt={'Group1351'} />
      </div>
      <div className={classes.rightLantern}>
        <Image src={Group1352} alt={'Group1352'} />
      </div>
      <div className={classes.leftCloud}>
        <Image
          src={LeftBigCloud}
          alt={'LeftBigCloud'}
          className={classes.image}
        />
      </div>
      <div className={classes.rightCloud}>
        <Image src={RightBigCloud} alt={'RightBigCloud'} />
      </div>
      <div className={classes.leftUpperLeaf}>
        <Image src={Group1359} alt={'Group1359'} />
      </div>
      <div className={classes.rightUpperLeaf}>
        <Image src={Group1362} alt={'Group1362'} />
      </div>
      <div className={classes.leftLowerLeaf}>
        <Image src={Group1357} alt={'Group1357'} />
      </div>
      <div className={classes.rightLowerLeaf}>
        <Image src={Group1361} alt={'Group1361'} />
      </div>
      <div className={clsx(classes.item, classes.mainItem)}>
        <div className={clsx(classes.mainImage)}>
          <Image src={Tesla} alt={'Tesla'} />
        </div>
        <div className={classes.texts}>
          <p className={clsx(classes.itemName, classes.mainItemName)}>
            テスラ モデル3
          </p>
          <div className={classes.prices}>
            <p className={clsx(classes.oneYen, classes.mainOneYen)}>¥1</p>
            <div>
              <p className={clsx(classes.onePerson, classes.mainOnePerson)}>
                1名様限定
              </p>
            </div>
          </div>
        </div>
        <div className={classes.mainOff}>
          <Image src={Group1273} alt={'99%OFF!!'} />
        </div>
      </div>
      <Swiper
        spaceBetween={isPc ? 16 : 8}
        slidesPerView={Math.floor(screenWidth / slideWidth)}
        loop={false}
        className={classes.swiper}
      >
        {PRODUCTS.map((product, i) => (
          <SwiperSlide key={i}>
            <div className={classes.item}>
              <div className={classes.imageWrapper}>
                <div className={classes.itemImage}>
                  <Image
                    src={product.image}
                    alt={`productImage${i + 1}`}
                    height={isPc ? product.height * 2 : product.height}
                    width={isPc ? product.width * 2 : product.width}
                  />
                </div>
              </div>
              <div>
                <p className={classes.itemName}>
                  {product.name}
                  {product.nameSecondLine && (
                    <span className={classes.lineBreak}>
                      {product.nameSecondLine}
                    </span>
                  )}
                </p>
                <div className={classes.prices}>
                  <p className={classes.oneYen}>¥1</p>
                  <div>
                    <p className={classes.onePerson}>1名様限定</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <h2 className={classes.title}>
        <span className={classes.one}>1</span>
        <span className={classes.yen}>円</span>
        祭り!
        <span className={classes.secondLine}>
          事前登録で招待
        </span>
      </h2> */}
      <div className={classes.titleImage}>
        <Image src={OpenSaleTitle} alt={'OpenSaleTitle'} />
      </div>
    </div>
  );
};

export default OpenSale;
