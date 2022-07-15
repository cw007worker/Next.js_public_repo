import { useForm } from 'react-hook-form';
import { useEmailForm } from 'hooks/useEmailForm';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';
import RightVectorWhite from '../../../static/RightVectorWhite.png';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '10px',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#FFFFFF',
      padding: '24px 15px 27px',
      maxWidth: '560px',
      margin: '0 auto',
    },
    form: {
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
    },
    shortFrom: {
      flexFlow: 'column',
      alignItems: 'center',
    },
    inputWrapper: {
      marginBottom: '16px',
      width: '100%',
      flex: 1,
    },
    input: {
      backgroundColor: '#ECECEC',
      borderRadius: '6px',
      padding: '19px 22px',
      fontSize: '16px',
      width: '100%',
    },
    button: {
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '64px',
      padding: '0 25px',
      background: 'linear-gradient(180deg, #FFCE51 0%, #DDAA00 100%)',
      borderRadius: '64px',
      color: '#000000',
      width: '100%',
      maxWidth: 310,
      filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
      position: 'relative',
      [theme.breakpoints.down(375)]: {
        fontSize: '16px',
        lineHeight: '56px',
      },
      [theme.breakpoints.down(360)]: {
        fontSize: '14px',
      },
    },
    shortButton: {
      marginLeft: '24px',
      width: 200,
      height: 56,
    },
    vector: {
      position: 'absolute',
      right: 24,
      top: '50%',
      transform: 'translateY(-50%)',
    },
    error: {
      color: '#FF5555',
    },
  })
);
type Props = {
  isShort?: boolean;
  buttonText: string;
  onFocus: () => void;
  onBlur: () => void;
  onClick: (data: { email: string }, event: any) => void;
  text?: React.ReactNode;
};
const EmailFormCard: React.FC<Props> = ({
  isShort = false,
  buttonText,
  onFocus,
  onBlur,
  onClick,
  text,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={classes.root}>
      {text}
      <form
        onSubmit={handleSubmit(onClick)}
        className={clsx(classes.form, isShort && classes.shortFrom)}
      >
        <div className={classes.inputWrapper}>
          <input
            {...register('email', {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
            className={classes.input}
            type="text"
            placeholder="メールアドレスを入力"
            id="emailInput"
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {/* TODO: validation errorにスタイルを当てる */}
          {errors?.email?.type === 'required' && (
            <span className={classes.error}>
              メールアドレスを入力してください
            </span>
          )}
          {errors?.email?.type === 'pattern' && (
            <span className={classes.error}>
              有効なメールアドレスを入力してください
            </span>
          )}
        </div>
        <button type="submit" className={classes.button}>
          {buttonText}
          <div className={classes.vector}>
            <Image
              src={RightVectorWhite}
              alt="RightVectorWhite"
              height={12.39}
              width={7.41}
            />
          </div>
        </button>
      </form>
    </div>
  );
};

export default EmailFormCard;
