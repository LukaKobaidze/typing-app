import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { httpClearHistory } from '@/api/profile';
import useForm from '@/hooks/useForm';
import { IconPassword } from '@/assets/image';
import InputField from '@/components/UI/InputField';
import styles from './ClearHistory.module.scss';
import SubmitForm from '@/components/UI/SubmitForm';

interface Props {
  onGoBack: () => void;
  passwordRequired: boolean;
}

export default function ClearHistory({ onGoBack, passwordRequired }: Props) {
  const { onClearHistory } = useContext(ProfileContext);
  const { fields, error, onFieldChange, validateEmpty, setError } = useForm([
    'password',
  ]);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (passwordRequired) {
        validateEmpty();
      }

      httpClearHistory(fields.password)
        .then(() => {
          onClearHistory();
          onGoBack();
        })
        .catch((err) => {
          const parsedError = JSON.parse(err.message);

          if (parsedError && parsedError.message) {
            setError({ message: parsedError.message, field: 'password' });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <p className={styles.warningMessage}>
        This action CANNOT be undone. This will clear the history completely.
      </p>

      <SubmitForm
        onSubmit={handleFormSubmit}
        errorMessage={error?.message}
        submitLoading={loading}
      >
        {passwordRequired && (
          <InputField
            Icon={IconPassword}
            type="password"
            placeholder="Password"
            value={fields.password}
            error={error?.field === 'password'}
            onChange={(e) => onFieldChange(e, 'password')}
            showPassword={{
              bool: showPassword,
              onToggle: () => setShowPassword((state) => !state),
            }}
          />
        )}
      </SubmitForm>
    </>
  );
}
