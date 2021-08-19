export default interface Bid {
  id: string,
  image?: string,
  name: string,
  description?: string,
  price: string | number,
  dateCreated?: Date,
  date_Ends?: Date,
  expires?: Date
  discount?: string
  seller: string,
  brand: string,
  category: string
  status?: number
}