import React, { useState, useEffect } from "react";
import { Dialog, TextField, Button, Checkbox, DialogTitle, DialogContent, DialogActions, FormControlLabel} from "@mui/material";

// Dialog box that pops up when there is no user ID (user must log in)

function LoginDialog(props) {
    const [open, setOpen] = React.useState(!localStorage.getItem('userID'));
    const [userID, setUserID] = React.useState("");
    const [admin, setAdmin] = React.useState(false);

    const handleClose = () => {
        localStorage.setItem('userID', userID);
        localStorage.setItem('admin', JSON.stringify(admin))
        props.onClose();
    };

    const handleUserID = (e) => {
        setUserID(e.target.value)
    };

    const handleAdmin = (e) => {
        setAdmin(e.target.checked)
    };

    useEffect(() => {
        setOpen(!localStorage.getItem('userID'))
	}, [props.open]);

    return (
    <Dialog open={open}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
            <TextField id="outlined-basic" label="User ID" variant="outlined" margin='dense' fullWidth onChange={handleUserID}/>
            <FormControlLabel 
                label="Admin account?"
                control={<Checkbox onChange={handleAdmin} />} 
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={!userID}>Login</Button>
        </DialogActions>
    </Dialog>
    );
}

export default LoginDialog;