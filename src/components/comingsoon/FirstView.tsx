import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { useIntersection } from 'react-use';
import FVImage from '../../../static/FVImage.png';
import PantriiIconWhite from '../../../static/PantriiIconWhite.svg';
import AppStoreDownloadIcon from '../../../public/AppStoreDownloadIconBrack.svg';
import GooglePlayDownloadIcon from '../../../public/GooglePlayDownloadIcon.png';
import Link from 'next/link';
import EmailFormCard from './EmailFormCard';
import RestartOnboardingCard from './RestartOnboardingCard';
import RightVectorWhite from '../../../static/RightVectorWhite.png';
import { HookState as RestartOnboardingState } from 'hooks/useRestartOnboardingHandler';

type Props = {
  onFocus: () => void;
  onBlur: () => void;
  onClick: (data: { email: string }, event: any) => void;
  handleAppear: () => void;
  handleDisappear: () => void;
  totalMemberCount: number | undefined;
  restartOnboardingState: RestartOnboardingState;
};
const useFirstViewStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
    },
    gradation: {
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0.6) 100%)',
      position: 'absolute',
      bottom: 0,
      height: '40%',
      width: '100%',
    },
    imageWrapper: {
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    image: {
      maxWidth: 600,
      margin: '0 auto',
      position: 'relative',
    },
    content: {
      position: 'relative',
      width: '100%',
      padding: '304px 0 24px',
      [theme.breakpoints.up('md')]: {
        padding: '400px 0 24px',
      },
    },
    titleWrapper: {
      textAlign: 'center',
      padding: '88px 0 32px',
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
    },
    subTitle: {
      fontSize: 20,
      lineHeight: '70px',
      fontWeight: 700,
      color: '#FFFFFF',
      textShadow: '0px 0px 10px #000000',
      [theme.breakpoints.down(375)]: {
        fontSize: 18,
      },
      [theme.breakpoints.down(360)]: {
        fontSize: 16,
      },
    },
    pantriiImage: {
      filter: 'drop-shadow(0px 0px 20px #000000)',
      padding: '0 16px',
    },
    pantrii: {
      fontSize: 18,
      lineHeight: '30px',
      fontWeight: 700,
      margin: '-12px 0 16px',
      color: '#FFFFFF',
    },
    appDownload: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      maxWidth: '560px',
      margin: '0 auto',
    },
    appDownloadIcon: {
      padding: '0 10px',
    },
    text: {
      fontSize: 20,
      lineHeight: '25px',
      fontWeight: 700,
      color: '#FFFFFF',
      [theme.breakpoints.down(375)]: {
        fontSize: 18,
      },
      [theme.breakpoints.down(360)]: {
        fontSize: 16,
      },
    },
    lineBreak: {
      display: 'block',
    },
    emailWrapper: {
      padding: '0 16px',
    },
    emailTitle: {
      fontSize: 16,
      lineHeight: '20px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 24,
      [theme.breakpoints.down(375)]: {
        fontSize: 15,
      },
      [theme.breakpoints.down(360)]: {
        fontSize: 13,
      },
    },
    registering: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: 20,
    },
    registeringText: {
      fontSize: 22,
      lineHeight: '32px',
      fontWeight: 700,
      [theme.breakpoints.down(360)]: {
        fontSize: 18,
      },
    },
    registeringCount: {
      fontSize: 38,
      lineHeight: '44px',
      fontWeight: 700,
      color: '#FFCE51',
      background: 'linear-gradient(242.08deg, #FFCE51 20.67%, #D346B4 67.32%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      padding: '0 10px 0 28px',
      [theme.breakpoints.down(360)]: {
        fontSize: 32,
      },
    },
    registeringUnit: {
      paddingRight: 8,
    },
    button: {
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '64px',
      padding: '0 25px',
      background: 'linear-gradient(180deg, #FFCE51 0%, #DDAA00 100%)',
      borderRadius: '64px',
      color: '#000000',
      width: '100%',
      maxWidth: 310,
      filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
      position: 'relative',
      [theme.breakpoints.down(375)]: {
        fontSize: '16px',
        lineHeight: '56px',
      },
      [theme.breakpoints.down(360)]: {
        fontSize: '14px',
      },
    },
    vector: {
      position: 'absolute',
      right: 24,
      top: '50%',
      transform: 'translateY(-50%)',
    },
  })
);
const FirstView: React.FC<Props> = ({
  onFocus,
  onBlur,
  onClick,
  handleAppear,
  handleDisappear,
  totalMemberCount,
  restartOnboardingState,
}) => {
  const classes = useFirstViewStyle();
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });
  React.useEffect(() => {
    if (intersection && intersection.intersectionRatio > 0) {
      handleAppear();
    } else {
      handleDisappear();
    }
  }, [intersection, handleAppear, handleDisappear]);

  return (
    <div className={classes.root}>
      <div className={classes.imageWrapper}>
        <div className={classes.image}>
          <Image
            src={FVImage}
            alt="FVImage"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.titleWrapper}>
          <div className={classes.pantriiImage}>
            <Image
              src={PantriiIconWhite}
              alt="PantriiIconWhite"
              height={84.19}
              width={250}
            />
          </div>
          <p className={classes.pantrii}>パントリー</p>
          <p className={classes.text}>
            人気コスメがお得に買える
            <span className={classes.lineBreak}>ショッピングサイト</span>
          </p>
        </div>
        <div className={classes.appDownload}>
          <Link
            href="https://apps.apple.com/jp/app/pantrii/id1600594589"
            passHref
          >
            <div className={classes.appDownloadIcon}>
              <Image
                objectFit="contain"
                src={AppStoreDownloadIcon}
                alt="AppStoreDownloadIcon"
                width={150}
                height={84.19}
              />
            </div>
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=parchie.inc.pantrii"
            passHref
          >
            <div className={classes.appDownloadIcon}>
              <Image
                objectFit="contain"
                src={GooglePlayDownloadIcon}
                alt="GooglePlayDownloadIcon"
                width={160}
                height={84.19}
              />
            </div>
          </Link>
        </div>
        {/* {restartOnboardingState?.isReStartOnboarding ? (
          <RestartOnboardingCard
            buttonText="登録を完了する"
            reStartOnboarding={restartOnboardingState?.reStartOnboarding}
          />
        ) : (
          <div className={classes.emailWrapper} ref={intersectionRef}>
            <EmailFormCard
              isShort={true}
              buttonText="今すぐ開始する"
              onFocus={onFocus}
              onBlur={onBlur}
              onClick={onClick}
              text={
                <React.Fragment>
                  <div className={classes.registering}>
                    <p className={classes.registeringText}>現在</p>
                    <p className={classes.registeringCount}>
                      {totalMemberCount || '-'}
                    </p>
                    <p
                      className={clsx(
                        classes.registeringText,
                        classes.registeringUnit
                      )}
                    >
                      人
                    </p>
                    <p className={classes.registeringText}>登録中！</p>
                  </div>
                  <p className={classes.emailTitle}>
                    メールアドレスだけでかんたん登録！
                  </p>
                </React.Fragment>
              }
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FirstView;
