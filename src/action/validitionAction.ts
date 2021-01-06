
import { Dispatch } from 'redux';
import axios from 'axios';
import { CLEAR_VALIDATION_WORD, VALIDATION_WORD_ERR, VALIDATION_WORD_SUCCESS } from '../action/type';

import { translateViki } from './funcTranslate';

export interface Payload {
   isValidation: boolean
}

export interface DispatchValiditionWord {
   readonly type: typeof CLEAR_VALIDATION_WORD | typeof VALIDATION_WORD_SUCCESS | typeof VALIDATION_WORD_ERR,
   readonly payload: boolean
}

export const validationWord = (word: string) => (
   dispatch: Dispatch<DispatchValiditionWord>
) => {
   const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
   dispatch({
      type: CLEAR_VALIDATION_WORD,
      payload: false
   })

   axios.get(url).then(async (res) => {
      const transVi = await translateViki(word);

      const dataUnique = res.data.filter((val: any, index: number) => res.data.findIndex((item: any) => item['word'].toUpperCase() === val['word'].toUpperCase()) === index);
      dataUnique[0].vi = transVi;
      const local = localStorage.getItem('words');
      if (local) {
         let dataLocal = JSON.parse(local);
         dataLocal = [...dataUnique, ...dataLocal];

         localStorage.setItem('words', JSON.stringify(dataLocal));
      }
      else {
         localStorage.setItem('words', JSON.stringify(dataUnique));
      }

      dispatch({
         type: VALIDATION_WORD_SUCCESS,
         payload: true
      } as const)
   }).catch(err => {
      console.log(err);
      dispatch({
         type: VALIDATION_WORD_ERR,
         payload: false
      } as const)
   })
}
