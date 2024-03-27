import { useState } from 'react';
import { httpChangePassword } from '@/api/auth';
import { IconPassword } from '@/assets/image';
import useForm from '@/hooks/useForm';
import InputField from '@/components/UI/InputField';
import FormWrapper from './FormWrapper';
import styles from './ChangePassword.module.scss';

interface Props {
  onGoBack: () => void;
}

export default function ChangePassword({ onGoBack }: Props) {
  const { fields, error, onFieldChange, validateEmpty, setError } = useForm([
    'oldPassword',
    'newPassword',
    'repeatNewPassword',
  ]);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      validateEmpty();

      if (fields.newPassword !== fields.repeatNewPassword) {
        return setError({
          field: 'repeatNewPassword',
          message: 'Passwords do not match.',
        });
      }

      httpChangePassword(fields.oldPassword, fields.newPassword)
        .then(() => {
          onGoBack();
        })
        .catch((err) => {
          const parsedError = JSON.parse(err.message);

          if (parsedError?.message) {
            setError({ message: parsedError.message, field: parsedError.field });
          }
        });
    } catch (err) {
      return;
    }
  };

  return (
    <FormWrapper onSubmit={handleFormSubmit} errorMessage={error?.message}>
      <InputField
        Icon={IconPassword}
        placeholder="Old password"
        type="password"
        value={fields.oldPassword}
        error={error?.field === 'oldPassword'}
        showPassword={{
          bool: showOldPassword,
          onToggle: () => setShowOldPassword((state) => !state),
        }}
        onChange={(e) => onFieldChange(e, 'oldPassword')}
        classNameContainer={styles.oldPassword}
      />
      <InputField
        Icon={IconPassword}
        placeholder="New password"
        type="password"
        value={fields.newPassword}
        error={error?.field === 'newPassword'}
        showPassword={{
          bool: showNewPassword,
          onToggle: () => setShowNewPassword((state) => !state),
        }}
        onChange={(e) => onFieldChange(e, 'newPassword')}
      />
      <InputField
        Icon={IconPassword}
        placeholder="Repeat new password"
        type={showNewPassword ? 'text' : 'password'}
        value={fields.repeatNewPassword}
        error={error?.field === 'repeatNewPassword'}
        onChange={(e) => onFieldChange(e, 'repeatNewPassword')}
      />
    </FormWrapper>
  );
}
