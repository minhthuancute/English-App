
import { Dispatch } from 'redux';
import { HANDLE_SEARCH } from '../action/type';

export interface DispatchSearchAction {
   readonly type: typeof HANDLE_SEARCH
   readonly payload: string
}

export const searchAction = (word: string) => (
   dispatch: Dispatch<DispatchSearchAction>
) => {

   dispatch({
      type: HANDLE_SEARCH,
      payload: word
   })
}