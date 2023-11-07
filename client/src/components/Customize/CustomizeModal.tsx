import { useContext, useState } from 'react';
import { CustomizeContext } from '@/context/customize.context';
import { IconCustomize } from '@/assets/image';
import { data } from '@/data';
import { Switch, Tooltip, Modal, ButtonRounded } from '@/components/UI';
import caretCSS from '@/styles/Typing/Caret.module.scss';
import styles from '@/styles/Customize/CustomizeModal.module.scss';

interface Props {
  onCloseModal: () => void;
}

export default function CustomizeModal(props: Props) {
  const { onCloseModal } = props;

  const {
    liveWpm,
    liveAccuracy,
    inputWidth,
    caretStyle,
    smoothCaret,
    soundOnClick,
    theme,
    onToggleLiveWpm,
    onToggleLiveAccuracy,
    onUpdateInputWidth,
    onUpdateCaretStyle,
    onToggleSmoothCaret,
    onToggleSoundOnClick,
    onResetToDefault,
    onUpdateTheme,
  } = useContext(CustomizeContext);

  const [showInputWidthTooltip, setShowInputWidthTooltip] = useState(false);

  return (
    <Modal
      onCloseModal={onCloseModal}
      heading="Customize"
      HeadingIcon={IconCustomize}
      className={styles.modal}
    >
      <div className={styles.customizationsWrapper}>
        <div className={styles.setting}>
          <label
            htmlFor="live-wpm"
            className={`${styles.label} ${liveWpm ? styles.active : ''}`}
          >
            Live WPM
          </label>
          <Tooltip text={liveWpm ? 'on' : 'off'} position="right" showOnHover>
            <Switch
              id="live-wpm"
              state={liveWpm}
              onToggle={onToggleLiveWpm}
              className={styles.switch}
            />
          </Tooltip>
        </div>
        <div className={styles.setting}>
          <label
            htmlFor="live-accuracy"
            className={`${styles.label} ${liveAccuracy ? styles.active : ''}`}
          >
            Live Accuracy
          </label>
          <Tooltip text={liveAccuracy ? 'on' : 'off'} position="right" showOnHover>
            <Switch
              id="live-accuracy"
              state={liveAccuracy}
              onToggle={onToggleLiveAccuracy}
              className={styles.switch}
            />
          </Tooltip>
        </div>
        <div
          className={styles.setting}
          onMouseEnter={() => setShowInputWidthTooltip(true)}
          onMouseLeave={() => setShowInputWidthTooltip(false)}
        >
          <label
            htmlFor="input-width"
            className={`${styles.label} ${styles.active}`}
          >
            Input Width
          </label>

          <div className={styles.range}>
            <input
              type="range"
              id="input-width"
              min="50"
              value={inputWidth}
              max="100"
              onChange={(e) => onUpdateInputWidth(Number(e.target.value))}
              onFocus={() => setShowInputWidthTooltip(true)}
              onBlur={() => setShowInputWidthTooltip(false)}
              onTouchStart={() => setShowInputWidthTooltip(true)}
              onTouchEnd={() => setShowInputWidthTooltip(false)}
              className={styles.rangeInput}
            />
            <div className={styles.rangeTooltipContainer}>
              <div className={styles.rangeTooltipRelative}>
                <Tooltip
                  text={inputWidth + '%'}
                  className={styles.rangeTooltip}
                  style={{ left: (inputWidth - 50) * 2 + '%' }}
                  position="top"
                  show={showInputWidthTooltip}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.setting}>
          <label
            htmlFor="caret-style"
            className={`${styles.label} ${
              caretStyle !== 'off' ? styles.active : ''
            }`}
          >
            Caret Style
          </label>
          <div className={styles.caretStylesButtons}>
            {data.caret.map((caret) => (
              <Tooltip key={caret} text={caret} showOnHover>
                <button
                  onClick={() => onUpdateCaretStyle(caret)}
                  className={`${styles.caretStylesBtn} ${
                    caret === caretStyle ? styles.active : ''
                  }`}
                  id={caret === caretStyle ? 'caret-style' : undefined}
                >
                  <span
                    className={`${caretCSS.caret} ${caretCSS[`caret--${caret}`]} ${
                      styles.caretStylesBtnCaret
                    }`}
                  />
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
        <div className={styles.setting}>
          <label
            htmlFor="smooth-caret"
            className={`${styles.label} ${smoothCaret ? styles.active : ''}`}
          >
            Smooth Caret
          </label>
          <Tooltip text={smoothCaret ? 'on' : 'off'} position="right" showOnHover>
            <Switch
              id="smooth-caret"
              state={smoothCaret}
              onToggle={onToggleSmoothCaret}
              className={styles.switch}
            />
          </Tooltip>
        </div>
        <div className={styles.setting}>
          <label
            htmlFor="sound-on-click"
            className={`${styles.label} ${soundOnClick ? styles.active : ''}`}
          >
            Sound on Click
          </label>
          <Tooltip text={soundOnClick ? 'on' : 'off'} position="right" showOnHover>
            <Switch
              id="sound-on-click"
              state={soundOnClick}
              onToggle={onToggleSoundOnClick}
              className={styles.switch}
            />
          </Tooltip>
        </div>

        <div className={`${styles.setting} ${styles.settingTheme}`}>
          <label htmlFor="theme" className={`${styles.label} ${styles.active}`}>
            Theme
          </label>

          <div className={styles.themeButtons}>
            {data.theme.map((mapTheme) => (
              <button
                className={`${styles.themeBtn} ${styles[`themeBtn--${mapTheme}`]} ${
                  mapTheme === theme ? styles.active : ''
                }`}
                onClick={() => onUpdateTheme(mapTheme)}
                key={mapTheme}
              >
                {mapTheme}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ButtonRounded
        onClick={onResetToDefault}
        variant="2"
        className={styles.buttonResetToDefault}
      >
        Reset to Default
      </ButtonRounded>
    </Modal>
  );
}
