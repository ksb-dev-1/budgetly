/* eslint-disable jsx-a11y/click-events-have-key-events */
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="modal-backdrop"
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClose();
        }
      }}
    >
      <div className="modal" role="document">
        <button
          className="modal-close-button"
          onClick={(event) => event.stopPropagation()}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
