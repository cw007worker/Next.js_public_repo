import { ImageButton } from 'components/atoms/ImageButton';
import { Box, BoxProps, Text } from '@chakra-ui/react';

type Props = {
  variety: {
    name: string;
    image:
      | {
          alt: string;
          url: string;
        }
      | undefined;
    totalStock: number;
    disabled: boolean;
    selected: boolean;
  };
} & BoxProps;

export const VarietyChip = ({ variety, ...rest }: Props) => {
  const image = variety.image;
  return (
    <Box
      cursor={variety.disabled ? 'not-allowed' : undefined}
      pointerEvents={variety.disabled ? 'none' : undefined}
      {...rest}
    >
      <ImageButton
        image={image}
        borderRadius="full"
        w="40px"
        marginBottom="4px"
        varient={
          variety.disabled ? 'disabled' : variety.selected ? 'selected' : 'none'
        }
      />
      {variety.totalStock <= 0 && (
        <Text fontSize="10px" textAlign="center">
          在庫なし
        </Text>
      )}
    </Box>
  );
};
