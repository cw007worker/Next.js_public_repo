import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export type HookState = {
  formValue: FormValue;
  handleSubmit: (event: any) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isFocus: boolean;
  onChangeFocus: () => void;
};

type FormValue = { keyword: string | undefined };
type Props = { defaultKeyword: string | undefined };

export const useSearchForm = (props: Props) => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<FormValue>({
    keyword: props.defaultKeyword,
  });
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      const { keyword } = formValue;
      console.log(keyword);
      if (!keyword) return;
      console.log(encodeURI(keyword));

      router.push({
        pathname: '/search',
        query: { keyword: encodeURI(keyword) },
      });
    },
    [formValue]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const newFormValues = {
      ...formValue,
      keyword: target.value,
    };
    console.log(newFormValues);
    setFormValue(newFormValues);
  };

  const onChangeFocus = () => setIsFocus(!isFocus);

  return {
    formValue,
    handleSubmit,
    handleChange,
    onChangeFocus,
    isFocus,
  };
};
