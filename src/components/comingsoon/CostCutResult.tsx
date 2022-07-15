import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import Group1171 from '../../../static/Group1171.png';
import Group1262 from '../../../static/Group1262.png';
// import Group1302 from '../../../static/Group1302.png';
// import downVector from '../../../static/downVector.png';
import useMedia from 'use-media';
// import Accordion from './Accordion';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '33.58px',
      [theme.breakpoints.down('sm')]: {
        padding: '30.54px 27px 0',
      },
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      lineHeight: '30px',
      textAlign: 'center',
      marginBottom: '46px',
      [theme.breakpoints.down(375)]: {
        fontSize: '23px',
      },
    },
    lineBreak: {
      marginTop: '15px',
      display: 'block',
    },
    img: {
      display: 'block',
      maxWidth: '550.67px',
      margin: '0 auto 19px',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '289px',
      },
    },
    videoWrapper: {
      maxWidth: '560px',
      padding: '24.31px 0',
    },
  })
);
const CostCutResult = () => {
  const classes = useStyles();
  const isPc = useMedia({ minWidth: '960px' });

  return (
    <div className={classes.root}>
      <p className={classes.title}>
        支払い金額が
        <span className={classes.lineBreak}>どんどん安くなる！</span>
      </p>
      <div className={classes.img}>
        <Image src={isPc ? Group1171 : Group1262} alt={'costCutResultImage'} />
      </div>
      {/* <Accordion
        summary={'詳しくはこちら'}
        image={downVector}
      >
        <div className={classes.videoWrapper}>
          <Image src={Group1302} alt={'video'} />
        </div>
      </Accordion> */}
    </div>
  );
};

export default CostCutResult;
