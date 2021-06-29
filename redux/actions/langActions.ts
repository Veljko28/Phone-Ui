export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";


export const changeLanguage = (lang: String) => ({
    type: CHANGE_LANGUAGE,
    payload: lang
})