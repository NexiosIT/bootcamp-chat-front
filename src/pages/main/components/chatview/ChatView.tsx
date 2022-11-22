import React from "react";
import { ChatHistory, ChatInput, ChatViewHeader } from "../../../../components";
import { useAppContext } from "../../../../contexts/AppContext";
import styles from "./ChatView.module.css";

interface IChatViewProps {

}

export const ChatView = ({}: IChatViewProps) => {

  const { selectedChatroom, getMessagesForRoom } = useAppContext();

  return (
    <div className={styles.chatViewContainer}>
      <ChatViewHeader selectedChat={selectedChatroom} />
      <ChatHistory messages={getMessagesForRoom(selectedChatroom?.id)}/>
      <ChatInput />
    </div>
  )
}