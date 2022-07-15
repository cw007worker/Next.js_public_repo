import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import CheckThin from '../../../static/CheckThin.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px 16px',
      margin: '0 auto',
      maxWidth: 600,
    },
    content: {
      border: '2px solid #545454',
      padding: '20px 0',
      textAlign: 'center',
    },
    items: {},
    item: {
      display: 'flex',
      alignItems: 'center',
      width: 300,
      margin: '0 auto',
      '&:not(:last-child)': {
        marginBottom: 12,
      },
      [theme.breakpoints.down(360)]: {
        width: 255,
      },
    },
    text: {
      fontSize: 18,
      lineHeight: '20px',
      fontWeight: 700,
      marginLeft: 12,
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: 15,
      },
    },
    goldText: {
      color: '#DDAA00',
    },
  })
);

const FeatureList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.items}>
          <div className={classes.item}>
            <Image src={CheckThin} alt="CheckThin" height={13.4} width={17.6} />
            <p className={classes.text}>
              <span className={classes.goldText}>会員限定価格</span>
              でお買い物ができる
            </p>
          </div>
          <div className={classes.item}>
            <Image src={CheckThin} alt="CheckThin" height={13.4} width={17.6} />
            <p className={classes.text}>
              <span className={classes.goldText}>限定</span>
              イベントやタイムセール
            </p>
          </div>
          <div className={classes.item}>
            <Image src={CheckThin} alt="CheckThin" height={13.4} width={17.6} />
            <p className={classes.text}>
              あなただけの
              <span className={classes.goldText}>パーソナライズ化</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureList;
