import {Component} from "react";
import {connect} from 'react-redux'

import Box from "grommet/components/Box";
import React from "react";
import Blockchain from '../Blockchain/Blockchain'
import Heading from "grommet/components/Heading";
import moment from 'moment'

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
                arr.push(
                    {
                        index:block.index,
                        username: block.data.username,
                        timestamp: moment(block.timestamp).format("YYYY-MM-DD HH:mm:ss"),
                        previousHash:block.previousHash,
                        hash: block.hash,
                        imageHash: block.data.hash

                    }
                )
            }
            this.setState({
                blockTable: arr
            })
        })
    }

    render() {
        return (
            <Box>
                <Heading align="center">All blocks</Heading>
                <Box  align="center">
                    {this.state.blockTable.map(item => (
                        <div key={item.index}>
                            <div>Index: {item.index}</div>
                            <div>UserName: {item.username}</div>
                            <div>Image Hash: {item.imageHash}</div>
                            <div>Create Time: {item.timestamp}</div>
                            <div>previousHash: {item.previousHash}</div>
                            <div>BlockHash: {item.hash}</div>
                            <br/>
                        </div>
                    ))}
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


