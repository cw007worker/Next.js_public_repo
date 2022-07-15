import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import SpecialTreatment1 from '../../../static/SpecialTreatment1.png';
import SpecialTreatment2 from '../../../static/SpecialTreatment2.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '16px 8px',
    },
    title: {
      fontSize: 24,
      lineHeight: '50px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 20,
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: 20,
      },
    },
    contents: {
      display: 'flex',
      maxWidth: '600px',
      margin: '0 auto',
    },
    content: {
      width: '50%',
      textAlign: 'center',
    },
    image: {
      marginBottom: 20,
      padding: '0 16px',
    },
    text: {
      fontSize: 18,
      lineHeight: '28px',
      fontWeight: 700,
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: 16,
      },
    },
    lineBreak: {
      display: 'block',
    },
  })
);
const SpecialTreatment = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>会員だけの優待・特典</h2>
      <div className={classes.contents}>
        <div className={classes.content}>
          <div className={classes.image}>
            <Image
              src={SpecialTreatment1}
              alt="SpecialTreatment1"
              height={100}
              width={143}
            />
          </div>
          <p className={classes.text}>
            他サービスの
            <span className={classes.lineBreak}>割引チケット</span>
          </p>
        </div>
        <div className={classes.content}>
          <div className={classes.image}>
            <Image
              src={SpecialTreatment2}
              alt="SpecialTreatment2"
              height={100}
              width={143}
            />
          </div>
          <p className={classes.text}>
            タイムセールなどの
            <span className={classes.lineBreak}>イベント開催</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialTreatment;
