import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Coin from './routes/Coin'
import Coins from './routes/Coins'

interface Props {

}

const Router = (props: Props) => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/:coinId">
                    <Coin />
                </Route>
                <Route path="/" exact>
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router