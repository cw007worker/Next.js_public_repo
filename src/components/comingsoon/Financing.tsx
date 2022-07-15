import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '360px',
      margin: '0 auto 92px',
    },
    title: {
      fontSize: '26px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '15px',
    },
    contents: {
      fontSize: '26px',
      lineHeight: '50px',
      textAlign: 'center',
    },
  })
);

const Financing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>資金調達額</h2>
      <p className={classes.contents}>4,000万円</p>
    </div>
  );
};

export default Financing;
