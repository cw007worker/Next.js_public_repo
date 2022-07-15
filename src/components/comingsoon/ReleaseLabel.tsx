import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const RELEASEYEAR: number = 2021;
const RELEASEMONTH: number = 12;
const RELEASEDAY: number = 15;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#FFD84D',
      padding: '5px',
      marginBottom: 20,
    },
    text: {
      fontSize: '14px',
      lineHeight: '20px',
      textAlign: 'center',
      fontWeight: 700,
    },
    lineBreak: {
      display: 'block',
    },
  })
);

const ReleaseLabel = () => {
  const classes = useStyles();
  // const [countDownValue, setCountDownValue] = React.useState('');
  // const [releaseDate, setReleaseDate] = React.useState<Date | undefined>(
  //   undefined
  // );
  // const getCountDownToRelease = React.useCallback((): string => {
  //   const nowDate = new Date();
  //   // @ts-ignore TODO:修正する
  //   const diffMSec = releaseDate.getTime() - nowDate.getTime();
  //   const diffSec = Math.floor(diffMSec / 1000);
  //   const day = Math.floor(diffSec / (24 * 60 * 60));
  //   const hour = Math.floor((diffSec % (24 * 60 * 60)) / (60 * 60));
  //   const minute = Math.floor(((diffSec % (24 * 60 * 60)) % (60 * 60)) / 60);
  //   const second = ((diffSec % (24 * 60 * 60)) % (60 * 60)) % 60;
  //   return `${day}日${hour}時間${minute}分${second}秒`;
  // }, [releaseDate]);

  // React.useEffect(() => {
  //   setReleaseDate(new Date(RELEASEYEAR, RELEASEMONTH - 1, RELEASEDAY));
  // }, []);

  // React.useEffect(() => {
  //   const countDown = setInterval(() => {
  //     setCountDownValue(getCountDownToRelease());
  //   }, 1000);
  //   return () => clearInterval(countDown);
  // }, [getCountDownToRelease]);
  return (
    <div className={classes.root}>
      <p className={classes.text}>
        順番に案内中。メールがプロモーションタブに入ってる場合がございます。
      </p>
    </div>
  );
};

export default ReleaseLabel;
