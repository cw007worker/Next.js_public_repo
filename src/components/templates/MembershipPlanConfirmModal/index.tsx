import React from 'react';
import { Box, chakra, ModalContentProps, Text, VStack } from '@chakra-ui/react';
import { Query, HookState as QueryState, defaultSort } from 'hooks/useQuery';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import NormalButton from 'components/atoms/NormalButton';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { periodHumanReadable } from 'utils/calender';

type Props = {
  handleSubmit: () => void;
  isSubmitting: boolean;
  onCloseConfirmModal: () => void;
  currentSubscribedMembershipPlan: MembershipPlan | undefined;
  selectedPlan: MembershipPlan | undefined;
} & ModalContentProps;

export const MembershipPlanConfirmModal: React.FC<Props> = ({
  handleSubmit,
  isSubmitting,
  onCloseConfirmModal,
  currentSubscribedMembershipPlan,
  selectedPlan,
  ...rest
}) => {
  return (
    <ModalContent {...rest}>
      <ModalHeader>
        <Text textAlign="center">会員プランの変更</Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        {currentSubscribedMembershipPlan !== undefined && (
          <Box my="2">
            <Text fontSize="16px" color="text.200" py="2">
              現在のプラン：
            </Text>
            <Text color="text.200" fontSize="14px">
              {currentSubscribedMembershipPlan.name}
              <chakra.span fontWeight="bold">
                ￥{currentSubscribedMembershipPlan?.price}
              </chakra.span>
              /{periodHumanReadable(currentSubscribedMembershipPlan.recurring)}
            </Text>
          </Box>
        )}
        {selectedPlan !== undefined && (
          <Box my="2">
            <Text fontSize="16px" color="text.400" py="2">
              新しいプラン：
            </Text>
            <Text fontSize="14px">
              {selectedPlan.name}
              <chakra.span fontWeight="bold">
                ￥{selectedPlan?.price}
              </chakra.span>
              /{periodHumanReadable(selectedPlan.recurring)}
            </Text>
          </Box>
        )}
        <Box mt="14">※ 新しいプランは本日から適用となります。</Box>
      </ModalBody>

      <Box maxW="container.sm" px="20px" py="10px">
        <VStack>
          <NormalButton
            w="full"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            変更の確定
          </NormalButton>
          <NormalButton
            w="full"
            bg="text.100"
            color="text.400"
            onClick={onCloseConfirmModal}
          >
            キャンセル
          </NormalButton>
        </VStack>
      </Box>
    </ModalContent>
  );
};

const Img = chakra('img');
