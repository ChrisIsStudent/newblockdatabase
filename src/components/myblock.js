import {Component} from "react";
import {connect} from 'react-redux'

import Box from "grommet/components/Box";
import React from "react";
import Blockchain from '../Blockchain/Blockchain'
import Heading from "grommet/components/Heading";
import Image from 'grommet/components/Image';


class Showblock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blockTable: [],
            user: JSON.parse(localStorage.getItem("user")),
            data: '',
            displayItems: [],
        }

        this.blockchain = new Blockchain
        this.blocks = {}
        this.blockchain.loadFromFile(response => {
            this.blocks = response
            let arr = []
            for (let block of this.blocks) {
                if (this.state.user.username == block.data.username) {

                    this.props.ipfs.catJSON(block.data.hash, async (err, data) => {
                        if (err) {
                            // console.log(err)
                            this.setState({
                                modalOpen: true,
                                failure: `Error occured: ${err.message}`
                            })
                        } else {


                            arr.push({
                                index: block.index,
                                username: block.data.username,
                                description: block.data.description,
                                hash: block.data.hash,
                                imagePassword: block.data.imagePassword,
                                image: data
                            })

                            this.setState({
                                blockTable: arr,

                            })
                        }
                    })

                }
            }
        })

    }

    render() {

        return (

            <Box>
                <Heading align="center">My blocks</Heading>
                <Box align="center">
                    {this.state.blockTable.map(item => (
                        <div key={item.index}>
                            <div>UserName: {item.username}</div>
                            <div>ImageHash: {item.hash}</div>
                            <div>ImageDescription: {item.description}</div>
                            <div>imgagePassword: {item.imagePassword}</div>
                            <div><Image src={item.image} size='large' align="center"/></div>
                            <br/>
                        </div>
                    ))}
                    {}
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


