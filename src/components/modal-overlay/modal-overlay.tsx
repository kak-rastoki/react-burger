import type { ReactElement } from 'react';

import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
  isOpened: boolean;
};

export const ModalOverlay = ({
  onClose,
  isOpened,
}: TModalOverlayProps): ReactElement => {
  return (
    <div
      className={`${styles.overlay} ${isOpened ? styles.overlayOpened : ''}`}
      onClick={onClose}
    ></div>
  );
};
