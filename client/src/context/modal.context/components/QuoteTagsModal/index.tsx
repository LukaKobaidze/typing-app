import { IconTags } from '@/assets/image';
import Modal from '../Modal';
import styles from './QuoteTagsModal.module.scss';
import { useContext } from 'react';
import { TypemodeContext } from '@/context/typemode.context';
import { ButtonRounded } from '@/components/UI';

interface Props {
  onClose: () => void;
}

export default function QuoteTagsModal(props: Props) {
  const { onClose } = props;

  const {
    quoteTags,
    quoteTagsMode,
    onToggleQuoteTag,
    onUpdateQuoteTagsMode,
    onClearSelectedQuoteTags,
  } = useContext(TypemodeContext);

  const onQuoteSelectionChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const checkbox = e.target as unknown as HTMLInputElement;

    onToggleQuoteTag(Number(checkbox.value));
  };

  return (
    <Modal HeadingIcon={IconTags} heading="Quote Tags" onClose={onClose}>
      <div className={styles.modeContainer}>
        <ButtonRounded
          variant="2"
          className={`${styles.modeContainerButton} ${styles.modeContainerButtonFirst}`}
          active={quoteTagsMode === 'all'}
          onClick={() => onUpdateQuoteTagsMode('all')}
        >
          All
        </ButtonRounded>
        <ButtonRounded
          variant="2"
          className={`${styles.modeContainerButton} ${styles.modeContainerButtonSecond}`}
          active={quoteTagsMode === 'only selected'}
          onClick={() => onUpdateQuoteTagsMode('only selected')}
        >
          Only Selected
        </ButtonRounded>
      </div>

      <form
        className={`${styles.quoteTagsForm} ${
          quoteTagsMode === 'all' ? styles.disabled : ''
        }`}
        onChange={onQuoteSelectionChange}
      >
        <span className={`${styles.label} ${styles.active}`}>Tags</span>
        <div className={styles.quoteTagsContainer}>
          {quoteTags.map((tag, index) => (
            <label
              className={`${styles.quoteTag} ${
                tag.isSelected ? styles.checked : ''
              }`}
              key={tag.name}
            >
              <input
                type="checkbox"
                checked={tag.isSelected}
                value={index}
                className={styles.quoteTagCheckbox}
              />
              {tag.name}
            </label>
          ))}
        </div>

        <ButtonRounded
          variant="2"
          className={styles.buttonClearTags}
          onClick={() => onClearSelectedQuoteTags()}
          type="button"
        >
          Clear tags
        </ButtonRounded>
      </form>
    </Modal>
  );
}
