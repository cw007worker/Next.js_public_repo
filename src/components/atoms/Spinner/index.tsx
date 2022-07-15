import { Spinner as _Spinner, SpinnerProps } from '@chakra-ui/react';

export const Spinner = (props: SpinnerProps) => {
  return (
    <_Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      {...props}
    />
  );
};
