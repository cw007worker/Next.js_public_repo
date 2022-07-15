import React,  { useState, FC } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  TabsProps,
  Text,
  Box,
  Fade,
} from '@chakra-ui/react';
import { Tab } from 'components/atoms/Tab';
import { MoreButton } from 'components/atoms/MoreButton';
import { LessButton } from 'components/atoms/MoreButton/reverse';
import { ArrowDown } from 'components/atoms/MoreButton/ArrowDown';

type Props = {
  description: string;
} & Omit<TabsProps, 'children'>;

export const Description: FC<Props> = ({ description, ...rest }) => {
  const [ isOpenDesc, setIsOpenDesc ] = useState(false)
  const handleOpenDesc = () => setIsOpenDesc(!isOpenDesc);

  return (
    <Tabs isManual variant="enclosed" {...rest}>
      <TabList h="48px">
        <Tab>アイテム説明</Tab>
        {/* <Tab>詳細</Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box px="16px" py="8px">
            {/**
             * HACK: safariだと -webkit-line-clamp が innerにあるブロック要素に適用されない
             * そのため、テキストの行数制限はchakra uiのnoOfLinesは使わずに、lineHeightで対応した
             * FYI: https://stackoverflow.com/questions/70897195/line-clamp-webkit-not-working-in-safari
            **/}
            {isOpenDesc ? (
              <>
                <Text 
                  style={{
                    transition: '1s',
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  {description
                    .split('\n')
                    .map((t) => (t !== '' ? <div>{t}</div> : <br />))}
                </Text>
                <LessButton
                  onClick={handleOpenDesc}
                  background="linear-gradient(360deg, #FFFFFF 53.65%, rgba(238, 238, 238, 0) 100%)"
                  height="50px"
                />
              </>
            ) : (
              <>
                <Text
                  css={{
                    transition: '1s',
                    overflow: "hidden",
                    display: 'block',
                    fontSize: '14px',
                    lineHeight: '20px',
                    height: '60px',
                  }}
                >
                  {description
                    .split('\n')
                    .map((t) => (t !== '' ? <div>{t}</div> : <br />))}
                </Text>
                <MoreButton
                  onClick={handleOpenDesc}
                  background="linear-gradient(360deg, #FFFFFF 53.65%, rgba(238, 238, 238, 0) 100%)"
                  position="relative"
                  bottom="0"
                  height="50px"
                />
              </>
            )}
          </Box>
        </TabPanel>
        {/* <TabPanel>
          <p>
            さまは猫のおじぎ外がいを狸でなおる譜ですた。そしていきなり楽たなくという窓まします。丈夫ましましんじしかたすると町の丈夫たちのっきりをもまるで大丈夫だたで、何でもからだにひるまれふしないまし。すましすぎやつは糸をいいですて一番の狩の交響曲者をある第二ざとじぶんの顔の病気にして来たまし。あとは前のみていまし。
            からだは一なっ血のようにやめて来まし。助けはかぎほんとうやどこがしていた。一つはゴーシュをりんになって公会堂をたばこのようがはせて底をなるながらどうも笑いを叩くてくださいござい。
          </p>
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
};
