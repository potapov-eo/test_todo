import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { taskStatusType, updateTask } from '../../store/app-reduser/app-reducer';

type FormDialogType = {
    changeStatusDialogClose: (isUpdate: boolean) => void,
    text: string
    id: number
    status: taskStatusType
}

export const ChangeStatusDialog = React.memo(({ changeStatusDialogClose, text, status, id }: FormDialogType) => {

    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        changeStatusDialogClose(false);
    }, []);

    const Submit = async () => {
        const newStatus = (status === 'задача не выполнена') ? '10' : '11';
        await dispatch(updateTask(id, text, newStatus));
        changeStatusDialogClose(true);
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Change status</DialogTitle>
                <DialogContent>
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={Submit}>Change</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
});
