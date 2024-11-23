export default function ModalWindow({onClose, isOpen, children}: any)
{
    if (!isOpen) return null; // Do not render if modal is not open

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
        </div>
    );
}