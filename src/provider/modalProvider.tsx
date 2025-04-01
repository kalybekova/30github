"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import scss from "./ModalProvider.module.scss";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal должен использоваться внутри ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <div className={scss.modaal}>
        <main>{children}</main>
        {modalContent &&
          ReactDOM.createPortal(
            <div className={scss.overlay} onClick={closeModal}>
              <div className={scss.modal} onClick={(e) => e.stopPropagation()}>
                {modalContent}
                <button className={scss.closeButton} onClick={closeModal}>
                  ✖
                </button>
              </div>
            </div>,
            document.body
          )}
      </div>
    </ModalContext.Provider>
  );
};
