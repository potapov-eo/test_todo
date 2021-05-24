import React, { useEffect } from 'react'
import { getMe, setCurrentPage } from "../../store/app-reduser/app-reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentPage, selectorTasks, selectorTotalTaskCount } from "../../store/app-reduser/app-selector";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { SortCardButton } from "../../components/SortButton/SortButton";
import './Tasks.module.css'
import { FormDialog } from "../../components/FormDialog/FormDialog";


export const Tasks = () => {

    const dispatch = useDispatch()

    const tasks = useSelector(selectorTasks)
    const totalTaskCount = useSelector(selectorTotalTaskCount)
    const currentPage = useSelector(selectorCurrentPage)
    const paginationCount = Math.ceil(totalTaskCount / 3)
    const [isFormDialog, setIsFormDialog] = React.useState(false);

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
        dispatch(getMe())
    };
    const createNewTask = () => {
        setIsFormDialog(true)
    }
    const closeFormDialogs = (isReload: boolean) => {
        setIsFormDialog(false)
        if (isReload === true) dispatch(getMe())
    }

    return (<>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h2>ID<SortCardButton name={"id"}/></h2></TableCell>
                            <TableCell><h2>username<SortCardButton name={"username"}/></h2></TableCell>
                            <TableCell><h2>email<SortCardButton name={"email"}/></h2></TableCell>
                            <TableCell><h2>text</h2></TableCell>
                            <TableCell><h2>status<SortCardButton name={"status"}/></h2></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell align="center">
                                    {task.id}
                                </TableCell>
                                <TableCell align="center">
                                    {task.username}
                                </TableCell>
                                <TableCell align="center">
                                    {task.email}
                                </TableCell>
                                <TableCell align="center">
                                    {task.text}
                                </TableCell>
                                <TableCell align="center">
                                    {task.status}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination count={paginationCount} page={currentPage} onChange={handleChange} color="primary"/>
                <Button onClick={createNewTask}>ADD NEW TASK</Button>
            </TableContainer>
            {isFormDialog && <FormDialog closeFormDialogs={closeFormDialogs}/>}
        </>
    )
}

/* const add = async () => {
          const res = await API.putTask()
      }

      const login = async () => {
          const res = await AuthAPI.login()
          console.log(res.data)
      }*/
