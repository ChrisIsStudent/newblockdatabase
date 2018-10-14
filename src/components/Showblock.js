import {Component} from "react";
import {connect} from 'react-redux'

import Box from "grommet/components/Box";
import React from "react";
import Blockchain from '../Blockchain/Blockchain'

class Showblock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            block:[]

        }
        this.blockchain = new Blockchain
        this.blockchain.loadFromFile(response => {

    this.setState(
        {
            block:response
        }
    )
            console.log(response)
        })
    }


    render() {
        return (
            <Box  align="center">



                <Box>
                    { JSON.stringify(this.blockchain)}
                </Box>

            </Box>
        )
    }


}

function mapStateToProps(state) {
    return {
        ipfs: state.ipfs,
        blockchain: state.blockchain
    }
}

export default connect(mapStateToProps)(Showblock)


