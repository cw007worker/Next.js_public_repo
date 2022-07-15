import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Group1170 from '../../../static/Group1170.png';
import TriangleBackground from './TriangleBackground';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // minHeight: 'calc(100vh - 50px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF2DE',
      paddingTop: '37px',
      [theme.breakpoints.down('sm')]: {
        padding: '42px 18px 0',
      },
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      lineHeight: '40px',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '15px',
      },
      [theme.breakpoints.down(375)]: {
        fontSize: '23px',
      },
    },
    lineBreak: {
      display: 'block',
    },
    img: {
      display: 'block',
      maxWidth: '450px',
      margin: '0 auto',
      transform: 'translateX(-12px)',
    },
  })
);
const CostCutProcess = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <div>
          <p className={classes.title}>
            パントリーだけの
            <span className={classes.lineBreak}>値引きでお得にお買い物！</span>
          </p>
          <div className={classes.img}>
            <Image src={Group1170} alt={'costCutImage'} />
          </div>
        </div>
      </div>
      <TriangleBackground
        triangleColor={'#FFF2DE'}
        backgroundColor={'#FFFFFF'}
      />
    </React.Fragment>
  );
};

export default CostCutProcess;
