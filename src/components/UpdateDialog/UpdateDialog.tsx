import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/app-reduser/app-reducer';


const validationSchema = yup.object({
    text: yup
        .string()
        .required('это поле обязательно для заполнения'),
});

type FormDialogType = {
    submitIsUpdateDialog: (isUpdate: boolean) => void,
    text: string
    id: number
}

export const UpdateDialog = ({ id, submitIsUpdateDialog, text }: FormDialogType) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        submitIsUpdateDialog(false);
    };

    const formik = useFormik({
        initialValues: { text: text },
        validationSchema: validationSchema,
        onSubmit: async values => {
            await dispatch(updateTask(id, values.text, '1'));
            submitIsUpdateDialog(true);
            formik.resetForm();
        },
    });

    return (
        <div>
            <Dialog open={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>CHANGE TEXT</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div><TextField
                            name={'text'}
                            value={formik.values.text}
                            placeholder={'password'}
                            onChange={formik.handleChange}
                            error={formik.touched.text && Boolean(formik.errors.text)}
                            helperText={formik.touched.text && formik.errors.text}
                        /></div>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        <Button variant='outlined' type='submit'>Change</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
