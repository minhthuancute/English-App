
import { combineReducers } from 'redux';

import validitionReducer from '../reducer/validationReducer';
import searchReducer from '../reducer/searchWordReducer';
import translateReducer from '../reducer/translateReducer';

import { StateValidation } from '../reducer/validationReducer';
import { StateSearchReducer } from '../reducer/searchWordReducer';
import { StateTranslate } from '../reducer/translateReducer'

export interface AppState {
   validition: StateValidation,
   search: StateSearchReducer,
   translate: StateTranslate
}

// https://video.google.com/timedtext?lang=en&v=5MgBikgcWnY api get subtitle ytb

const rootReducer = combineReducers<AppState>({
   validition: validitionReducer,
   search: searchReducer,
   translate: translateReducer
})

export default rootReducer;