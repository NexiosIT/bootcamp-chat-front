import React, { useState, useEffect } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAppContext } from "../../../../contexts/AppContext";
import styles from "./CreateChatroomModal.module.css";
import { CreateChatroomRequest, IUser } from "../../../../types";
import { CreateChatroom } from "../../../../api/Chatroom";
import { useUserContext } from "../../../../contexts";
import { UserSelect } from "../../../../components/molecules/UserSelect";

export const CreateChatroomModal = () => {
	const { newChatOpen, setNewChatOpen, users } = useAppContext();
	const { jwt, user } = useUserContext();
	const [loading, setLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string>();
	const [valid, setValid] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [ids, setIds] = useState<string[]>([]);

	useEffect(() => {
		if (!name || name === "") setValid(false);
    else if (!ids || ids.length < 2 ) setValid(false);
		else setValid(true);
	}, [name, ids]);

	const handleSubmit = async () => {
		setLoading(true);

		if (jwt) {
			const request: CreateChatroomRequest = {
				name,
				allowed_users: ids,
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
      setIds([user.id, ...selectedUsers.map(user => user.id)])
    }
  }
 
	const handleClose = () => {
    setName("");
		setNewChatOpen(false);
	};

	return (
		<Dialog className={styles.CreateChatroomModal} open={newChatOpen} onClose={handleClose}>
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
