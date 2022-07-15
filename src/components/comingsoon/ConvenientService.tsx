import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import ServiceImage1 from '../../../static/ServiceImage1.svg';
import ServiceImage2 from '../../../static/ServiceImage2.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '8px 0 44px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '50px',
      fontWeight: 'bold',
      marginBottom: '40px',
      textAlign: 'center',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    services: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        maxWidth: '560px',
        margin: '0 auto',
      },
    },
    service: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:not(:last-child)': {
          marginBottom: '48px',
        },
      },
    },
    img: {
      minWidth: '60px',
      margin: '0 auto 8px',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        margin: '0',
      },
    },
    text: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFFFFF',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '38px',
        textAlign: 'left',
        width: '170px',
      },
      [theme.breakpoints.down(360)]: {
        marginLeft: '30px',
      },
    },
    lineBreak: {
      display: 'block',
    },
  })
);

const ConvenientService = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>便利なサービス</h2>
      <div className={classes.services}>
        <div className={classes.service}>
          <div className={classes.img}>
            <Image
              src={ServiceImage1}
              alt={'ServiceImage1'}
              height={51}
              width={57.19}
            />
          </div>
          <p className={classes.text}>
            24時間<span className={classes.lineBreak}>カスタマーサポート</span>
          </p>
        </div>
        <div className={classes.service}>
          <div className={classes.img}>
            <Image
              src={ServiceImage2}
              alt={'ServiceImage2'}
              height={37.27}
              width={38.62}
            />
          </div>
          <p className={classes.text}>
            30日間の
            <span className={classes.lineBreak}>無料返品サービスあり</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConvenientService;
