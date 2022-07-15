import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Gazelle from '../../../static/Gazelle.png';
import CyberAgent from '../../../static/CyberAgent.png';
import Fventures from '../../../static/Fventures.png';
import useMedia from 'use-media';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '650px',
      margin: '0 auto 40px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '40px',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '24px',
      },
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    contents: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    image: {
      maxHeight: '50px',
      [theme.breakpoints.down('sm')]: {
        '&:not(:last-child)': {
          marginBottom: '20px',
        },
      },
    },
  })
);

const Stockholder = () => {
  const classes = useStyles();
  const isPc = useMedia({ minWidth: '960px' });

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>主要株主</h2>
      <div className={classes.contents}>
        {isPc ? (
          <React.Fragment>
            <div className={classes.image}>
              <Image src={Gazelle} alt={'Gazelle'} height={50} width={195} />
            </div>
            <div className={classes.image}>
              <Image
                src={CyberAgent}
                alt={'CyberAgent'}
                height={50}
                width={117.73}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={classes.image}>
              <Image
                src={CyberAgent}
                alt={'CyberAgent'}
                height={50}
                width={117.73}
              />
            </div>
            <div className={classes.image}>
              <Image src={Gazelle} alt={'Gazelle'} height={50} width={195} />
            </div>
          </React.Fragment>
        )}
        <div className={classes.image}>
          <Image
            src={Fventures}
            alt={'Fventures'}
            height={62.69}
            width={212.5}
          />
        </div>
      </div>
    </div>
  );
};

export default Stockholder;
