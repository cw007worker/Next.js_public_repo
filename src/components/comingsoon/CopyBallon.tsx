import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import CheckGray from '../../../static/CheckGray.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '10px  14px 10px 38px',
      borderRadius: '40px',
      background: '#4F4F4F',
      position: 'relative',
    },
    check: {
      height: '15px',
      width: '15px',
      position: 'absolute',
      left: '17px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: '#FFFFFF',
      borderRadius: '50%',
    },
    checkImage: {
      transform: 'translateY(-7%)',
    },
    text: {
      fontSize: '13px',
      lineHeight: '18px',
      textAlign: 'center',
      color: '#FFFFFF',
      whiteSpace: 'nowrap',
    },
    triagle: {
      borderRight: '5px solid transparent',
      borderLeft: '5px solid transparent',
      borderTop: '10px solid #4F4F4F',
      position: 'absolute',
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  })
);

type Props = {
  className?: string;
};
const CopyBallon: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <div className={classes.root}>
        <div className={classes.check}>
          <div className={classes.checkImage}>
            <Image src={CheckGray} alt={'CheckGray'} />
          </div>
        </div>
        <p className={classes.text}>コピーされました！</p>
        <div className={classes.triagle}></div>
      </div>
    </div>
  );
};

export default CopyBallon;
