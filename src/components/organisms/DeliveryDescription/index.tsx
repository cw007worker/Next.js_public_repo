import { FC } from 'react';
import {
  BoxProps,
  Box,
  Circle,
  HStack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { MembershipGrade } from 'type/viewModel/me';
import Link from 'next/link';

type Props = {
  membershipGrade: MembershipGrade;
} & BoxProps

export const DeliveryDescription: FC<Props> = ({ membershipGrade, ...rest }) => {
  return (
    <Box {...rest} >
      <HStack>
        <Circle size='14px' bg="text.300" />
        <Text
          textStyle="h7"
          color="text.300"
          textDecoration="underline"
        >
          発送地：日本
        </Text>
      </HStack>
      {membershipGrade !== 'year' &&
        <HStack>
          <Circle size='14px' bg="text.300" />
          <Link
            href='/user/membership/setting/plan'
            passHref
          >
            <Text
              textStyle="h7"
              color="text.300"
              textDecoration="underline"
            >
              年額メンバーシップなら送料無料
            </Text>
          </Link>
        </HStack>
      }
    </Box>
  );
};
