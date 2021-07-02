import templateAction from "../../constants/templateAction";

export const CHANGE_CONTACT_EMAIL = "CHANGE_CONTACT_EMAIL";
export const CHANGE_CONTACT_NAME = "CHANGE_CONTACT_NAME"; 
export const CHANGE_CONTACT_SUBJECT = "CHANGE_CONTACT_SUBJECT"; 
export const CHANGE_CONTACT_MESSAGE = "CHANGE_CONTACT_MESSAGE"; 


export const changeContactEmailRedux = templateAction(CHANGE_CONTACT_EMAIL);
export const changeContactNameRedux = templateAction(CHANGE_CONTACT_NAME);
export const changeContactSubjectRedux = templateAction(CHANGE_CONTACT_SUBJECT);
export const changeContactMessageRedux = templateAction(CHANGE_CONTACT_MESSAGE);



