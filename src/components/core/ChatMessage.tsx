import React, { ReactNode } from "react";
import { Card, CardHeader, Typography } from "@mui/material";
import styles from "./ChatMessage.module.css";

interface IChatMessageProps {
	children: ReactNode;
	showTitle?: boolean;
	title: ReactNode;
  alignContent?: "start" | "end"
}

export const ChatMessage = ({ children, showTitle = true, title, alignContent = "start" }: IChatMessageProps) => {
	return (
		<Card className={styles.chatMessageCard}>
			{showTitle && (
				<Typography variant="subtitle2" component="div" style={{marginBottom: "5px"}}>
					{title}
				</Typography>
			)}
			<Typography variant="body2" textAlign={alignContent} fontSize={14}>{children}</Typography>
		</Card>
	);
};
