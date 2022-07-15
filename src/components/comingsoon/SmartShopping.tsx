import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Group1445 from '../../../static/Group1445.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px 36px 32px',
    },
    title: {
      fontSize: 24,
      lineHeight: '50px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 24,
      [theme.breakpoints.down(360)]: {
        fontSize: 20,
      },
    },
    imageWrapper: {
      maxWidth: 345,
      width: '100%',
      margin: '0 auto',
    },
  })
);

const SmartShopping = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>賢くお得にお買い物しよう</h2>
      <div className={classes.imageWrapper}>
        <Image src={Group1445} alt="Group1445" />
      </div>
    </div>
  );
};

export default SmartShopping;
