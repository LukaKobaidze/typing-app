import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { httpClearHistory } from '@/api/profile';
import useForm from '@/hooks/useForm';
import { IconPassword } from '@/assets/image';
import InputField from '@/components/UI/InputField';
import FormWrapper from './FormWrapper';
import styles from './ClearHistory.module.scss';

interface Props {
  onGoBack: () => void;
}

export default function ClearHistory({ onGoBack }: Props) {
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
      validateEmpty();

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
      <FormWrapper
        onSubmit={handleFormSubmit}
        errorMessage={error?.message}
        submitLoading={loading}
      >
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
      </FormWrapper>
    </>
  );
}
