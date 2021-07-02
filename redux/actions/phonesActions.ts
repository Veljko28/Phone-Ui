import { Phone } from "../../components/models/Phone";
import templateAction from "../../constants/templateAction";

export const FETCH_LATEST_PHONES = "FETCH_LATEST_PHONES";


export const fetchLatestPhones = templateAction(FETCH_LATEST_PHONES);