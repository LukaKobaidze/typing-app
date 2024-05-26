import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { httpLogIn } from '@/api/auth';
import { IconEmail, IconPassword, IconUsername } from '@/assets/image';
import useForm from '@/hooks/useForm';
import { ButtonRounded } from '@/components/UI';
import InputField from '@/components/UI/InputField';
import styles from './LogIn.module.scss';

const logInAbortController = new AbortController();

export default function LogIn() {
  const { onLoadProfileData } = useContext(ProfileContext);
  const { fields, error, setError, onFieldChange, validateEmpty } = useForm([
    'username',
    'email',
    'password',
  ]);
  const [logInWith, setLogInWith] = useState<'username' | 'email'>('username');
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      validateEmpty(
        logInWith === 'username' ? ['username', 'password'] : ['email', 'password']
      );
    } catch (err) {
      return setSubmitLoading(false);
    }

    httpLogIn(
      logInWith === 'email'
        ? { logInWith: 'email', email: fields.email, password: fields.password }
        : {
            logInWith: 'username',
            username: fields.username,
            password: fields.password,
          },
      logInAbortController
    )
      .then(() => {
        onLoadProfileData();
      })
      .catch((err) => {
        const parsedError = JSON.parse(err.message);

        if (parsedError?.message) {
          setError({
            message: parsedError.message,
            field: parsedError.field,
          });
        }
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    setError(null);
  }, [logInWith]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {logInWith === 'username' ? (
        <InputField
          type="text"
          Icon={IconUsername}
          placeholder="username"
          value={fields.username}
          onChange={(e) => onFieldChange(e, 'username')}
          error={error?.field === 'username'}
          classNameContainer={styles.input}
        />
      ) : (
        <InputField
          type="email"
          Icon={IconEmail}
          placeholder="email"
          value={fields.email}
          onChange={(e) => onFieldChange(e, 'email')}
          error={error?.field === 'email'}
          classNameContainer={styles.input}
        />
      )}
      <InputField
        type="password"
        Icon={IconPassword}
        placeholder="password"
        value={fields.password}
        onChange={(e) => onFieldChange(e, 'password')}
        error={error?.field === 'password'}
        classNameContainer={styles.input}
      />
      <div className={styles.errorContainer}>{error && <p>{error.message}</p>}</div>

      <ButtonRounded type="submit" variant="2" loading={submitLoading}>
        Log In
      </ButtonRounded>
      <div className={styles.forgot}>
        <p className={styles.forgotText}>
          Forgot your {logInWith === 'username' ? 'username' : 'email'}? Log in with
        </p>
        <button
          type="button"
          className={styles.forgotButton}
          onClick={() =>
            setLogInWith((state) => (state === 'username' ? 'email' : 'username'))
          }
        >
          {logInWith === 'email' ? (
            <>
              <IconUsername className={styles.forgotButtonIcon} />
              <span>username</span>
            </>
          ) : (
            <>
              <IconEmail className={styles.forgotButtonIcon} />
              <span>email</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
