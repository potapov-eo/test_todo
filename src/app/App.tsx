import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectorError, selectorStatus } from "../store/app-reduser/app-selector";
import { Routes } from "../routes/Routes";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { AppBar, LinearProgress, Toolbar } from "@material-ui/core";


function App() {

    const status = useSelector(selectorStatus)
    const error = useSelector(selectorError)



    return (<Router>
            <div className="App">
                {error !== null && <ErrorSnackbar/>}
                <AppBar position="static">
                    <Toolbar>

                    </Toolbar>
                    {status === "loading" && <LinearProgress color="secondary"/>}
                </AppBar>
                <Routes/>
            </div>
        </Router>
    );
}

export default App;
