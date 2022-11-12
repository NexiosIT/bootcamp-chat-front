import React, { ReactNode } from "react";
import { Card, CardHeader, Typography } from "@mui/material";
import styles from "./ChatMessage.module.css";

interface IChatMessageProps {
	children: ReactNode;
  showName?: boolean;
}

export const ChatMessage = ({ children, showName = true }: IChatMessageProps) => {
	return (
		<Card className={styles.chatMessageCard}>
			{showName && <Typography variant="h6" component="div">
				Name
			</Typography>}
			{children}
		</Card>
	);
};
