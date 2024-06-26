import InputField from '@/components/UI/InputField';
import { IconPassword, IconUsername } from '@/assets/image';
import useForm from '@/hooks/useForm';
import { httpChangeUsername } from '@/api/auth';
import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import SubmitForm from '@/components/UI/SubmitForm';

interface Props {
  onGoBack: () => void;
  passwordRequired: boolean;
}

export default function ChangeUsername({ onGoBack, passwordRequired }: Props) {
  const { onUpdateUsername } = useContext(ProfileContext);

  const { fields, error, onFieldChange, validateEmpty, setError } = useForm([
    'newUsername',
    'password',
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (passwordRequired) {
        validateEmpty();
      } else {
        validateEmpty(['newUsername']);
      }

      setLoading(true);

      httpChangeUsername(fields.newUsername, fields.password)
        .then((data) => {
          onUpdateUsername(data.username);
          onGoBack();
        })
        .catch((err) => {
          const parsedError = JSON.parse(err.message);

          if (parsedError && parsedError.message) {
            setError({ message: parsedError.message, field: parsedError.field });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      return;
    }
  };

  return (
    <SubmitForm
      onSubmit={handleFormSubmit}
      errorMessage={error?.message}
      submitLoading={loading}
    >
      <InputField
        Icon={IconUsername}
        placeholder="New username"
        value={fields.newUsername}
        error={error?.field === 'newUsername'}
        onChange={(e) => onFieldChange(e, 'newUsername')}
      />

      {passwordRequired && (
        <InputField
          Icon={IconPassword}
          placeholder="Confirm password"
          type={'password'}
          value={fields.password}
          error={error?.field === 'password'}
          showPassword={{
            bool: showPassword,
            onToggle: () => setShowPassword((state) => !state),
          }}
          onChange={(e) => onFieldChange(e, 'password')}
        />
      )}
    </SubmitForm>
  );
}
