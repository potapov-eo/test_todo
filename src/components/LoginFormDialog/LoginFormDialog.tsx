import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../store/app-reduser/app-reducer';


const initialValues = {
    userName: 'admin',
    password: '123',
};

const validationSchema = yup.object({
    userName: yup
        .string()
        .required('это поле обязательно для заполнения'),
    password: yup
        .string()
        .required('это поле обязательно для заполнения'),
});

type FormDialogType = {
    setIsFormDialog: (isFormDialog: boolean) => void
}

export const LoginFormDialog = React.memo(({ setIsFormDialog }: FormDialogType) => {

    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        setIsFormDialog(false);
    }, []);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            await dispatch(login(values.userName, values.password));
            setIsFormDialog(false);
            formik.resetForm();
        },
    });

    return (
        <div>
            <Dialog open={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>login</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div><TextField
                            name={'userName'}
                            value={formik.values.userName}
                            placeholder={'userName'}
                            onChange={formik.handleChange}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        /></div>
                        <div><TextField
                            name={'password'}
                            value={formik.values.password}
                            placeholder={'password'}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        /></div>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        <Button variant='outlined' type='submit'>Login</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
});
