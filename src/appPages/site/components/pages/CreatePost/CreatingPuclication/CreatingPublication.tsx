"use client";
import s from "./CreatingPublication.module.scss";
import { IoMdImages } from "react-icons/io";
import ReactDOM from "react-dom";
import { useModal } from "@/provider/modalProvider";

const CreatingPublication = () => {
  const { openModal } = useModal();

  return ReactDOM.createPortal(
    <section className={s.modal}>
      <div className={s.block}>
        <h3>
          Creating a publication <hr />
        </h3>
        <div className={s.content}>
          <span>
            <IoMdImages />
          </span>
          <h2>Drag and drop photos and videos here</h2>
          <button>Choice on computer</button>
        </div>
      </div>
    </section>,
    document.body
  );
};

export default CreatingPublication;
