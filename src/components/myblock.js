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
            data:''
        }

        this.blockchain = new Blockchain
        this.blocks = {}
        this.blockchain.loadFromFile(response => {
            this.blocks = response
            let arr = []
            for(let block of this.blocks) {
                if (this.state.user.username == block.data.username) {
                    //     arr.push(<tr>
                    //         <td>{block.index}</td>
                    //         <td>{block.hash}</td>
                    //     </tr>)
                    // }
                    arr.push({
                        index:block.index,
                        username: block.data.username,
                        description: block.data.description,
                        hash: block.data.hash,
                        imagePassword: block.data.imagePassword,
                    })
                }
            }
            this.setState({
                blockTable: arr
            })
        })
    }

    render() {
        const displayItems = []
            for(let block of this.state.blockTable){
                this.props.ipfs.catJSON(block.hash, async (err, data) => {
                    if(err) {
                        // console.log(err)
                        this.setState({
                            modalOpen: true,
                            failure: `Error occured: ${err.message}`
                        })
                    } else {
                                this.setState({
                                    data: data
                                })
                    }
                })



            displayItems.push(

                <div key={block.index}>
                    <div>UserName: {block.username}</div>
                    <div>ImageHash: {block.hash}</div>
                    <div>ImageDescription: {block.description}</div>
                    <div>imgagePassword: {block.imagePassword}</div>
                    <div><Image src={this.state.data} size='large' align="center" /></div>
                    <br/>
                </div>
            )
        }




        return (

            <Box>
                <Heading align="center">My blocks</Heading>
                <Box  align="center">

                        {displayItems}
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


