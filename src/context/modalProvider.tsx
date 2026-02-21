import { createContext, useContext, useState, type ReactNode } from "react";

type ModalType = "viewCard" | "addCard" | null;

interface ModalContextType {
  activeModal: ModalType;
  payload: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [payload, setPayload] = useState<any>(null);

  const openModal = (type: ModalType, data?: any) => {
    setActiveModal(type);
    setPayload(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setPayload(null);
  };

  return (
    <ModalContext.Provider
      value={{ activeModal, payload, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }
  return context;
}
