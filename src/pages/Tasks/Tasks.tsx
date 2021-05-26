import React, { useCallback, useEffect } from 'react';
import { getMe, setCurrentPage, taskStatusType } from '../../store/app-reduser/app-reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectorCurrentPage,
    selectorTasks,
    selectorToken,
    selectorTotalTaskCount,
} from '../../store/app-reduser/app-selector';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { SortCardButton } from '../../components/SortButton/SortButton';
import './Tasks.module.css';
import s from './Tasks.module.css';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { NewTaskDialog } from '../../components/NewTaskDialog/NewTaskDialog';
import { ChangeStatusDialog } from '../../components/ChangeStatusDialog/ChangeStatusDialog';
import { ChangeTextDialog } from '../../components/ChangeTextDialog/ChangeTextDialog';

export const Tasks = React.memo(() => {

    const dispatch = useDispatch();

    const tasks = useSelector(selectorTasks);
    const totalTaskCount = useSelector(selectorTotalTaskCount);
    const currentPage = useSelector(selectorCurrentPage);
    const token = useSelector(selectorToken);
    const paginationCount = Math.ceil(totalTaskCount / 3);
    const [isFormDialog, setIsFormDialog] = React.useState(false);
    const [isUpdateDialog, setIsUpdateDialog] = React.useState(false);
    const [isFormStatus, setIsFormStatus] = React.useState(false);
    const [updateTaskId, setUpdateTaskId] = React.useState(0);
    const [updateTaskText, setUpdateTaskText] = React.useState('');
    const [updateTaskStatus, setUpdateTaskStatus] = React.useState<taskStatusType>(0);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    const CurrentPageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value));
        dispatch(getMe());
    }, []);

    const newTaskDialogCall = useCallback(() => {
        setIsFormDialog(true);
    }, []);
    const NewTaskDialogClose = useCallback((isUpdate: boolean) => {
        setIsFormDialog(false);
        if (isUpdate === true) dispatch(getMe());
    }, []);

    const changeTextDialogCall = useCallback((id: number, text: string) => {
        setIsUpdateDialog(true);
        setUpdateTaskId(id);
        setUpdateTaskText(text);
    }, []);
    const changeTextDialogClose = useCallback((isUpdate: boolean) => {
        setIsUpdateDialog(false);
        if (isUpdate === true) dispatch(getMe());
    }, []);

    const changeStatusDialogCall = useCallback((id: number, text: string, status: taskStatusType) => {
        setIsFormStatus(true);
        setUpdateTaskId(id);
        setUpdateTaskText(text);
        setUpdateTaskStatus(status);
    }, []);
    const changeStatusDialogClose = useCallback((isUpdate: boolean) => {
        setIsFormStatus(false);
        if (isUpdate === true) dispatch(getMe());
    }, []);

    return (<>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h2>ID<SortCardButton name={'id'}/></h2></TableCell>
                            <TableCell><h2>username<SortCardButton name={'username'}/></h2></TableCell>
                            <TableCell><h2>email<SortCardButton name={'email'}/></h2></TableCell>
                            <TableCell className={s.text}><h2>text</h2></TableCell>
                            <TableCell><h2>status<SortCardButton name={'status'}/></h2></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell align='center'>
                                    {task.id}
                                </TableCell>
                                <TableCell align='center'>
                                    {task.username}
                                </TableCell>
                                <TableCell align='center'>
                                    {task.email}
                                </TableCell>
                                <TableCell align="center">
                                    {token && <EditTwoToneIcon color="secondary" className={s.iconText}
                                                               onClick={() => changeTextDialogCall(task.id, task.text)}/>}
                                    {task.text}
                                </TableCell>
                                <TableCell align="center" className={s.status}>
                                    {task.status}{token && ((task.status === 'задача не выполнена') || (task.status === 'задача не выполнена, отредактирована админом')) &&
                                <DoneOutlineIcon className={s.statusIcon} color='secondary'
                                                 onClick={() => changeStatusDialogCall(task.id, task.text, task.status)}/>}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination count={paginationCount} page={currentPage} onChange={CurrentPageChange} color='primary'/>
                <Button variant={'outlined'} onClick={newTaskDialogCall}>ADD NEW TASK</Button>
            </TableContainer>

            {isFormDialog &&
            <NewTaskDialog NewTaskDialogClose={NewTaskDialogClose}/>}

            {isUpdateDialog &&
            <ChangeTextDialog changeTextDialogClose={changeTextDialogClose}
                              text={updateTaskText} id={updateTaskId}/>}
            {isFormStatus &&
            <ChangeStatusDialog changeStatusDialogClose={changeStatusDialogClose}
                                text={updateTaskText} id={updateTaskId} status={updateTaskStatus}/>}
        </>
    );
});
