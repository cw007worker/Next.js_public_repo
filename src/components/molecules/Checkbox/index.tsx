import {
  Checkbox as _Checkbox,
  Box,
  Text,
  CheckboxProps,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { Control, FieldValues } from 'react-hook-form';

type Props = {
  text: string;
  errorMessage?: string;
  CheckboxProps: any;
};

export const Checkbox: React.FC<Props> = ({ text, CheckboxProps }) => {
  return (
    <Fragment>
      <_Checkbox {...CheckboxProps}>{text}</_Checkbox>
    </Fragment>
  );
};
