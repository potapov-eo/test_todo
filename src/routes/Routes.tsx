import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {PageTwo} from "../pages/PageTwo/PageTwo";
import {Tasks} from "../pages/Tasks/Tasks";


export const PATH = {
    PAGE_ONE: "/page_one",
    PAGE_TWO: "/tasks",
}

export const Routes = () => {

    return (
        <div>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.PAGE_ONE}/>}/>
                <Route path={PATH.PAGE_ONE} render={() => <Tasks/>}/>
                <Route path={PATH.PAGE_TWO} render={() => <PageTwo/>}/>
            </Switch>
        </div>
    )
}
