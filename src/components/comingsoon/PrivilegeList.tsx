import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PrivilegeCard from 'components/comingsoon/PrivilegeCard';
import clsx from 'clsx';
import Image from 'next/image';
import Step1Left from '../../../static/Step1Left.svg';
import Step1Right from '../../../static/Step1Right.svg';
import Step2 from '../../../static/Step2.svg';
import Step3 from '../../../static/Step3.svg';
import Step4 from '../../../static/Step4.svg';
import Coupon from '../../../static/Coupon.svg';
import AItem01 from '../../../static/AItem01.png';
import AItem02 from '../../../static/AItem02.png';
import AItem03 from '../../../static/AItem03.png';
import AItem04 from '../../../static/AItem04.png';
import AItem05 from '../../../static/AItem05.png';
import AItem06 from '../../../static/AItem06.png';
import AItem07 from '../../../static/AItem07.png';
import AItem08 from '../../../static/AItem08.png';
import Andmore from '../../../static/Andmore.svg';
import SItem1 from '../../../static/SItem1.png';
import SItem2 from '../../../static/SItem2.png';
import SItem3 from '../../../static/SItem3.png';
import SItem4 from '../../../static/SItem4.png';

const AITEM: {
  name: string;
  image: StaticImageData;
}[][] = [
  [
    {
      name: 'GUCCI',
      image: AItem01,
    },
    {
      name: 'Aesop',
      image: AItem02,
    },
    {
      name: 'YSL',
      image: AItem03,
    },
  ],
  [
    {
      name: 'celvoke',
      image: AItem04,
    },
    {
      name: 'Ipsa',
      image: AItem05,
    },
    {
      name: 'to/one',
      image: AItem06,
    },
  ],
  [
    {
      name: "KIEHL'S",
      image: AItem07,
    },
    {
      name: 'THREE',
      image: AItem08,
    },
    {
      name: 'and more...',
      image: Andmore,
    },
  ],
];
const SITEM: {
  name: string;
  image: StaticImageData;
}[][] = [
  [
    {
      name: 'CELINE',
      image: SItem1,
    },
    {
      name: 'GUCCI',
      image: SItem2,
    },
    {
      name: 'Dior',
      image: SItem3,
    },
  ],
  [
    {
      name: 'miumiu',
      image: SItem4,
    },
    {
      name: 'and more...',
      image: Andmore,
    },
  ],
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '36px 12px 64px',
    },
    title: {
      fontSize: '16px',
      lineHeight: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '40px',
      color: '#FFFFFF',
    },
    list: {},
    step1Left: {
      position: 'absolute',
      bottom: 6,
      left: 0,
      opacity: 0.4,
      zIndex: -1,
    },
    step1Right: {
      position: 'absolute',
      top: 2,
      right: 0,
      opacity: 0.4,
      zIndex: -1,
    },
    step2: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: -1,
    },
    step3: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: -1,
    },
    step4: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: -1,
    },
    border: {
      width: '1px',
      height: 40,
      backgroundColor: '#C4C4C4',
      margin: '0 auto',
    },
    contentName: {
      fontSize: '14px',
      lineHeight: '27px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    contentText: {
      fontSize: '10px',
      lineHeight: '12px',
      textAlign: 'center',
      marginBottom: '5px',
    },
    coupon: {
      textAlign: 'center',
      padding: '20px 0',
    },
    items: {
      width: '100%',
    },
    itemBlock: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px 0',
    },
    item: {
      width: '100%',
    },
    itemImage: {
      position: 'relative',
      marginBottom: 8,
    },
    aItem: {
      height: '80px',
    },
    sItem: {
      height: '80px',
    },
    itemName: {
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'center',
    },
    lineBreak: {
      display: 'block',
    },
  })
);

type Props = {
  inviteMemberCountRank: number;
  inviteMemberCount: number;
};
const PrivilegeList: React.FC<Props> = ({
  inviteMemberCountRank,
  // inviteMemberCount,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>リリース後に使える獲得した特典</h2>
      <div className={classes.list}>
        <PrivilegeCard
          isLocked={false}
          hasDetail={false}
          subTitle="リリース後"
          title="会員費半額"
          caution="※2021年11月3日までに登録された方は30日間無料"
          background={
            <React.Fragment>
              <div className={classes.step1Left}>
                <Image
                  src={Step1Left}
                  alt={'Step1Left'}
                  height={110.36}
                  width={91.42}
                />
              </div>
              <div className={classes.step1Right}>
                <Image
                  src={Step1Right}
                  alt={'Step1Right'}
                  height={110.36}
                  width={84.94}
                />
              </div>
            </React.Fragment>
          }
        />
        <div className={classes.border}></div>
        {/* <PrivilegeCard
          isLocked={inviteMemberCount < 1}
          isInviting={true}
          hasDetail={true}
          subTitle="1人招待で達成"
          title="5%OFFクーポン"
          detailTitle="1人招待で達成"
          contentTitle="5%OFFクーポンGET"
          background={
            <div className={classes.step2}>
              <Image src={Step2} alt={'Step2'} height={70.15} width={101} />
            </div>
          }
          content={
            <div className={classes.coupon}>
              <Image src={Coupon} alt="Coupon" height={111.68} width={221.65} />
            </div>
          }
        /> */}
        {/* <div className={classes.border}></div> */}
        <PrivilegeCard
          isLocked={inviteMemberCountRank > 100}
          hasDetail={true}
          subTitle="順番が100番目以内で達成"
          title="1円祭りに参加できる"
          contentTitle="1円祭りに参加できる！"
          detailTitle="利用できる順番が100番目以内"
          background={
            <div className={classes.step3}>
              <Image src={Step3} alt={'Step3'} height={71.97} width={83.96} />
            </div>
          }
          content={
            <React.Fragment>
              <h4 className={classes.contentName}>商品一覧</h4>
              <p className={classes.contentText}>
                ※一部商品のみを掲載しております。
              </p>
              <div className={classes.items}>
                {AITEM.map((itemBlock, i) => (
                  <div className={classes.itemBlock} key={i}>
                    {itemBlock.map((item, j) => (
                      <div className={classes.item} key={j}>
                        <div className={clsx(classes.itemImage, classes.aItem)}>
                          <Image
                            src={item.image}
                            alt={`AItem${(i + 1) * (j + 1)}`}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <p className={classes.itemName}>{item.name}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </React.Fragment>
          }
        />
        {/* <div className={classes.border}></div> */}
        {/* <PrivilegeCard
          isLocked={inviteMemberCountRank > 10}
          hasDetail={true}
          subTitle={'順番が10番目以内で達成'}
          title={'総額100万円を1円で！'}
          detailTitle="順番がTOP10"
          contentTitle={'ハイブランド商品を1円でGET！'}
          background={
            <div className={classes.step4}>
              <Image src={Step4} alt={'Step4'} height={81} width={95.42} />
            </div>
          }
          content={
            <React.Fragment>
              <h4 className={classes.contentName}>商品一覧</h4>
              <p className={classes.contentText}>
                ※一部商品のみを掲載しております。
              </p>
              <div className={classes.items}>
                {SITEM.map((itemBlock, i) => (
                  <div className={classes.itemBlock} key={i}>
                    {itemBlock.map((item, j) => (
                      <div className={classes.item} key={j}>
                        <div className={clsx(classes.itemImage, classes.sItem)}>
                          <Image
                            src={item.image}
                            alt={`SItem${(i + 1) * (j + 1)}`}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="bottom"
                          />
                        </div>
                        <p className={classes.itemName}>{item.name}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </React.Fragment>
          }
        /> */}
      </div>
    </div>
  );
};

export default PrivilegeList;
