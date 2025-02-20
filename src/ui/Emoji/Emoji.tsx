"use client";
import { useState, useEffect, useRef } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const EmojiInput = ({
  text,
  setText,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowPicker(false); // Закрываем после выбора эмодзи
  };

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        zIndex: 30,
        width: "100% ",
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "100px",
          border: "none",
          outline: "none",
        }}
      ></textarea>
      <button
        onClick={() => setShowPicker(!showPicker)}
        style={{
          marginLeft: "5px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "black",
        }}
      >
        <MdOutlineEmojiEmotions size={20} />
      </button>
      {showPicker && (
        <div
          ref={pickerRef}
          style={{
            position: "absolute",
            top: "40px",
            left: "-60px",
            height: "200px",
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiInput;
