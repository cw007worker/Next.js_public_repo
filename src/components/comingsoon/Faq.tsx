import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FaqAccordion from './FaqAccordion';

const FAQ: {
  question: string;
  answer: string;
}[] = [
  {
    question: 'Pantriiとは？',
    answer:
      'Pantriiは、コスメや美容品を中心に商品を販売するショッピングサービスで、メンバーは低価格で商品を購入することができます。定額、低価格で、いつでもどこでも、好きなだけ購入することができ、広告は一切ありません。商品や特典は毎週追加されるので、いつでも新しい商品や特典を発見できます。',
  },
  {
    question: '無料トライアルとは何ですか？',
    answer:
      '事前登録の後、一定の条件を満たした方は、無料トライアルの間、Pantriiを無料でお試しいただけます。無料トライアルの間に解約すると、料金は一切発生いたしません。',
  },
  {
    question: 'どのような商品がありますか？',
    answer:
      'Pantriiでは、コスメや美容品などを中心としたラインナップをご用意しています。いつでもお好きなだけ低価格で購入できます。',
  },
  {
    question: '解約するには？',
    answer:
      'Pantriiの手続きはとっても簡単。面倒な契約や拘束は一切ありません。たった数回のクリックで、オンラインで簡単にキャンセルできます。キャンセル料金は一切なく、アカウントの開始やキャンセルはいつでも可能です。',
  },
  {
    question: '返品はできますか？',
    answer:
      'Pantriiの会員様は、全商品について、会員の皆様に万一ご満足いただけない場合、商品と引き換えに、代金を全額返金いたします。返品対応は商品をご購入いただいた会員ご本人様に限ります。ただし、家庭用電化製品の返品につきましてはご購入日より90日間は返品をお受けします。',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px 28px 35px',
    },
    title: {
      fontSize: '24px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '24px',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '20px',
      },
    },
    content: {
      padding: '16px 20px 10px',
      fontSize: '16px',
      lineHeight: '30px',
      color: '#FFFFFF',
      [theme.breakpoints.down(360)]: {
        fontSize: '12px',
        lineHeight: '22px',
      },
    },
  })
);

const Faq = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>よくあるご質問</h2>
      {FAQ.map((faq, i) => (
        <FaqAccordion summary={faq.question} key={i}>
          <p className={classes.content}>{faq.answer}</p>
        </FaqAccordion>
      ))}
    </div>
  );
};

export default Faq;
