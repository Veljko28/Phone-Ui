export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_CONFIRM_PASSWORD = "CHANGE_CONFIRM_PASSWORD";

const templateAction = (type: string) => ( payload: string) => ({
  type,
  payload
})


export const changeEmailRedux = templateAction(CHANGE_EMAIL);
export const changeUserNameRedux = templateAction(CHANGE_USERNAME);
export const changePasswordRedux = templateAction(CHANGE_PASSWORD);
export const changeConfirmPasswordRedux = templateAction(CHANGE_CONFIRM_PASSWORD);
