import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from "formik";
import * as yup from 'yup'
import { addTask } from "../../store/app-reduser/app-reducer";
import { useDispatch } from "react-redux";


const initialValues = {
    userName: "",
    email: "",
    text: ""
}
const validationSchema = yup.object({
    userName: yup
        .string()
        .required('это поле обязательно для заполнения'),
    email: yup.string().email('Invalid email').required('это поле обязательно для заполнения'),
    text: yup
        .string()
        .required('это поле обязательно для заполнения'),

});
type FormDialogType = {
    closeFormDialogs: (isReload: boolean) => void
}


export const FormDialog = ({ closeFormDialogs }: FormDialogType) => {

    const dispatch = useDispatch()
    const handleClose = () => {
        closeFormDialogs(false);
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            await dispatch(addTask(values))
            closeFormDialogs(true)
            formik.resetForm()

        }
    })

    return (
        <div>
            <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div><TextField
                            name={"userName"}
                            value={formik.values.userName}
                            placeholder={"userName"}
                            onChange={formik.handleChange}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        /></div>
                        <div><TextField
                            name={"email"}
                            value={formik.values.email}
                            placeholder={"email"}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        /></div>
                        <div><TextField
                            name={"text"}
                            value={formik.values.text}
                            placeholder={"text"}
                            onChange={formik.handleChange}
                            error={formik.touched.text && Boolean(formik.errors.text)}
                            helperText={formik.touched.text && formik.errors.text}
                        /></div>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">CREATE</Button>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    );
}
