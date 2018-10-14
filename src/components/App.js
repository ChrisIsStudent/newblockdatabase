// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }
//
// export default App;
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import '../../node_modules/grommet-css'
import App from 'grommet/components/App'
import Box from 'grommet/components/Box'

import * as actions from '../actions'
import Header from '../containers/Header'
import Footer from '../containers/Footer'
import Status from './Status'
import See from './See'
import Upload from './Upload'

class _App extends Component {

    componentDidMount() {
        this.props.initIPFS()
    }

    render() {
        return (
            <App>
                <div>
                    <BrowserRouter>
                        <div>
                            <Box align='center' responsive={true} pad='large'>
                                <Status ipfs={this.props.ipfs} {...this.props} />
                                <Box align='center' responsive={true} pad='medium'>
                                    <Header />
                                </Box>
                                <Route exact path='/upload' component={Upload} />
                                <Route exact path='/see' component={See} />
                            </Box>
                            <Footer />
                        </div>
                    </BrowserRouter>
                </div>
            </App>
        )
    }
}

function mapStateToProps(state) {
    return {
        ipfs: state.ipfs
    }
}

export default connect(mapStateToProps, actions)(_App)
