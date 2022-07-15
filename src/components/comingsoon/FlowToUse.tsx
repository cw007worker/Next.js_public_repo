import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px 0 38px',
    },
    wrapper: {
      padding: '0 16px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '50px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    flow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      maxWidth: '374px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '22px 0',
      marginBottom: '8px',
    },
    step: {
      fontSize: '18px',
      lineHeight: '30px',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '46px',
    },
    number: {
      display: 'block',
      fontSize: '36px',
      marginTop: '4px',
    },
    text: {
      fontSize: '24px',
      lineHeight: '30px',
      fontWeight: 'bold',
      textAlign: 'center',
      [theme.breakpoints.down(360)]: {
        fontSize: '19px',
        lineHeight: '25px',
      },
    },
    subText: {
      fontSize: '14px',
      lineHeight: '20px',
      textAlign: 'left',
      marginTop: '9px',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
        lineHeight: '15px',
      },
    },
    triangle: {
      borderTop: '14px solid #E7E7E7',
      borderRight: '24px solid transparent',
      borderLeft: '24px solid transparent',
      width: '0',
      margin: '0 auto 7px',
    },
    end: {
      maxWidth: '374px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '21px 0',
    },
  })
);

const FlowToUse = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>2ステップでかんたん登録</h2>
      <div className={classes.wrapper}>
        <div className={classes.flow}>
          <h3 className={classes.step}>
            STEP<span className={classes.number}>01</span>
          </h3>
          <div>
            <p className={classes.text}>メールアドレスを登録</p>
            <p className={classes.subText}>必要なのはメールアドレスだけ！</p>
          </div>
        </div>
        <div className={classes.triangle}></div>
        <div className={classes.flow}>
          <h3 className={classes.step}>
            STEP<span className={classes.number}>02</span>
          </h3>
          <div>
            <p className={classes.text}>登録の手続きを行う</p>
            <p className={classes.subText}>
              登録が完了したらメンバーシップ開始
            </p>
          </div>
        </div>
        <div className={classes.triangle}></div>
        <div className={classes.end}>
          <p className={classes.text}>利用開始</p>
        </div>
      </div>
    </div>
  );
};

export default FlowToUse;
