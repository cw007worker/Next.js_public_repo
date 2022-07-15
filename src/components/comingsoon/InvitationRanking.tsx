import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Trophy from '../../../static/Trophy.png';
import FirstPlace from '../../../static/FirstPlace.png';
import SecondPlace from '../../../static/SecondPlace.png';
import ThirdPlace from '../../../static/ThirdPlace.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px 12px 12px',
    },
    title: {
      fontSize: '18px',
      lineHeight: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '16px',
    },
    card: {
      maxWidth: '400px',
      position: 'relative',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '12px 0',
      margin: '0 auto',
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: '5px',
      textAlign: 'center',
    },
    cardTitle: {
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '24px',
      margin: '0 auto 28px',
      padding: '0 16px',
      borderRadius: '24px',
      textAlign: 'center',
      backgroundColor: '#FFD84D',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
      },
    },
    rankingWrapper: {
      minWidth: '230px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-evenly',
      marginBottom: '20px',
    },
    trophy: {
      flex: 1,
      textAlign: 'right',
    },
    ranking: {
      fontSize: '40px',
      lineHeight: '40px',
      fontWeight: 700,
      flex: 1,
      textAlign: 'center',
      padding: '0 16px',
      [theme.breakpoints.down(360)]: {
        fontSize: '36px',
        lineHeight: '36px',
      },
    },
    unit: {
      fontSize: '18px',
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'left',
    },
    text: {
      display: 'inline-block',
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      border: '1px solid #BDBDBD',
      minWidth: 272,
      borderRadius: 7,
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
      },
    },
  })
);

type Props = {
  rank: number;
  invitedPeople: number;
  inviteCountTop100: number;
  inviteCountTop10: number;
};
const InvitationRanking: React.FC<Props> = ({
  rank,
  invitedPeople,
  inviteCountTop100,
  inviteCountTop10,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h2 className={classes.title}>サービスが利用開始できる順番</h2>
        <h3 className={classes.cardTitle}>招待したら順番があがるよ😎</h3>
        <div className={classes.rankingWrapper}>
          <div className={classes.trophy}>
            {rank === 1 ? (
              <Image
                src={FirstPlace}
                alt={'FirstPlace'}
                height={31.56}
                width={46.65}
              />
            ) : rank === 2 ? (
              <Image
                src={SecondPlace}
                alt={'SecondPlace'}
                height={31.56}
                width={46.65}
              />
            ) : rank === 3 ? (
              <Image
                src={ThirdPlace}
                alt={'ThirdPlace'}
                height={31.56}
                width={46.65}
              />
            ) : (
              <Image src={Trophy} alt={'Trophy'} height={31.56} width={46.65} />
            )}
          </div>
          <p className={classes.ranking}>{rank?.toLocaleString()}</p>
          <p className={classes.unit}>番目</p>
        </div>
        {rank > 100 ? (
          <p className={classes.text}>
            あと{inviteCountTop100 - invitedPeople || 1}人招待でTOP100の特典獲得
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default InvitationRanking;
