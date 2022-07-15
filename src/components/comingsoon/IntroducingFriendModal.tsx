import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import LeftVectorGray from '../../../static/LeftVectorGray.png';
import RightVectorGray from '../../../static/RightVectorGray.png';
import Phone from '../../../static/Phone.png';
import Form from '../../../static/Form.png';
import Hand from '../../../static/Hand.png';
import Privilege from '../../../static/Privilege.png';
import Plata135 from '../../../static/Plata135.png';
import { Modal } from '@material-ui/core';
import CloseButton from 'components/comingsoon/CloseButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import clsx from 'clsx';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: '10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    close: {
      position: 'absolute',
      right: '0',
      top: '0',
      zIndex: 1,
    },
    root: {
      borderRadius: '10px',
      width: '340px',
      backgroundColor: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 0,
      [theme.breakpoints.down(360)]: {
        width: '300px',
      },
    },
    prevButton: {
      position: 'absolute',
      left: '6px',
      bottom: '106px',
      height: '30px',
      width: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      backgroundColor: 'transparent',
    },
    lefttVector: {
      height: '18.11px',
      width: '10.59px',
    },
    nextButton: {
      position: 'absolute',
      right: '6px',
      bottom: '106px',
      height: '30px',
      width: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      backgroundColor: 'transparent',
    },
    rightVector: {
      height: '18.11px',
      width: '10.59px',
    },
    disabled: {
      opacity: '0',
      cursor: 'default',
      '&:hover': {
        opacity: '0',
      },
    },
    imageTop1: {
      height: '224px',
      backgroundColor: '#FFD84D',
      position: 'relative',
    },
    phoneImage: {
      height: '200px',
      width: '239px',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    imageTop2: {
      height: '224px',
      backgroundColor: '#FFDBDB',
      position: 'relative',
    },
    formImage: {
      height: '120.27px',
      width: '264px',
      position: 'absolute',
      bottom: '49.73px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    handImage: {
      height: '92.43px',
      width: '74.14px',
      position: 'absolute',
      bottom: 0,
      right: '58.86px',
    },
    imageTop3: {
      height: '224px',
      background: 'linear-gradient(210deg, #FFFBD3, #FFFEF3, #C3FBFF)',
      position: 'relative',
    },
    privilegeImage: {
      height: '222px',
      width: '268px',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    crackerImage: {
      height: '56px',
      width: '70px',
      position: 'absolute',
      top: '77px',
      left: '32px',
    },
    texts: {
      height: '200px',
      padding: '29px 40px 52px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: '20px',
      lineHeight: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '10px',
      [theme.breakpoints.down(360)]: {
        fontSize: '16px',
      },
    },
    subTitle: {
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 'normal',
      textAlign: 'center',
      marginBottom: '9px',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
        lineHeight: '16px',
      },
    },
    lineBreak: {
      display: 'block',
    },
    text: {
      fontSize: '10px',
      lineHeight: '14px',
      fontWeight: 'normal',
      textAlign: 'center',
      [theme.breakpoints.down(360)]: {
        fontSize: '8px',
        lineHeight: '10px',
      },
    },
  })
);

SwiperCore.use([Pagination]);
type Props = {
  open: boolean;
  onClose: () => void;
};
const IntroducingFriendModal: React.FC<Props> = ({ open, onClose }) => {
  const classes = useStyles();
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore | null>(
    null
  );
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const handleClose = () => {
    onClose();
    setIsBeginning(true);
    setIsEnd(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.wrapper}>
        <CloseButton onClick={handleClose} className={classes.close} />
        <div className={classes.root}>
          <button
            className={clsx(
              classes.prevButton,
              isBeginning && classes.disabled
            )}
            //@ts-ignore TODO: 修正しよう
            onClick={() => swiperInstance.slidePrev()}
          >
            <div className={classes.lefttVector}>
              <Image src={LeftVectorGray} alt={'LeftVectorGray'} />
            </div>
          </button>
          <button
            className={clsx(classes.nextButton, isEnd && classes.disabled)}
            //@ts-ignore TODO: 修正しよう
            onClick={() => swiperInstance.slideNext()}
          >
            <div className={classes.rightVector}>
              <Image src={RightVectorGray} alt={'RightVectorGray'} />
            </div>
          </button>
          <Swiper
            slidesPerView={1}
            onSlideChange={() => {
              //@ts-ignore TODO: 修正しよう
              setIsBeginning(swiperInstance?.isBeginning);
              //@ts-ignore TODO: 修正しよう
              setIsEnd(swiperInstance?.isEnd);
            }}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            pagination
          >
            <SwiperSlide>
              <div className={classes.imageTop1}>
                <div className={classes.phoneImage}>
                  <Image src={Phone} alt={'Phone'} height={200} width={239} />
                </div>
              </div>
              <div className={classes.texts}>
                <div>
                  <h2 className={classes.title}>友達紹介のやり方①</h2>
                  <p className={classes.subTitle}>
                    あなたの紹介リンクをコピーして、
                    <span className={classes.lineBreak}>
                      LINEやその他SNSでお友達に送信
                    </span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={classes.imageTop2}>
                <div className={classes.formImage}>
                  <Image src={Form} alt={'Form'} />
                </div>
                <div className={classes.handImage}>
                  <Image src={Hand} alt={'Hand'} />
                </div>
              </div>
              <div className={classes.texts}>
                <div>
                  <h2 className={classes.title}>友達紹介のやり方②</h2>
                  <p className={classes.subTitle}>
                    お友達があなたのリンクから
                    <span className={classes.lineBreak}>
                      メールアドレス登録を行う
                    </span>
                  </p>
                  <p className={classes.text}>
                    ※あなたのリンク以外から登録されると、
                    <span className={classes.lineBreak}>
                      加算対象外となりますのでご注意ください。
                    </span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={classes.imageTop3}>
                <div className={classes.privilegeImage}>
                  <Image src={Privilege} alt={'Privilege'} />
                </div>
                <div className={classes.crackerImage}>
                  <Image src={Plata135} alt={'Plata135'} />
                </div>
              </div>
              <div className={classes.texts}>
                <div>
                  <h2 className={classes.title}>友達紹介のやり方③</h2>
                  <p className={classes.subTitle}>
                    あなたの「招待した人数」に
                    <span className={classes.lineBreak}>
                      加算され、特典が増えていく！
                    </span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Modal>
  );
};

export default IntroducingFriendModal;
