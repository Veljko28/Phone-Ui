export const CHANGE_LOGIN_STATUS = "CHANGE_LOGIN_STATUS";
export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";

export const toggleNavbar = () => ({
  type: TOGGLE_NAVBAR
})

export const changeLoginStatus = (active: boolean) => ({
  type: CHANGE_LOGIN_STATUS,
  payload: active
})