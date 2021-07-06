import { Phone } from "../components/models/Phone";

export interface Action {
    type: String
    payload?: any 
}

export interface State {
    language: {
        lang: string
    }
    cart: {
        numOfItems: number,
        items: Phone[]
    }
    phones: {
        list: Phone[],
        quantity: number
    },
    login: {
        email_username: string,
        password: string
    }
}