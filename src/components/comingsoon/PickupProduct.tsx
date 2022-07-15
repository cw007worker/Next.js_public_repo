import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import PickUpProduct from '../../../static/PickUpProduct.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '24px 16px 0',
    },
    title: {
      fontSize: 24,
      lineHeight: '36px',
      fontWeight: 700,
      textAlign: 'center',
      color: '#FFFFFF',
      marginBottom: 32,
      [theme.breakpoints.down(360)]: {
        fontSize: 20,
      },
    },
    card: {
      background: '#FFFFFF',
      borderRadius: 4,
      padding: '8px 8px 16px',
      maxWidth: 400,
      margin: '0 auto',
    },
    image: {
      textAlign: 'center',
    },
    name: {
      fontSize: 15,
      lineHeight: '20px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 16,
      [theme.breakpoints.down(360)]: {
        fontSize: 13,
      },
    },
    lineBreak: {
      display: 'block',
    },
    priceWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    prevPrice: {
      fontSize: 18,
      lineHeight: '18px',
      fontWeight: 700,
      textAlign: 'center',
      color: '#767676',
      marginBottom: 4,
      textDecoration: 'line-through',
      [theme.breakpoints.down(360)]: {
        fontSize: 14,
      },
    },
    discount: {
      fontSize: 18,
      lineHeight: '23px',
      fontWeight: 700,
      textAlign: 'center',
      color: '#DDAA00',
      background: '#333333',
      borderRadius: 2,
      padding: '0 16px',
      [theme.breakpoints.down(360)]: {
        fontSize: 14,
        padding: '0 8px',
      },
    },
    price: {
      fontSize: 42,
      lineHeight: '42px',
      fontWeight: 700,
      textAlign: 'center',
      marginLeft: 12,
      [theme.breakpoints.down(360)]: {
        fontSize: 38,
      },
    },
  })
);

const PickupProduct = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>会員限定価格のピックアップ</h2>
      <div className={classes.card}>
        <div className={classes.image}>
          <Image
            src={PickUpProduct}
            alt="PickUpProduct"
            height={157}
            width={190}
          />
        </div>
        <h3 className={classes.name}>
          Dior
          <span className={classes.lineBreak}>サンク クルール クチュール</span>
        </h3>
        <div className={classes.priceWrapper}>
          <div>
            <p className={classes.prevPrice}>¥ 8,360</p>
            <p className={classes.discount}>31%OFF</p>
          </div>
          <p className={classes.price}>¥ 5,819</p>
        </div>
      </div>
    </div>
  );
};

export default PickupProduct;
