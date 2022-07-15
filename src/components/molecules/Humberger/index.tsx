import {
  Menu,
  IconButton,
  Slide,
  Box,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Link as _Link } from '@chakra-ui/react';
import HamburgerIcon from '../../../../static/Humberger.svg';
import Image from 'next/image';
import { AccountIcon } from '../../atoms/Icons/AccountIcon';
import { FaqIcon } from './FaqIcon';
import { MailIcon } from './MailIcon';
import { LogoutIcon } from './LogoutIcon';
import { MenuItem } from 'components/atoms/MenuItem';
import React, { FC } from 'react';
import { MenuButton } from 'components/atoms/MenuButton';
import { HumbergerIcon } from './HumbergerIcon';
import { MembershipCard } from 'components/organisms/MembershipCard';
import { showChannelTalk } from 'utils/channelTalk';

type Props = {
  isMembership: boolean | undefined;
  name: string | undefined;
};

export const HumbergerMenu: FC<Props> = (props) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  return (
    <Menu>
      <MenuButton
        // hack:zindexがないとボタンが押せない
        zIndex="base"
        onClick={onToggle}
        as={IconButton}
        aria-label="Options"
        icon={<HumbergerIcon />}
      />
      <Slide direction="left" in={isOpen} style={{ zIndex: 1500 }}>
        <Box
          bg="bg.100"
          shadow="md"
          zIndex="popover"
          color="text.400"
          maxWidth="280px"
          height="100%"
          fontSize="14px"
          ref={ref}
          paddingTop="23px"
        >
          <MembershipCard
            name={props.name}
            marginX="auto"
            display={props.name === undefined ? 'none' : 'block'}
          />
          {props.isMembership ? (
            <Link href={{ pathname: '/user' }} passHref>
              <MenuItem
                icon={<AccountIcon w="6" h="6" />}
                p="24px"
                iconSpacing="24px"
              >
                マイページ
              </MenuItem>
            </Link>
          ) : (
            <Link href={{ pathname: '/auth/signIn' }} passHref>
              <MenuItem
                icon={<AccountIcon w="6" h="6" />}
                p="24px"
                iconSpacing="24px"
              >
                ログイン
              </MenuItem>
            </Link>
          )}
          <Link
            href="https://www.notion.so/parchie/121784310ad54da5b213df3e5db9e9ea"
            passHref
          >
            <MenuItem icon={<FaqIcon />} p="24px" iconSpacing="24px">
              ヘルプセンター
            </MenuItem>
          </Link>
          <MenuItem
            icon={<MailIcon />}
            p="24px"
            iconSpacing="24px"
            onClick={showChannelTalk}
          >
            お問い合わせ
          </MenuItem>
          {/* ログアウト機能できるまで一旦コメントアウト */}
          {/* <MenuItem icon={<LogoutIcon />} p="24px" iconSpacing="24px">
            ログアウト
          </MenuItem> */}
        </Box>
      </Slide>
      {isOpen && (
        <Box
          height="100%"
          width="100%"
          top="0"
          lefft="0"
          position="fixed"
          bgColor="black"
          opacity="0.5"
          zIndex="overlay"
        />
      )}
    </Menu>
  );
};
