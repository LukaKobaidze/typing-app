import Cookies from 'js-cookie';
import { ButtonRounded, Tooltip } from '@/components/UI';
import styles from './CreateAccount.module.scss';
import Input from './Input';
import {
  IconEmail,
  IconPassword,
  IconUsername,
  IconVisibilityOff,
  IconVisibilityOn,
} from '@/assets/image';
import { useContext, useEffect, useState } from 'react';
import { createAccount } from '@/api/auth';
import useForm from './useForm';
import { ProfileContext } from '@/context/profile.context';
import { httpPostCustomize } from '@/api/profile';

const fieldsArr = ['username', 'email', 'password', 'repeatPassword'];

const createAccountAbortController = new AbortController();

export default function CreateAccount() {
  const { fields, error, setError, onFieldChange, validateEmpty } =
    useForm(fieldsArr);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { onLoadProfileData } = useContext(ProfileContext);

  useEffect(() => {
    return () => {
      console.log('asd');
      createAccountAbortController.abort();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      validateEmpty();

      if (fields.password !== fields.repeatPassword) {
        setError({
          field: 'repeatPassword',
          message: 'Passwords do not match.',
        });
        throw new Error();
      }
    } catch (err: any) {
      return setSubmitLoading(false);
    }

    createAccount(
      fields.username,
      fields.email,
      fields.password,
      createAccountAbortController
    )
      .then((data) => {
        if (data.error) {
          if (data.message && data.field) {
            setError({ message: data.message, field: data.field });
            return;
          }
        }

        onLoadProfileData(['username']);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        classNameContainer={styles.inputContainer}
        Icon={IconUsername}
        placeholder="username"
        error={error?.field === 'username'}
        value={fields.username}
        onChange={(e) => onFieldChange(e, 'username')}
      />
      <Input
        classNameContainer={styles.inputContainer}
        Icon={IconEmail}
        type="email"
        placeholder="email"
        value={fields.email}
        onChange={(e) => onFieldChange(e, 'email')}
        error={error?.field === 'email'}
      />
      <Input
        classNameContainer={styles.inputContainer}
        className={styles.inputPassword}
        Icon={IconPassword}
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="password"
        value={fields.password}
        onChange={(e) => onFieldChange(e, 'password')}
        error={error?.field === 'password'}
        wrapperChildren={
          <Tooltip
            position="left"
            text={isPasswordVisible ? 'hide password' : 'show password'}
            showOnHover
            className={styles.passwordVisibility}
          >
            <button
              type="button"
              onClick={() => setIsPasswordVisible((state) => !state)}
            >
              {isPasswordVisible ? (
                <IconVisibilityOn className={styles.passwordVisibilityIcon} />
              ) : (
                <IconVisibilityOff className={styles.passwordVisibilityIcon} />
              )}
            </button>
          </Tooltip>
        }
      />
      <Input
        classNameContainer={styles.inputContainer}
        Icon={IconPassword}
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="repeat password"
        value={fields.repeatPassword}
        onChange={(e) => onFieldChange(e, 'repeatPassword')}
        error={error?.field === 'repeatPassword'}
      />
      <div className={styles.errorContainer}>{error && <p>{error.message}</p>}</div>

      <ButtonRounded type="submit" variant="2" loading={submitLoading}>
        Create Account
      </ButtonRounded>
    </form>
  );
}
