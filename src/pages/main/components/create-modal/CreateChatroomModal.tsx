import React, { useState, useMemo } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAppContext } from "../../../../contexts/AppContext";
import styles from "./CreateChatroomModal.module.css";
import { CreateChatroomRequest, IUser } from "../../../../types";
import { CreateChatroom } from "../../../../api/Chatroom";
import { useUserContext } from "../../../../contexts";
import { UserSelect } from "./UserSelect";
import { getUuid } from "../../../../utils/data";

export const CreateChatroomModal = () => {
	const { newChatOpen, setNewChatOpen, users } = useAppContext();
	const { jwt, user } = useUserContext();
	const [loading, setLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string>();
	const [name, setName] = useState<string>("");
	const [ids, setIds] = useState<string[]>([]);

	const handleSubmit = async () => {
		setLoading(true);

		if (jwt && user) {
			const allIds = [...ids, user.id];

			const request: CreateChatroomRequest = {
				name: allIds.length > 2 ? name : "Direct-Message-" + getUuid(),
				allowed_users: allIds,
			};

			const response = await CreateChatroom(jwt, request);

			if (response?.isSuccess && response?.chatroom) {
				// websocket will load in new chatroom
				setLoading(false);
				setNewChatOpen(false);
			} else {
				setSubmitError(response?.error);
			}
		}
	};

	const handleChangeCheckedUsers = (selectedUsers: IUser[]) => {
		if (user && user.id) {
			setIds(selectedUsers.map((user) => user.id));
		}
	};

	const handleClose = () => {
		setName("");
		setNewChatOpen(false);
	};

	const nameEnabled = useMemo(() => ids.length > 1, [ids]);

	const valid = useMemo(() => {
		const noneSelected = ids.length === 0;
		const isGroupChat = ids.length >= 2;

		if (noneSelected) return false;

		if (isGroupChat) {
			return !!name && name !== "";
		} else {
			return true;
		}
	}, [ids, name]);

	return (
		<Dialog className={styles.CreateChatroomModal} open={newChatOpen} onClose={handleClose}>
			<DialogTitle>{ids.length > 2 ? "New Groupchat" : "New Chat"}</DialogTitle>
			<DialogContent>
				<TextField
					disabled={!nameEnabled}
					autoFocus
					label="Chatroom Name"
					type="text"
					fullWidth
					variant="standard"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<div className={styles.userSelectContainer}>
					{users ? <UserSelect onChange={handleChangeCheckedUsers} users={users} /> : "No users found"}
				</div>
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
