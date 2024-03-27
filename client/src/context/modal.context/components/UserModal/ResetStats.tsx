import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { httpResetStats } from '@/api/profile';
import { IconPassword } from '@/assets/image';
import useForm from '@/hooks/useForm';
import InputField from '@/components/UI/InputField';
import FormWrapper from './FormWrapper';
import styles from './ResetStats.module.scss';

interface Props {
  onGoBack: () => void;
}

export default function ResetStats({ onGoBack }: Props) {
  const { onResetStats } = useContext(ProfileContext);
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

      httpResetStats(fields.password)
        .then(() => {
          onResetStats();
          onGoBack();
        })
        .catch((err) => {
          const parsedError = JSON.parse(err.message);

          if (parsedError && parsedError.message) {
            setError({ field: 'password', message: parsedError.message });
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
        This action CANNOT be undone. This will reset all of your stats.
      </p>
      <FormWrapper
        onSubmit={handleFormSubmit}
        errorMessage={error?.message}
        submitLoading={loading}
      >
        <InputField
          Icon={IconPassword}
          placeholder="Password"
          type="password"
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
