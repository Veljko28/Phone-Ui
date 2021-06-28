export interface Action {
    type: String
    payload?: any 
}

export interface State {
    language: {
        lang: String
    }
}