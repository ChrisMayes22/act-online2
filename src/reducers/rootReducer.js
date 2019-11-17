import * as actionTypes from '../actions/actions';

const initialState = {
    studentRes: new Array(11)
}

export function rootReducer(state=initialState, action){
    switch(action.type){
        case actionTypes.RECORD_STUDENT_RES:
            return {
                studentRes: action.studentRes
            }
        default:
            return state;
    }
}