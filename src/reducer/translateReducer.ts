
import { TRANSLATE_SUCCESS } from '../action/type';

type Action = { type: string, payload: any };
export type StateTranslate = string;

const translateReducer = (state: StateTranslate = '', action: Action) => {
   switch (action.type) {
      case TRANSLATE_SUCCESS:
         return action.payload;

      default:
         return state;
   }
}
export default translateReducer