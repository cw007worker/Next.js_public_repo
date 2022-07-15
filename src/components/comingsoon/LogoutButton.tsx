import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAuthSignOut } from 'hooks/useAuthSignOut';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '15px',
      lineHeight: '30px',
      background: 'transparent',
      borderRadius: '6px',
      padding: '0 10px',
    },
  })
);

type Props = {
  className?: string;
};
const LogoutButton: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const { signOut } = useAuthSignOut();

  return (
    <div className={className}>
      <button className={classes.root} onClick={signOut}>
        ログアウト
      </button>
    </div>
  );
};

export default LogoutButton;
