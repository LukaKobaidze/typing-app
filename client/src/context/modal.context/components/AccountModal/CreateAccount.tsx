import { useContext, useState } from 'react';
import {
  IconCustomize,
  IconEmail,
  IconHistory,
  IconPassword,
  IconStats,
  IconUsername,
} from '@/assets/image';
import { ProfileContext } from '@/context/profile.context';
import { httpCreateAccount } from '@/api/auth';
import useForm from '@/hooks/useForm';
import InputField from '@/components/UI/InputField';
import { ButtonRounded } from '@/components/UI';
import styles from './CreateAccount.module.scss';

const fieldsArr = ['username', 'email', 'password', 'repeatPassword'];

const createAccountAbortController = new AbortController();

export default function CreateAccount() {
  const { fields, error, setError, onFieldChange, validateEmpty } =
    useForm(fieldsArr);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { onUpdateUsername } = useContext(ProfileContext);

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

    httpCreateAccount(
      fields.username,
      fields.email,
      fields.password,
      createAccountAbortController
    )
      .then((data) => {
        onUpdateUsername(data.username);
      })
      .catch((err) => {
        const parsedError = JSON.parse(err.message);

        if (parsedError && parsedError.message) {
          setError({ message: parsedError.message, field: parsedError.field });
        }
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <InputField
        classNameContainer={styles.inputContainer}
        Icon={IconUsername}
        placeholder="username"
        error={error?.field === 'username'}
        value={fields.username}
        onChange={(e) => onFieldChange(e, 'username')}
      />
      <InputField
        classNameContainer={styles.inputContainer}
        Icon={IconEmail}
        type="email"
        placeholder="email"
        value={fields.email}
        onChange={(e) => onFieldChange(e, 'email')}
        error={error?.field === 'email'}
      />
      <InputField
        classNameContainer={styles.inputContainer}
        className={styles.inputPassword}
        Icon={IconPassword}
        type="password"
        placeholder="password"
        value={fields.password}
        onChange={(e) => onFieldChange(e, 'password')}
        error={error?.field === 'password'}
        showPassword={{
          bool: isPasswordVisible,
          onToggle: () => setIsPasswordVisible((state) => !state),
        }}
      />
      <InputField
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
      <ul className={styles.benefits}>
        <li className={styles.benefitsItem}>
          <IconStats className={styles.benefitsItemIcon} />
          <span>Personal Stats.</span>
        </li>
        <li className={styles.benefitsItem}>
          <IconHistory className={styles.benefitsItemIcon} />
          <span>Previous results (History).</span>
        </li>
        <li className={styles.benefitsItem}>
          <IconCustomize className={styles.benefitsItemIcon} />
          <span>Customizations saved to the account.</span>
        </li>
      </ul>
    </form>
  );
}
