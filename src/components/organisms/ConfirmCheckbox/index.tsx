import { Checkbox, Box, Text, CheckboxProps } from '@chakra-ui/react';
import { Fragment } from 'react';
import { Control, FieldValues } from 'react-hook-form';

type Props = {
  text: string;
  errorMessage?: string;
  CheckboxProps: any;
};

export const ConfirmCheckbox: React.FC<Props> = ({
  text,
  errorMessage,
  CheckboxProps,
}) => {
  return (
    <Fragment>
      <Checkbox {...CheckboxProps}>{text}</Checkbox>
      <Box>
        <Text color="action.notification">{errorMessage}</Text>
      </Box>
    </Fragment>
  );
};
