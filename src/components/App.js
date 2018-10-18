import React from 'react';
import {Router, Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../user/_helpers';
import {alertActions} from '../user/_actions';
import {PrivateRoute} from '../user/_components';
import {HomePage} from '../user/HomePage';
import {LoginPage} from '../user/LoginPage';
import {RegisterPage} from '../user/RegisterPage';
import Display from "./Display";
import {Link} from 'react-router-dom';


import * as actions from "../actions";
import Upload from "./Upload";
import See from "./See";
import Showblock from "./Showblock";
import Myblock from "./myblock";
import Box from "grommet/components/Box";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
              user: null
        }

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });




        this.onClickLoginOut = this.onClickLoginOut.bind(this)
        let user = localStorage.getItem("user");

        this.setState({
            user:  JSON.parse(user),


        });


    }

    componentDidMount() {


        if(!this.state.user){

            setTimeout(function() { //Start the timer
                let user = localStorage.getItem("user");

                this.setState({
                    user:  JSON.parse(user),


                });


            }.bind(this), 1000)

        }

    }

    componentDidUpdate(){
        if(!this.state.user){

            setTimeout(function() { //Start the timer
                let user = localStorage.getItem("user");

                this.setState({
                    user:  JSON.parse(user),


                });


            }.bind(this), 1000)

        }
    }


    onClickLoginOut() {
        this.setState({
            user: null
        })
    }

    render() {
        const {alert} = this.props;


        return (

            <div className="jumbotron">
                <div className="container">
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }

                    <Router history={history}>
                        <div>
                            <div className="container">
                                <div className="header">
                                    <div className="col-sm-10">{this.state.user ? "Hi, " + this.state.user.username :
                                        <Link to="/login">Login</Link>}</div>
                                    <div className="col-sm-2">
                                        {this.state.user ?
                                            <Link to="/login" onClick={this.onClickLoginOut}>Logout</Link> :
                                            <Link to="/login" onClick={this.onClickLoginOut}>{this.state.user}</Link>}
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <Route path="/login" component={LoginPage}/>
                                <Route path="/register" component={RegisterPage}/>
                                <PrivateRoute exact path= "/" component={Display}/>
                                <PrivateRoute exact path="/upload" component={Display}/>


                                <Route  path='/upload' component={Display}/>
                                <Route  path='/see' component={Display}/>

                                <Route  path='/showblock' component={Display}/>
                                <Route  path='/myblock' component={Display}/>
                                {/*<Route path='/404' component={Notfound} />*/}
                                {/*<Redirect from='*' to='/404' />*/}
                            </div>
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
