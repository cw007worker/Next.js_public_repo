import React from 'react';
import Head from 'next/head';
import Seo from 'components/Seo';
import Header from 'components/comingsoon/Header';
import FirstView from 'components/comingsoon/FirstView';
import DiscountProductsSlide from 'components/comingsoon/DiscountProductsSlide';
import AnnualFee from 'components/comingsoon/AnnualFee';
import FlowToUse from 'components/comingsoon/FlowToUse';
import ConvenientService from 'components/comingsoon/ConvenientService';
import Faq from 'components/comingsoon/Faq';
import Footer from 'components/comingsoon/Footer';
import Contact from 'components/comingsoon/Contact';
import Brand from 'components/comingsoon/Brand';
import Stockholder from 'components/comingsoon/Stockholder';
import EmailForm from 'components/comingsoon/EmailForm';
import FloatingButton from 'components/comingsoon/FloatingButton';
import SpecialTreatment from 'components/comingsoon/SpecialTreatment';
import SmartShopping from 'components/comingsoon/SmartShopping';
import CheapnessSecret from 'components/comingsoon/CheapnessSecret';
import { getFullPath } from 'utils/getFullPath';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FeatureList from 'components/comingsoon/FeatureList';
import { css, Global } from '@emotion/react';
import 'swiper/components/navigation/navigation.min.css';
import PickupProduct from 'components/comingsoon/PickupProduct';
import Treatment from 'components/comingsoon/Treatment';
import PantriiPv from 'components/comingsoon/PantriiPv';
import 'swiper/components/navigation/navigation.min.css';
import HttpClient from 'inflastructure/HttpClient';
import HomeApi from 'repositories/pre-launch/HomeApi';
import { useComingsoonPage } from 'hooks/pages/comingsoon/useComingsoonPage';

type homeInfoType = {
  total_member_count: number;
};

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
const homeApi = new HomeApi({ httpClient });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      background: '#000000',
    },
  })
);

const Comingsoon = () => {
  const { restartOnboardingState, handleEmailSubmit } = useComingsoonPage();
  const [homeInfo, setHomeInfo] = React.useState<homeInfoType | undefined>(
    undefined
  );
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const [isAppearButton, setIsAppearButton] = React.useState(false);
  const [isAppearUpperForm, setIsAppearUpperForm] = React.useState(true);
  const [isAppearLowerForm, setIsAppearLowerForm] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    // データ取得
    homeApi.getHome().then((res) => {
      setHomeInfo(res.data);
    });
  }, []);

  React.useEffect(() => {
    setIsAppearButton(!(isAppearUpperForm || isAppearLowerForm));
  }, [isAppearUpperForm, isAppearLowerForm]);

  return (
    <React.Fragment>
      <Head>
        <Seo
          pageTitle={
            'Pantrii（パントリー）｜会員限定でお得に楽しくお買い物しよう！'
          }
          pagePath="/comingsoon"
        />
      </Head>
      <body>
        <Global styles={GlobalStylesForLP} />
        <Header backgroundColor="gradation" />

        <main className={classes.main}>
          <FirstView
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onClick={handleEmailSubmit}
            handleAppear={() => setIsAppearUpperForm(true)}
            handleDisappear={() => setIsAppearUpperForm(false)}
            totalMemberCount={homeInfo?.total_member_count}
            restartOnboardingState={restartOnboardingState}
          />
          <FeatureList />
          <PantriiPv />
          <PickupProduct />
          <DiscountProductsSlide />
          {/* <Brand /> */}
          <FlowToUse />
          <AnnualFee />
          <Treatment />
          {/* <SpecialTreatment /> */}
          <ConvenientService />
          {/* <SmartShopping /> */}
          {/* <CheapnessSecret /> */}
          <Faq />
          {/* <Stockholder /> */}
          <Contact />
          {/* {!restartOnboardingState?.isReStartOnboarding && (
            <FloatingButton isAppearButton={isAppearButton} isFocus={isFocus} />
          )} */}
        </main>
        <Footer backgroundColor="black" />
      </body>
    </React.Fragment>
  );
};

Comingsoon.displayName = 'Comingsoon';

export default Comingsoon;

export const GlobalStylesForLP = () => css`
  html,
  body,
  p,
  h2,
  h3,
  h4,
  ul {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: #333333;
  }

  * {
    outline: none;
    box-sizing: border-box;
  }

  body {
    width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input,
  button {
    border: none;
  }

  button,
  a {
    cursor: pointer;
    transition: 0.3s all;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  button:hover,
  a:hover {
    opacity: 0.7;
  }

  input[type='text']:focus {
    outline: 0;
  }

  input::placeholder {
    color: #656565;
  }

  li {
    list-style: none;
  }

  .swiper-pagination-bullet-active {
    background: #ff8080 !important;
  }
`;
