import React, { useCallback } from 'react';
import './App.module.css';
import s from './App.module.css';
import { useSelector } from 'react-redux';
import { selectorError, selectorStatus, selectorToken } from '../store/app-reduser/app-selector';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { AppBar, Button, LinearProgress, Toolbar } from '@material-ui/core';
import { Tasks } from '../pages/Tasks/Tasks';
import { LoginFormDialog } from '../components/LoginFormDialog/LoginFormDialog';


function App() {

    const token = useSelector(selectorToken);
    const status = useSelector(selectorStatus);
    const error = useSelector(selectorError);
    const [isFormDialog, setIsFormDialog] = React.useState<boolean>(false);

    const loginHandler = useCallback(() => {
        setIsFormDialog(true);
    }, []);

    return (
        <div className={s.App}>
            {error !== null && <div><ErrorSnackbar/></div>}
            <AppBar position="static">
                <Toolbar>
                    <Button color={'secondary'} variant="contained" onClick={loginHandler}> login </Button>
                    {token ? <h2>Вы залогинены</h2> : <h2>Необходимо войти в приложение</h2>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Tasks/>
            {isFormDialog && <LoginFormDialog setIsFormDialog={setIsFormDialog}/>}
        </div>
    );
}

export default App;
