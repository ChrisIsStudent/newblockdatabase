import { combineReducers } from 'redux'

import IPFSReducer from './init_ipfs'

import { authentication } from '../user/_reducers/authentication.reducer';
import { registration } from '../user/_reducers/registration.reducer';
import { users } from '../user/_reducers/users.reducer';
import { alert } from '../user/_reducers/alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
  ipfs: IPFSReducer
})

export default rootReducer
