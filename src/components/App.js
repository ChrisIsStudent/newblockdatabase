import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../user/_helpers';
import {alertActions} from '../user/_actions';
import {PrivateRoute} from '../user/_components';
import {HomePage} from '../user/HomePage';
import {LoginPage} from '../user/LoginPage';
import {RegisterPage} from '../user/RegisterPage';
import Display from "./Display";

import * as actions from "../actions";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        let user = localStorage.getItem("user")
        this.state.user = JSON.parse(user)

    }

    render() {
        const {alert} = this.props;

        return (

            <div className="jumbotron">
                <div className="container">
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <div className="header">
                        <div className="col-sm-10">Hi, {this.state.user ? this.state.user.username : "unknown"}</div>
                        <div className="col-sm-2">
                            {this.state.user ? "Login Out" : ""}
                        </div>
                    </div>

                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={Display}/>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/register" component={RegisterPage}/>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};