import Phone from "../components/models/Phone";

export interface Action {
    type: String
    payload?: any 
}
export interface CategoryOptions {
    category: string,
    brand: string,
    sorting: string,
    price: string   
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
        phoneOptions: CategoryOptions,
        bidOptions: CategoryOptions
    },
    login: {
        email_username: string,
        password: string
    },
    userInfo: {
        navbarToggle: boolean,
        logged_in: boolean,
        darkMode: boolean
    },
    notification: {
        numOfNotifications: number
    }
}