import { VFC, memo } from 'react';
import { HookState } from 'hooks/pages/onboarding/useRegisterPage';
import { WithPassword } from './WithPassword';
import { WithPasswordAndEmail } from './WithPasswordAndEmail';

const Component: VFC<HookState> = (props) => {
  return <WithPasswordAndEmail {...props.registerWithPasswordAndEmailState} />;
};

export const RegisterTemplate = memo(Component);
