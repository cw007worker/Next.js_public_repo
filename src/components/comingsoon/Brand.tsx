import { Modal, Slide } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import React from 'react';
import Category1 from '../../../static/Category1.jpg';
import Category2 from '../../../static/Category2.jpg';
import Category3 from '../../../static/Category3.jpg';
import Category4 from '../../../static/Category4.jpg';
import Category5 from '../../../static/Category5.jpg';
import Category6 from '../../../static/Category6.jpg';
import Category7 from '../../../static/Category7.jpg';
import Category8 from '../../../static/Category8.jpg';
import Category9 from '../../../static/Category9.jpg';
import Category10 from '../../../static/Category10.jpg';
import Category11 from '../../../static/Category11.jpg';
import Category12 from '../../../static/Category12.jpg';
import Category13 from '../../../static/Category13.jpg';
import Group1516 from '../../../static/Group1516.svg';

const BRANDS: {
  name: string;
  image: StaticImageData;
}[] = [
  {
    name: 'お菓子',
    image: Category1,
  },
  {
    name: 'お米',
    image: Category2,
  },
  {
    name: 'ドリンク',
    image: Category3,
  },
  {
    name: '肉加工品',
    image: Category4,
  },
  {
    name: '鮮果',
    image: Category5,
  },
  {
    name: 'ビューティケア',
    image: Category6,
  },
  {
    name: 'ベースメイク',
    image: Category7,
  },
  {
    name: 'メイクアップ',
    image: Category8,
  },
  {
    name: 'リップ',
    image: Category9,
  },
  {
    name: '日用品',
    image: Category10,
  },
  {
    name: '洗剤',
    image: Category11,
  },
  {
    name: '雑貨',
    image: Category12,
  },
  {
    name: 'キッチン用品',
    image: Category13,
  },
  {
    name: 'and more...',
    image: Group1516,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px 23px 48px',
    },
    button: {
      display: 'block',
      width: '100%',
      maxWidth: '360px',
      borderRadius: '50px',
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '56px',
      margin: '0 auto',
      color: '#212121',
      background: '#DDAA00',
      textAlign: 'center',
    },
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    close: {
      width: '40px',
      height: '40px',
      background: 'transparent',
      position: 'absolute',
      top: '33px',
      right: '20px',
    },
    line1: {
      position: 'absolute',
      height: '3.43px',
      width: '24.04px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
    },
    line2: {
      position: 'absolute',
      height: '3.43px',
      width: '24.04px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-45deg)',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
    },
    modalWrapper: {
      background: '#FFFFFF',
      width: '315px',
      maxHeight: '70vh',
      padding: '10px',
      borderRadius: '10px',
      overflow: 'scroll',
    },
    title: {
      fontSize: '16px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      fontSize: '11px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
    },
    contents: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 auto',
    },
    content: {
      marginBottom: '18px',
      width: '25%',
      padding: '0 5px',
    },
    contentImage: {
      height: '63px',
      position: 'relative',
    },
    contentName: {
      fontSize: '9px',
      lineHeight: '20px',
      fontWeight: 700,
      textAlign: 'center',
    },
  })
);

const Brand = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <button className={classes.button} onClick={() => setOpen(true)}>
          取扱カテゴリー一覧
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
      >
        <React.Fragment>
          <button className={classes.close} onClick={() => setOpen(false)}>
            <div className={classes.line1}></div>
            <div className={classes.line2}></div>
          </button>
          <Slide direction="up" in={open}>
            <div className={classes.modalWrapper}>
              <h2 className={classes.title}>取扱カテゴリー一覧</h2>
              <p className={classes.text}>※一部抜粋です</p>
              <div className={classes.contents}>
                {BRANDS.map((brand, i) => (
                  <div className={classes.content} key={i}>
                    <div className={classes.contentImage}>
                      <Image
                        src={brand.image}
                        alt={`brandImage${i}`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <p className={classes.contentName}>{brand.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Slide>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default Brand;
