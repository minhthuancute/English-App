
export interface AppState {
   search: string,
   validition: boolean,
   translate: any
}

enum typeWord { Noun, Adj, Adv, Ver };
export interface Word {
   readonly name: string,
   readonly type: typeWord,
   readonly definition: string
}