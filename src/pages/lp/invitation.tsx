import React from 'react';
import Head from 'next/head';
import Seo from 'components/Seo';
import { useInvitationPage } from 'hooks/pages/lp/useInvitationPage';
import { ToAppTemplate } from 'components/templates/ToApp';

const Invitation = () => {
  const state = useInvitationPage();

  return (
    <React.Fragment>
      <Head>
        <Seo
          pageTitle={
            '10%オフ(最大¥5,000割引)！会員限定でお得に楽しくお買い物しましょう！｜Pantrii（パントリー）'
          }
          pageDescription="Pantrii（パントリー）は、話題のコスメやファッションが会員限定価格でお得に買える会員制のショッピングサイトです。友達招待でクーポンをゲットしましょう！"
          pageImgPath="/Head/OGPForReferralProgram.jpg"
          pagePath="/lp/invitation"
        />
      </Head>
      <ToAppTemplate {...state} />
    </React.Fragment>
  );
};

export default Invitation;
