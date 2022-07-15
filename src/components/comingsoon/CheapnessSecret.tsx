import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px 0px 40px',
    },
    title: {
      fontSize: 24,
      lineHeight: '40px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 20,
      [theme.breakpoints.down(360)]: {
        fontSize: 20,
      },
    },
    contentTitle: {
      fontSize: 24,
      lineHeight: '50px',
      fontWeight: 700,
      textAlign: 'center',
      background: '#E6E6E6',
      [theme.breakpoints.down(360)]: {
        fontSize: 20,
      },
    },
    contentText: {
      fontSize: 16,
      lineHeight: '26px',
      fontWeight: 500,
      textAlign: 'center',
      maxWidth: 600,
      padding: '24px 56px',
      margin: '0 auto',
    },
  })
);

const CheapnessSecret = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>pantriiの安さの秘密</h2>
      <h3 className={classes.contentTitle}>会費制でコスパ重視</h3>
      <p className={classes.contentText}>
        会費制だから、ほぼ仕入れたお値段そのままで販売しています。
      </p>
      {/* <h3 className={classes.contentTitle}>まとめ買いで送料節約</h3>
      <p className={classes.contentText}>
        少しでも段ボールいっぱいに詰めて商品をお届けした方が配送費が商品代金に比べて安くなります。
      </p> */}
      <h3 className={classes.contentTitle}>仕入れコスト削減</h3>
      <p className={classes.contentText}>
        メーカーから直接仕入れたり、海外の工場から直接取引して輸入するから、仕入れコストを削減しています！
      </p>
      <h3 className={classes.contentTitle}>無駄・非効率を徹底排除</h3>
      <p className={classes.contentText}>
        SNS(twitter,tiktok,Youtube)やクチコミがメインで、広告はやらず広告費をかけない分、商品の価格をより安くお客様に還元できます。
      </p>
    </div>
  );
};

export default CheapnessSecret;
