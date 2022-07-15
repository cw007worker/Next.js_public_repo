import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '40px',
      height: '40px',
      backgroundColor: '#C4C4C4',
      borderRadius: '50%',
      position: 'relative',
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
  })
);

type Props = {
  onClick: () => void;
  className?: string;
};
const CloseButton: React.FC<Props> = ({ onClick, className }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <button onClick={onClick} className={classes.root}>
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
      </button>
    </div>
  );
};

export default CloseButton;
