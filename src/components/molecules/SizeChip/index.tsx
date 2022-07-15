import { SizeButton } from 'components/atoms/SizeButton';
import { Box, BoxProps, Text } from '@chakra-ui/react';

type Props = {
  size: {
    name: string;
    totalStock: number;
    disabled: boolean;
    selected: boolean;
  };
} & BoxProps;

export const SizeChip = ({ size, ...rest }: Props) => {
  return (
    <Box {...rest}>
      <SizeButton
        disabled={size.disabled}
        variant={size.selected ? 'selected' : 'none'}
        marginBottom="4px"
      >
        {size.name}
      </SizeButton>
      {size.totalStock <= 0 && (
        <Text fontSize="10px" textAlign="center">
          在庫なし
        </Text>
      )}
    </Box>
  );
};
