
import { VALIDATION_WORD_ERR, VALIDATION_WORD_SUCCESS, CLEAR_VALIDATION_WORD } from '../action/type'

type Action = { type: string, payload: boolean }
export type StateValidation = boolean | null;

const validationReducer = (state: StateValidation = false, action: Action) => {
   switch (action.type) {
      case VALIDATION_WORD_SUCCESS: {
         return action.payload
      }

      case VALIDATION_WORD_ERR: {
         return action.payload
      }

      case CLEAR_VALIDATION_WORD: {
         return null
      }

      default:
         return state
   }
}

export default validationReducer