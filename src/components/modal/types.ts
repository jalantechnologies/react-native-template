export type ModalSize = 'small' | 'medium' | 'large';

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  size?: ModalSize;
  children?: React.ReactNode;
}

export interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export interface ModalBodyProps {
  children: React.ReactNode;
}

export interface ModalFooterProps {
  children: React.ReactNode;
}

export interface ConfirmationModalProps extends ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}
