import { Phone } from "../../components/models/Phone";

export const FETCH_LATEST_PHONES = "FETCH_LATEST_PHONES";


export const fetchLatestPhones = (phones: Phone[]) => {
  return {
    type: FETCH_LATEST_PHONES,
    payload: phones
  }
}