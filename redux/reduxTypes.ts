import { Phone } from "../components/models/Phone";

export interface Action {
    type: String
    payload?: any 
}

export interface State {
    language: {
        lang: String
    }
    cart: {
        numOfItems: Number,
        items: Phone[]
    }
    phones: {
        list: Phone[]
    }
}