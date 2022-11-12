import React from "react";
import { ChatHistory, ChatInput, ChatViewHeader } from "../../../../components";
import styles from "./ChatView.module.css";

interface IChatViewProps {

}

export const ChatView = ({}: IChatViewProps) => {
  return (
    <div className={styles.chatViewContainer}>
      <ChatViewHeader />
      <ChatHistory />
      <ChatInput />
    </div>
  )
}