import React, {useState} from 'react'
import '../../styles/scss/content.scss'
import {Switch,Route} from "react-router-dom"
import Dashboard from '../../dashboard/dash'
import NotFound from './notFound'


function Content(){
    return (
        <main className={"content"}>
            <Switch>
                <Route path={"/"}>
                    <Dashboard/>
                </Route>
                <Route path ={"*"}>
                    <NotFound/>
                </Route>
            </Switch>

        </main>

    )
}

export default Content;
