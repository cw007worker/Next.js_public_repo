import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Group1458 from '../../../static/Group1458.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '16px 0px 40px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '30px',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    text: {
      fontSize: '10px',
      lineHeight: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '8px',
      },
    },
    lineBreak: {
      display: 'block',
    },
    img: {
      margin: '0 auto 16px',
      padding: '0 16px',
      maxWidth: '307px',
    },
  })
);
const AnnualFee = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>会員月額費について</h2>
      <div className={classes.img}>
        <Image src={Group1458} alt={'annualFeeImage'} height={59} width={307} />
      </div>
      <p className={classes.text}>
        2021年11月3日までに登録した方は、体験期間終了日時までに解約すれば、
        <span className={classes.lineBreak}>
          料金が請求されることはありません。
        </span>
        <span className={classes.lineBreak}>
          期間終了3日前には、メールにてお知らせ致します。
        </span>
      </p>
    </div>
  );
};

export default AnnualFee;
