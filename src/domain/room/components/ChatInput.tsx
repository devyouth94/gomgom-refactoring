import React, { useState } from "react";
import FooterInput from "common/components/FooterInput";
import IconSend from "static/icons/Variety=send, Status=untab, Size=L.svg";

interface Props {
  socket: any;
  roomKey: number;
  userKey: number;
}

const ChatInput = ({ socket, roomKey, userKey }: Props) => {
  const [chatInput, setChatInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleSendMessage = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>,
  ) => {
    event.preventDefault();
    if (!chatInput.trim().length) return;

    socket.current.emit("chat_message", { message: chatInput, roomKey, userKey });
    setChatInput("");
  };

  return (
    <FooterInput>
      <form onSubmit={handleSendMessage}>
        <input value={chatInput} onChange={handleChange} placeholder="메세지를 입력하세요" />
        <img onClick={handleSendMessage} src={IconSend} alt="IconSend" />
      </form>
    </FooterInput>
  );
};

export default ChatInput;
