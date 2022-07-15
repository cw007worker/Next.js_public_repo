import React from 'react';
import {
  Box,
  chakra,
  ModalBody,
  ModalContentProps,
  Text,
  Center,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Query, HookState as QueryState, defaultSort } from 'hooks/useQuery';
import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { HookState } from 'hooks/useVerifyPhoneCode';
import NormalButton from 'components/atoms/NormalButton';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { SMS_CODE_REGEX } from 'utils/regex';
import { OnboardingStep } from 'components/organisms/OnboardingStep';
import { Controller, useForm } from 'react-hook-form';
import { ChatIcon } from '@chakra-ui/icons';
import { SmsIcon } from 'components/atoms/Icons/SmsIcon';

type Props = {
  onCloseVerifyCodeModal: () => void;
  phoneNumber: string | undefined;
} & HookState & ModalContentProps;

export const VerifyPhoneCodeModal: React.FC<Props> = ({
  state,
  onSubmit,
  isSubmitting,
  canGo,
  errors,
  register,
  control,
  handleSubmit,
  onCloseVerifyCodeModal,
  phoneNumber,
  ...rest
}) => {
  return (
    <ModalContent {...rest}>
      <ModalHeader>
        <Flex>
          <Center>
            <Text textStyle="h3" color="text.400">
              認証コードを入力
            </Text>
          </Center>
          <SmsIcon w="60px" px="10px"/>
        </Flex>
        <Text pb="5" fontSize="14px" fontWeight="none">
          <chakra.span fontWeight="bold" color="action.attention2">
            {phoneNumber}&nbsp;
          </chakra.span>
          宛にSMS認証コードを送信しました。<br/>
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody pt="15px" pb="30px">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Alert status='info' borderRadius="5px" mb="20px">
              <AlertIcon />
              <Text fontSize="14px">
                メッセージに記載された6桁の数字を入力してください。
              </Text>
            </Alert>
          <FormControl isInvalid={errors.code} w="full">
            <Controller
              control={control}
              name='verificationCode'
              rules={{
                required: 'この項目は必須です',
                pattern: {
                  value: SMS_CODE_REGEX,
                  message: '有効な認証番号を入力してください。',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  {error && (
                    <Text pt="1" textStyle="h8" color="action.notification">
                      {error.message}
                    </Text>
                  )}
                  <HStack justifyContent="space-between">
                    <PinInput
                      placeholder=''
                      onChange={onChange}
                      value={value}
                      >
                      <PinInputField/>
                      <PinInputField/>
                      <PinInputField/>
                      <PinInputField/>
                      <PinInputField/>
                      <PinInputField/>
                    </PinInput>
                  </HStack>
                </>
              )}
            />
          </FormControl>
          <Box py="5">
            <NormalButton
              w="full"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!canGo}
              >
              続ける
            </NormalButton>
          </Box>
        </form>
      </ModalBody>
    </ModalContent>
  )
};
