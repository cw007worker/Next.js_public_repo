import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '32px 16px 20px',
    },
    wrapper: {
      maxWidth: 560,
      margin: '0 auto',
    },
    video: {
      width: '100%',
      borderRadius: 5,
    },
  })
);

const PantriiPv = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <video
          className={classes.video}
          autoPlay
          loop
          muted
          playsInline
          poster="../../../static/PantriiPv.png"
        >
          <source src="../../../static/PantriiPv.webm" type="video/webm" />
          <source src="../../../static/PantriiPv.mov" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default PantriiPv;
