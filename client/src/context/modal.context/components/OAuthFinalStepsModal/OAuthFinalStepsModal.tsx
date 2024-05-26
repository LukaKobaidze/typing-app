import Modal from '@/components/UI/Modal';
import styles from './OAuthFinalStepsModal.module.scss';
import InputField from '@/components/UI/InputField';
import { IconUsername } from '@/assets/image';
import SubmitForm from '@/components/UI/SubmitForm';
import { httpOauthFinalSteps } from '@/api/auth';
import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import useForm from '@/hooks/useForm';

export type OauthFinalStepsModalOptions = {
  platform: 'GitHub' | 'Google';
};

interface Props {
  options: OauthFinalStepsModalOptions;
  onClose: () => void;
}

export default function OAuthFinalStepsModal(props: Props) {
  const { options, onClose } = props;

  const { onOauthFinalStepsComplete } = useContext(ProfileContext);
  const { fields, error, onFieldChange, validateEmpty, setError } = useForm([
    'username',
  ]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      validateEmpty();

      httpOauthFinalSteps(options.platform, fields.username)
        .then((data) => {
          if (data.username) {
            onOauthFinalStepsComplete(data.username);
          }
        })
        .catch((err) => {
          const parsedError = JSON.parse(err.message);

          if (parsedError?.message) {
            setError({ message: parsedError.message, field: parsedError.field });
          }
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } catch (err) {
      setSubmitLoading(false);
    }
  };

  return (
    <Modal
      heading={options.platform}
      onClose={onClose}
      ignoreOutsideClick
      className={styles.modal}
    >
      <p className={styles.paragraph}>
        Enter your username to complete authorization with {options.platform}.
      </p>
      <SubmitForm
        className={styles.form}
        errorMessage={error?.message}
        onSubmit={handleFormSubmit}
        submitLoading={submitLoading}
      >
        <InputField
          Icon={IconUsername}
          placeholder="Username"
          value={fields.username}
          onChange={(e) => onFieldChange(e, 'username')}
          error={error?.field === 'username'}
          autoFocus
        />
      </SubmitForm>
    </Modal>
  );
}
