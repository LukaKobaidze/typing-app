import { useContext, useState } from 'react';
import { ProfileContext } from '@/context/profile.context';
import { data } from '@/data';
import { IconCustomize } from '@/assets/image';
import { Switch, Tooltip, ButtonRounded } from '@/components/UI';
import Modal from '@/components/UI/Modal';
import caretCSS from '@/styles/Typing/Caret.module.scss';
import styles from './CustomizeModal.module.scss';

interface Props {
  onClose: () => void;
}

const FONT_SIZE_MIN = 16;
const FONT_SIZE_MAX = 50;
const INPUT_WIDTH_MIN = 50;
const INPUT_WIDTH_MAX = 100;

export default function CustomizeModal(props: Props) {
  const { onClose } = props;

  const {
    profile,
    onCustomizeUpdateState,
    onCustomizeToggleState,
    onCustomizeResetState,
    onCustomizeUpdateServer,
  } = useContext(ProfileContext);

  const [activeTooltip, setActiveTooltip] = useState<
    'fontSize' | 'inputWidth' | null
  >(null);

  const {
    liveWpm,
    liveAccuracy,
    inputWidth,
    fontSize,
    caretStyle,
    smoothCaret,
    soundOnClick,
    theme,
  } = profile.customize;

  const handleClose = () => {
    onClose();
    onCustomizeUpdateServer();
  };

  return (
    <Modal
      onClose={handleClose}
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
              onToggle={() => onCustomizeToggleState('liveWpm')}
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
              onToggle={() => onCustomizeToggleState('liveAccuracy')}
              className={styles.switch}
            />
          </Tooltip>
        </div>
        <div
          className={styles.setting}
          onMouseEnter={() => setActiveTooltip('fontSize')}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <label htmlFor="font-size" className={`${styles.label} ${styles.active}`}>
            Font Size
          </label>

          <div className={styles.range}>
            <input
              type="range"
              id="font-size"
              min={FONT_SIZE_MIN}
              value={fontSize}
              max={FONT_SIZE_MAX}
              onChange={(e) =>
                onCustomizeUpdateState({ fontSize: Number(e.target.value) })
              }
              onFocus={() => setActiveTooltip('fontSize')}
              onBlur={() => setActiveTooltip(null)}
              onTouchStart={() => setActiveTooltip('fontSize')}
              onTouchEnd={() => setActiveTooltip(null)}
              className={styles.rangeInput}
            />
            <div className={styles.rangeTooltipContainer}>
              <div className={styles.rangeTooltipRelative}>
                <Tooltip
                  text={fontSize + 'px'}
                  className={styles.rangeTooltip}
                  style={{
                    left:
                      ((fontSize - FONT_SIZE_MIN) /
                        (FONT_SIZE_MAX - FONT_SIZE_MIN)) *
                        100 +
                      '%',
                  }}
                  position="top"
                  show={activeTooltip === 'fontSize'}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.setting}
          onMouseEnter={() => setActiveTooltip('inputWidth')}
          onMouseLeave={() => setActiveTooltip(null)}
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
              min={INPUT_WIDTH_MIN}
              value={inputWidth}
              max={INPUT_WIDTH_MAX}
              onChange={(e) =>
                onCustomizeUpdateState({ inputWidth: Number(e.target.value) })
              }
              onFocus={() => setActiveTooltip('inputWidth')}
              onBlur={() => setActiveTooltip(null)}
              onTouchStart={() => setActiveTooltip('inputWidth')}
              onTouchEnd={() => setActiveTooltip(null)}
              className={styles.rangeInput}
            />
            <div className={styles.rangeTooltipContainer}>
              <div className={styles.rangeTooltipRelative}>
                <Tooltip
                  text={inputWidth + '%'}
                  className={styles.rangeTooltip}
                  style={{
                    left:
                      ((inputWidth - INPUT_WIDTH_MIN) /
                        (INPUT_WIDTH_MAX - INPUT_WIDTH_MIN)) *
                        100 +
                      '%',
                  }}
                  position="top"
                  show={activeTooltip === 'inputWidth'}
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
                  onClick={() => onCustomizeUpdateState({ caretStyle: caret })}
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
              onToggle={() => onCustomizeToggleState('smoothCaret')}
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
              onToggle={() => onCustomizeToggleState('soundOnClick')}
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
                onClick={() => onCustomizeUpdateState({ theme: mapTheme })}
                key={mapTheme}
              >
                {mapTheme}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ButtonRounded
        onClick={() => onCustomizeResetState()}
        variant="2"
        className={styles.buttonResetToDefault}
      >
        Reset to Default
      </ButtonRounded>
    </Modal>
  );
}
