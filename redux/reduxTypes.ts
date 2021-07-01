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
        list: Phone[]
    },
    login: {
        email_username: string,
        password: string
    }
}