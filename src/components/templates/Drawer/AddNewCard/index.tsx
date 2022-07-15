import { FC, useEffect } from 'react';
import { Text, Box } from '@chakra-ui/react';
import { CardElement } from '@stripe/react-stripe-js';
import NormalButton from 'components/atoms/NormalButton';

export type Props = {
  handleAddNewCard: () => void;
  isLoading: boolean;
};

export const AddNewCardTemplate: FC<Props> = ({
  handleAddNewCard,
  isLoading,
}) => {
  return (
    <Box pt="5" pb="11" px="5" maxWidth="xl" mx="auto" bg="#FAFAFA" h="full">
      <Text textStyle="h5" mb="5">
        クレジットまたはデビットカードを追加
      </Text>
      <Box mb="5">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '17px',
              },
            },
          }}
        />
      </Box>
      <Box>
        <NormalButton w="full" isLoading={isLoading} onClick={handleAddNewCard}>
          追加する
        </NormalButton>
      </Box>
    </Box>
  );
};
