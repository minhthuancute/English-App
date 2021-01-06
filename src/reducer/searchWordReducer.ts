
import { HANDLE_SEARCH } from '../action/type';

type Action = { type: string, payload: string };
export type StateSearchReducer = string;

const searchWordReducer = (state: StateSearchReducer = '', action: Action) => {
   switch (action.type) {
      case HANDLE_SEARCH:
         return action.payload;

      default:
         return state;
   }
}

export default searchWordReducer;
