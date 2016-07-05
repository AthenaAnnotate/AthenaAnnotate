// TODO: make action.type 'ADD_ANNOTES' or make explicit
// the difference between the two possible situations
import * as types from '../constants/actionTypes';


const annotations = (state = [], action) => {
  switch (action.type) {
    case types.ADD_ANNOTATION:
      return Array.isArray(action.annote) ?
         action.annote : state.concat([action.annote]);
         // state.concat(action.annote)
    default:
      return state;
  }
};

export default annotations;
