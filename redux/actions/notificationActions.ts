export const CHANGE_NUMBER_OF_NOTIFICATIONS = "CHANGE_NUMBER_OF_NOTIFICATIONS";


export const changeNumberOfNotifications = (numOfNotifications: number) => ({type: CHANGE_NUMBER_OF_NOTIFICATIONS, payload: numOfNotifications});