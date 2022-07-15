import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

type Props = {
  color?: string;
};
const Loading: React.FC<Props> = ({ color = '#FFFFFF' }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="inherit" style={{ color: color }} />
    </div>
  );
};

export default Loading;
