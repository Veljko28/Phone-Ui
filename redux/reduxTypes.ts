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
        items: Phone[]
    }
    phones: {
        list: Phone[],
        quantity: number,
        brand: string
    },
    login: {
        email_username: string,
        password: string
    },
    userInfo: {
        navbarToggle: boolean,
        logged_in: boolean
    }
}