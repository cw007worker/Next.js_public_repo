import { Box, Text, SimpleGrid, chakra } from '@chakra-ui/react';
import { BoxProps } from '@material-ui/core';
import { periodHumanReadable } from 'utils/calender';

type Recurring = 'month' | 'year';

type Props = {
  planName: string;
  price: number;
  discountPrice: number;
  recurring: Recurring;
};

export const PlanBox: React.FC<Props> = ({ planName, price, discountPrice, recurring }) => {
  return (
    <Box height={55} px="3" py="1" bg="primary.100" rounded="md">
      {discountPrice ? (
        <SimpleGrid columns={2}>
          <Box>
            <Text fontSize="12px" color="text.300">
              {planName}
            </Text>
            <Text fontSize="16px" fontWeight="bold">
              <chakra.span fontSize="20px" fontWeight="bold">
                ￥{price - discountPrice}
              </chakra.span>
              /{periodHumanReadable(recurring)}
            </Text>
          </Box>
          <Box>
            <Text fontSize="12px" color="text.300">
                {planName}
            </Text>
            <Text fontSize="16px" fontWeight="bold">
              <chakra.span fontSize="20px" fontWeight="bold">
                ￥{price}
              </chakra.span>
              /翌{periodHumanReadable(recurring)}以降
            </Text>
          </Box>
        </SimpleGrid>
      ) : (
        <Box>
          <Text fontSize="12px" color="text.300">
            {planName}
          </Text>
          <Text>
            <chakra.span fontSize="20px" fontWeight="bold">
              ￥{price}
            </chakra.span>
            /{periodHumanReadable(recurring)}
          </Text>
        </Box>
      )}
    </Box>
  );
};
