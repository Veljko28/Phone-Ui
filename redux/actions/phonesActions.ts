import templateAction from "../../constants/templateAction";

export const FETCH_LATEST_PHONES = "FETCH_LATEST_PHONES";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const CHANGE_PHONE_CATEGORY = "CHANGE_PHONE_CATEGORY";
export const CHANGE_BID_CATEGORY = "CHANGE_BID_CATEGORY";


export const fetchLatestPhones = templateAction(FETCH_LATEST_PHONES);

export const changeQuantity = templateAction(CHANGE_QUANTITY);

export const changePhoneCategory = templateAction(CHANGE_PHONE_CATEGORY);

export const changeBidCategory = templateAction(CHANGE_BID_CATEGORY);



