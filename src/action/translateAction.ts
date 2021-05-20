
import { Dispatch } from 'redux';
import { TRANSLATE_SUCCESS } from '../action/type';

// import { translateViki } from './funcTranslate';
import { translateMicrosoft } from './funcTranslate';
// import { translateGoogle } from './funcTranslate';

export interface DispatchTranslate {
   readonly type: typeof TRANSLATE_SUCCESS,
   readonly payload: any
}

export const translateAction = (text: string) => async (
   dispatch: Dispatch<DispatchTranslate>
) => {
   const res = await translateMicrosoft(text);
   // const res = await translateViki(text);
   // const res = await translateGoogle(text);

   dispatch({
      type: TRANSLATE_SUCCESS,
      payload: res
   })
}

