import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClose, isOpened }) => {
  return (
    <div
      className={`${styles.overlay} ${isOpened ? styles.overlayOpened : ''}`}
      onClick={onClose}
    ></div>
  );
};
