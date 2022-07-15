import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 27px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '50px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '20px',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    wrapper: {
      padding: '24px 20px 20px',
      backgroundColor: '#F4F4F4',
      maxWidth: '560px',
      margin: '0 auto',
      borderRadius: 28,
    },
    text: {
      fontSize: '18px',
      lineHeight: '30px',
      textAlign: 'center',
    },
    mainText: {
      display: 'block',
      fontSize: '26px',
      lineHeight: '50px',
      fontWeight: 'bold',
      [theme.breakpoints.down(360)]: {
        fontSize: '22px',
      },
    },
    time: {
      marginBottom: '22px',
    },
  })
);
const Contact = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>ご質問はこちらから</h2>
      <div className={classes.wrapper}>
        <p className={clsx(classes.text, classes.time)}>受付時間：24時間</p>
        <p className={classes.text}>
          メールアドレス
          <span className={classes.mainText}>info@pantrii.jp</span>
        </p>
      </div>
    </div>
  );
};

export default Contact;
