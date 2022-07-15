import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import NormalButton from 'components/atoms/NormalButton';
// import { TextField } from 'components/atoms/TextField';
import { Input } from '@chakra-ui/react';
import { useEnterShippingAddressPage } from 'hooks/pages/useEnterShippingAddressPage';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ShippingAddress } from 'type/viewModel/common/shippingAddress';
import { Label } from 'components/atoms/Label';

type Props = {
  shippingAddress: ShippingAddress | undefined;
  reload: () => void;
};
export const EnterShippingAddressTemplate: React.VFC<Props> = ({
  shippingAddress,
  reload,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: shippingAddress, mode: 'onChange' });
  const { handleAdd, handleUpdate, isLoading } = useEnterShippingAddressPage(
    shippingAddress?.id,
    reload
  );

  return (
    <Box pt="5" pb="11" maxWidth="xl" mx="auto" bg="bg.200">
      <Text textStyle="h5" mb="5" mx="20px">
        お届け先情報
      </Text>
      <form onSubmit={handleSubmit(handleUpdate || handleAdd)}>
        <Box px="20px" bg="white" mb="20px">
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" required w="164px">
              <Text textStyle="h5">姓</Text>
            </Label>
            <Input
              isRequired={true}
              {...register('lastName', {
                required: 'この項目は必須です',
              })}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="佐藤"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.lastName && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.lastName.message}
              </Text>
            )}
          </Box>
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" required w="164px">
              <Text textStyle="h5">名</Text>
            </Label>
            <Input
              isRequired={true}
              {...register('firstName', {
                required: 'この項目は必須です',
              })}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="太郎"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.firstName && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.firstName.message}
              </Text>
            )}
          </Box>
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" required w="164px">
              <Text textStyle="h5">姓(カナ)</Text>
            </Label>
            <Input
              isRequired={true}
              {...register('lastNameKana', {
                required: 'この項目は必須です',
                pattern: {
                  value: /^[\u30A0-\u30FF]+$/,
                  message: '全角カタカナで入力してください',
                },
              })}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="サトウ"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.lastNameKana && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.lastNameKana.message}
              </Text>
            )}
          </Box>
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" required w="164px">
              <Text textStyle="h5">名(カナ)</Text>
            </Label>
            <Input
              isRequired={true}
              {...register('firstNameKana', {
                required: 'この項目は必須です',
                pattern: {
                  value: /^[\u30A0-\u30FF]+$/,
                  message: '全角カタカナで入力してください',
                },
              })}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="タロウ"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              borderBottom="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.firstNameKana && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.firstNameKana.message}
              </Text>
            )}
          </Box>
        </Box>
        <Box px="20px" gridTemplateColumns="164px 1fr" bg="white">
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" required w="164px">
              <Text textStyle="h5">郵便番号</Text>
            </Label>
            <Input
              isRequired={true}
              {...register('zipcode', {
                required: 'この項目は必須です',
                pattern: {
                  value: /\d{7}$/,
                  message: '7桁の数字で入力してください',
                },
              })}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="ハイフンなし"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.zipcode && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.zipcode.message}
              </Text>
            )}
          </Box>
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" required w="164px">
              <Text textStyle="h5">都道府県</Text>
            </Label>
            <Input
              isRequired={true}
              {...register('prefecture', {
                required: 'この項目は必須です',
              })}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="東京都"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.prefecture && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.prefecture.message}
              </Text>
            )}
          </Box>
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" required w="164px">
              <Text textStyle="h5">市町村区・番地</Text>
            </Label>
            <Input
              isRequired={true}
              {...register('address', {
                required: 'この項目は必須です',
              })}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="渋谷区1-1-1"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.address && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.address.message}
              </Text>
            )}
          </Box>
          <Box display="flex" flexWrap="wrap" borderBottom="1px solid #E0E0E0">
            <Label bg="white" w="164px">
              <Text textStyle="h5">建物名・部屋番号</Text>
            </Label>
            <Input
              {...register('buildingName')}
              w="auto"
              textStyle="h7"
              height="48px"
              fontSize="17px !important"
              placeholder="メゾンドパントリー"
              variant="flushed"
              bg="white"
              borderRight="unset"
              borderLeft="unset"
              borderBottom="unset"
              css={{
                boxShadow: 'unset !important',
                border: 'unset !important',
              }}
            />
            {errors.buildingName && (
              <Text mb="10px" ml="40px" color="#FF4C6C">
                {errors.buildingName.message}
              </Text>
            )}
          </Box>
        </Box>
        <Box py="40px" px="32px">
          <NormalButton w="full" type="submit" isLoading={isLoading}>
            確定する
          </NormalButton>
        </Box>
      </form>
    </Box>
  );
};
