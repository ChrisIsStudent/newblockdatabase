import {blockService} from "../service";
import { alertActions } from '../user/_actions/alert.actions';
import { userConstants } from '../user/_constants/';


export const blockActions = {

    create,
    getAll,
};


function create(block) {
    return dispatch => {
        dispatch(request(block));

        blockService.create(block)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Create successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(block) { return { type: userConstants.LOGIN_REQUEST, block } }
    function success(block) { return { type: userConstants.LOGIN_SUCCESS, block } }
    function failure(block) { return { type: userConstants.LOGIN_FAILURE, block } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        blockService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

