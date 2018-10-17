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
        const blockArray = JSON.stringify(this.blockchain.blockchain);
        // {
        //     blockArray.map((block)=>{
        //         return (
        //             <Box  align="center">
        //
        //             <div>
        //                 <table>
        //                     <tr>
        //                         <td>{block.indent}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>{block.data}</td>
        //                     </tr>
        //                     <tr>
        //                         <td>{block.hash}</td>
        //                     </tr>
        //                 </table>
        //             </div>
        //             </Box>
        //         )
        //     })
        // }
        return (
            <Box  align="center">



                <Box>
                    {blockArray}
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


