import React, { useState, useEffect } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField } from "@mui/material";
import { useAppContext } from "../../../../contexts/AppContext";
import styles from "./CreateChatroomModal.module.css";
import { CreateChatroomRequest } from "../../../../types";
import { CreateChatroom } from "../../../../api/Chatroom";
import { useUserContext } from "../../../../contexts";

interface ICreateChatroomModalProps {}

export const CreateChatroomModal = () => {
	const { newChatOpen, setNewChatOpen, addChatroom } = useAppContext();
	const { jwt } = useUserContext();
	const [loading, setLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string>();
	const [valid, setValid] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	// this is a hardcoded list of 2 account ids
	// TODO: Make a component that fetches users & makes a list to select from
	const [ids] = useState<string[]>(["637a3ce32665c902ebf25b29", "637a498b67dfc022d17a5bd4"]);

	useEffect(() => {
		if (!name || name === "") setValid(false);
		else setValid(true);
	}, [name]);

	const handleSubmit = async () => {
		setLoading(true);

		if (jwt) {
			const request: CreateChatroomRequest = {
				name,
				allowed_users: ids,
			};

			const response = await CreateChatroom(jwt, request);

			if (response?.isSuccess && response?.chatroom) {
				// chatroom succesfully made, add to state & close modal
				addChatroom(response.chatroom);
				setLoading(false);
				setNewChatOpen(false);
			} else {
				setSubmitError(response?.error);
			}
		}
	};

	const handleClose = () => {
		setNewChatOpen(false);
	};

	return (
		<Dialog className={styles.CreateChatroomModal} open={newChatOpen} onClose={() => setNewChatOpen(false)}>
			<DialogTitle>New Chatroom</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					label="Chatroom Name"
					type="text"
					fullWidth
					variant="standard"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<div className={styles.userSelectContainer}>User Select</div>
				{submitError && <Alert severity="error">{submitError}</Alert>}
			</DialogContent>
			<DialogActions style={{ padding: "20px" }}>
				<Button disabled={loading} onClick={handleClose}>
					Cancel
				</Button>
				<Button disabled={loading || !valid} variant="contained" onClick={handleSubmit}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};
