//Purpose:- Alert window for handling confirmation alert
//added by :- Abhishek Singh,LAM

import React,{createContext,useContext,useState} from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,Typography,Box,Slide} from '@mui/material';

const ConfirmContext = createContext();
export const useConfirm = () => useContext(ConfirmContext);

const Transition = React.forwardRef(function Transition(props,ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export const ConfirmProvider = ({children}) => {
    const [state,setState] = useState({open:false});
    const confirm = ({title,message,onConfirm}) => {setState({open:true,title,message,onConfirm})};

    const handleClose = () => setState({open:false});
    const handleConfirm = () => {
        state.onConfirm?.();
        handleClose();
    };

    return (
        <ConfirmContext.Provider value={{confirm}}>
            {children}
            <Dialog open={state.open} TransitionComponent={Transition} maxWidth="xs" fullWidth>
                <DialogTitle>{state.title || 'Confirm'}</DialogTitle>
                <DialogContent dividers>
                    <Typography>{state.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} variant='contained' color="primary">Yes</Button>
                </DialogActions>
            </Dialog>
        </ConfirmContext.Provider>
    );
};