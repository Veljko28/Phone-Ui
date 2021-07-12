import templateAction from "../../constants/templateAction";

export const FETCH_LATEST_PHONES = "FETCH_LATEST_PHONES";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const CHANGE_BRAND = "CHANGE_BRAND";



export const fetchLatestPhones = templateAction(FETCH_LATEST_PHONES);

export const changeQuantity = templateAction(CHANGE_QUANTITY);

export const changeBrand= templateAction(CHANGE_BRAND);

