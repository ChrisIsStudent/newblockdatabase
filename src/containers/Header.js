import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Box  from 'grommet/components/Box'
import Heading  from 'grommet/components/Heading'
import Tabs  from 'grommet/components/Tabs'
import Tab  from 'grommet/components/Tab'

import * as actions from '../actions'
import {Route} from "react-router-dom";
import {RegisterPage} from "../user/RegisterPage";

class Header extends Component {
    render () {
        return (
            <Box align="center">
                <Heading align="center">Upload image and Hash on Blockchain</Heading>
                <Tabs>
                    <Tab title='Upload'>
                        <Redirect to='/upload' />
                    </Tab>
                    <Tab title='See'>
                        <Redirect to='/see' />
                    </Tab>

                    <Tab title='Blockchain'>
                        <Redirect to='/showblock' />
                    </Tab>

                </Tabs>
            </Box>
        )
    }
}

function mapStateToProps(state) {
    return { }
}

export default connect(mapStateToProps, actions)(Header)
