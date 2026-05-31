import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import type React from 'react';

import styles from './modal.module.css';

type TModalProps = {
  children: ReactNode;
  title?: string;
  onClose: () => void;
};

export const Modal = ({
  children,
  title,
  onClose,
}: TModalProps): ReactElement | null => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const modalRoot = document.getElementById('modals');

  useEffect((): (() => void) => {
    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(
      (): void => setIsOpened(true),
      10
    );
    return (): void => clearTimeout(timeoutId);
  }, []);

  useEffect((): (() => void) => {
    const handleExit = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleExit);
    return (): void => document.removeEventListener('keydown', handleExit);
  }, [onClose]);

  const handleClose = (): void => {
    setIsOpened(false);
    setTimeout(onClose, 600);
  };

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${isOpened ? styles.modalOpened : ''}`}>
      <ModalOverlay onClose={handleClose} isOpened={isOpened} />

      <div
        className={`${styles.content} ${isOpened ? styles.contentOpened : ''}`}
        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
