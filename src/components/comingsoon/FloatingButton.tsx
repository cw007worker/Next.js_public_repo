import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';
import Image from 'next/image';
import RightVectorWhite from '../../../static/RightVectorWhite.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: '24px',
      width: '100%',
      textAlign: 'center',
      zIndex: 1100,
      padding: '0 30px',
    },
    button: {
      padding: '16px 25px',
      background: 'linear-gradient(180deg, #FFCE51 0%, #DDAA00 100%)',
      borderRadius: '64px',
      width: '100%',
      maxWidth: 310,
      filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
      position: 'relative',
    },
    buttonTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '18px',
      color: '#000000',
      [theme.breakpoints.down(360)]: {
        fontSize: '14px',
      },
    },
    buttonText: {
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '12px',
      color: '#000000',
      [theme.breakpoints.down(360)]: {
        fontSize: '10px',
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

type Props = {
  isAppearButton: boolean;
  isFocus: boolean;
};
const FloatingButton: React.FC<Props> = ({ isAppearButton, isFocus }) => {
  const classes = useStyles();
  const focusEmailInput = () => {
    //@ts-ignore TODO: 修正しよう
    document?.getElementById('emailInput').focus();
  };
  return (
    <Slide direction="up" in={isAppearButton && !isFocus}>
      <div className={classes.root}>
        <button
          type="button"
          onClick={focusEmailInput}
          className={classes.button}
        >
          <p className={classes.buttonTitle}>今すぐ開始する</p>
          <div className={classes.vector}>
            <Image
              src={RightVectorWhite}
              alt="RightVectorWhite"
              height={12.39}
              width={7.41}
            />
          </div>
        </button>
      </div>
    </Slide>
  );
};

export default FloatingButton;
