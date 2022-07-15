import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#994D82',
      padding: '34.86px 0 12px',
      '& *': {
        color: '#FFFFFF',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '37px 32px 12px',
      },
    },
    black: {
      backgroundColor: '#000000',
    },
    grey: {
      backgroundColor: '#4F4F4F',
    },
    pink: {
      backgroundColor: '#FF8080',
    },
    wrapper: {
      maxWidth: '560px',
      margin: '0 auto 37.72px',
      display: 'flex',
    },
    column: {
      width: '100%',
    },
    link: {
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 'bold',
      '&:not(:last-child)': {
        marginBottom: '11px',
      },
    },
    copyRight: {
      fontSize: '10px',
      lineHeight: '18px',
      textAlign: 'center',
    },
  })
);

type FooterProps = {
  backgroundColor?: 'black' | 'grey' | 'pink';
};
const Footer: React.FC<FooterProps> = ({ backgroundColor }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        backgroundColor === 'black' && classes.black,
        backgroundColor === 'grey' && classes.grey,
        backgroundColor === 'pink' && classes.pink
      )}
    >
      <div className={classes.wrapper}>
        <div className={classes.column}>
          <ul>
            <li className={classes.link}>
              <Link
                href="https://www.notion.so/parchie/87f54db8dc3c434c94fdd649ffd20179"
                passHref
              >
                <a target="_blank">特定商取引法</a>
              </Link>
            </li>
            <li className={classes.link}>
              <Link href="https://parchie.jp" passHref>
                <a target="_blank">会社概要</a>
              </Link>
            </li>
            <li className={classes.link}>
              <Link
                href="https://www.notion.so/parchie/2f4eae21c4a044ae87653e599f2395f5"
                passHref
              >
                <a target="_blank">プライバシーポリシー</a>
              </Link>
            </li>
            <li className={classes.link}>
              <Link href="https://form.run/@pantrii" passHref>
                <a target="_blank">お問い合わせ</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className={classes.copyRight}>
        2021 © pantrii Corporation. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
