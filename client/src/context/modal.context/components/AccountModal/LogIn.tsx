import { useContext, useEffect, useState } from 'react';
import { IconEmail, IconPassword, IconUsername } from '@/assets/image';
import { ButtonRounded } from '@/components/UI';
import Input from './Input';
import styles from './LogIn.module.scss';
import useForm from './useForm';
import { logIn } from '@/api/auth';
import { ProfileContext } from '@/context/profile.context';

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

    logIn(
      logInWith === 'email'
        ? { logInWith: 'email', email: fields.email, password: fields.password }
        : {
            logInWith: 'username',
            username: fields.username,
            password: fields.password,
          },
      logInAbortController
    )
      .then((data) => {
        if (data.error) {
          setError({
            message: data.message,
            field: data.status === 404 ? logInWith : 'password',
          });
        }

        onLoadProfileData(['username', 'customize']);
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
        <Input
          type="text"
          Icon={IconUsername}
          placeholder="username"
          value={fields.username}
          onChange={(e) => onFieldChange(e, 'username')}
          error={error?.field === 'username'}
          classNameContainer={styles.input}
        />
      ) : (
        <Input
          type="email"
          Icon={IconEmail}
          placeholder="email"
          value={fields.email}
          onChange={(e) => onFieldChange(e, 'email')}
          error={error?.field === 'email'}
          classNameContainer={styles.input}
        />
      )}
      <Input
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
