import {Component} from "react";
import {connect} from 'react-redux'

import Box from "grommet/components/Box";
import React from "react";
import Blockchain from '../Blockchain/Blockchain'
import Heading from "grommet/components/Heading";

class Showblock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blockTable: []
        }

        this.blockchain = new Blockchain
        this.blocks = {}
        this.blockchain.loadFromFile(response => {
            this.blocks = response
            let arr = []
            for(let block of this.blocks) {
                arr.push(<tr>
                    <td>{block.index}</td>
                    <td>{block.hash}</td>
                </tr>)
            }
            this.setState({
                blockTable: arr
            })
        })
    }

    render() {
        const blockArray = JSON.stringify(this.blockchain.blockchain);
        return (
            <Box>
                <Heading align="center">All blocks</Heading>
                <Box  align="center">
                    <table>
                        <tr>
                            <th>index</th>
                            <th>hash</th>
                        </tr>
                        {this.state.blockTable}
                    </table>
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


