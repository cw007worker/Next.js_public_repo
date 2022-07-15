import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '4px 12px 20px',
    },
    card: {
      background: '#FFFFFF',
      borderRadius: '5px',
      padding: '8px 20px',
      maxWidth: '400px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'flex-end',
    },
    title: {
      fontSize: '14px',
      lineHeight: '28px',
      fontWeight: 500,
    },
    number: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 700,
      marginLeft: 'auto',
    },
    unit: {
      fontSize: '14px',
      fontWeight: 'normal',
      marginLeft: '17.26px',
    },
  })
);

type Props = {
  invitedPeople: number;
};
const InvitedPeople: React.FC<Props> = ({ invitedPeople }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h2 className={classes.title}>招待した人数</h2>
        <p className={classes.number}>
          {invitedPeople?.toLocaleString()}
          <span className={classes.unit}>人</span>
        </p>
      </div>
    </div>
  );
};

export default InvitedPeople;
