import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import CheckThin from '../../../static/CheckThin.png';
import Treatment1 from '../../../static/Treatment1.png';
// import Treatment2 from '../../../static/Treatment2.svg';
import Treatment2 from '../../../static/Treatment2.png';
import Treatment3 from '../../../static/Treatment3.png';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '32px 32px 0',
    },
    title: {
      fontSize: 24,
      lineHeight: '50px',
      fontWeight: 700,
      textAlign: 'center',
      color: '#FFFFFF',
      marginBottom: 48,
      [theme.breakpoints.down(360)]: {
        fontSize: 20,
      },
    },
    treatment: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontSize: 24,
      lineHeight: '24px',
      fontWeight: 700,
      color: '#FFFFFF',
      marginLeft: 8,
      [theme.breakpoints.down(360)]: {
        fontSize: 20,
      },
    },
    goldText: {
      color: '#DDAA00',
    },
    image: {
      padding: '12px 0 48px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      minHeight: 172,
    },
    treatment2: {
      marginTop: 20,
    },
  })
);

const Treatment = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>登録の3つの特典</h2>
      <div className={classes.treatment}>
        <Image src={CheckThin} alt="CheckThin" height={19} width={25} />
        <h3 className={classes.name}>
          <span className={classes.goldText}>すぐに</span>
          利用開始
        </h3>
      </div>
      <div className={classes.image}>
        <Image src={Treatment1} alt="Treatment1" height={274} width={240} />
      </div>
      <div className={classes.treatment}>
        <Image src={CheckThin} alt="CheckThin" height={19} width={25} />
        <h3 className={classes.name}>
          30日間会員費
          <span className={classes.goldText}>半額</span>
        </h3>
      </div>
      <div className={clsx(classes.image, classes.treatment2)}>
        <Image src={Treatment2} alt="Treatment2" height={107} width={220} />
      </div>
    </div>
  );
};

export default Treatment;
