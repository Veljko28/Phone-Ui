import templateAction from "../../constants/templateAction";
export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_CONFIRM_PASSWORD = "CHANGE_CONFIRM_PASSWORD";



export const changeEmailRedux = templateAction(CHANGE_EMAIL);
export const changeUserNameRedux = templateAction(CHANGE_USERNAME);
export const changePasswordRedux = templateAction(CHANGE_PASSWORD);
export const changeConfirmPasswordRedux = templateAction(CHANGE_CONFIRM_PASSWORD);
