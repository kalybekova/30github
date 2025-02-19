"use client";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const EmojiInput = () => {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // Добавляем эмодзи в текстовое поле
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Поле ввода */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: "8px", width: "250px" }}
      />

      {/* Кнопка для открытия эмодзи-пикера */}
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

      {/* Эмодзи-пикер */}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "0px",
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
