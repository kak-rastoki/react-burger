import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay.jsx';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals');

export function Modal({ children, title, onClose }) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // анимация при монтировании модалочки
    const timeoutId = setTimeout(() => setIsOpened(true), 10);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // закрытие по нажтию ESC
    const handleExit = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleExit);

    return () => document.removeEventListener('keydown', handleExit);
  }, [onClose]);

  const handleClose = () => {
    setIsOpened(false);
    setTimeout(onClose, 600);
  };

  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${isOpened ? styles.modalOpened : ''}`}>
      <ModalOverlay onClose={handleClose} isOpened={isOpened} />

      <div
        className={`${styles.content}  ${isOpened ? styles.contentOpened : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
