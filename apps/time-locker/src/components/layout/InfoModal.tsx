import Modal from "@/components/ui/modal/Modal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InfoModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal title="Contact Information" isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4">Info Modal Content</div>
    </Modal>
  );
};

export default InfoModal;
