export const INPUT_EMAIL_USERNAME = "INPUT_EMAIL_USERNAME";
export const INPUT_PASSWORD = "INPUT_PASSWORD";


export const inputEmailUsername = (user_input : string) => ({
  type: INPUT_EMAIL_USERNAME,
  payload: user_input
})

export const inputPassword = (user_input : string) => ({
  type: INPUT_PASSWORD,
  payload: user_input
})
