import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Box from '../../../static/Box.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '400px',
      padding: '0 12px',
      margin: '0 auto 12px',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      marginLeft: 8,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: '30px',
      color: '#FFFFFF',
      textAlign: 'left',
      [theme.breakpoints.down(360)]: {
        fontSize: 16,
      },
    },
    lineBreak: {
      display: 'block',
      fontSize: 30,
      lineHeight: '42px',
      [theme.breakpoints.down(360)]: {
        fontSize: 24,
      },
    },
  })
);

const GuideButton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <p className={classes.text}>
          順位を上げて
          <span className={classes.lineBreak}>最大2万円お得に！</span>
        </p>
        <div className={classes.img}>
          <Image src={Box} alt={'Box'} height={60.67} width={60.67} />
        </div>
      </div>
    </div>
  );
};

export default GuideButton;
