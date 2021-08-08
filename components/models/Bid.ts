export default interface Bid {
  id: string,
  image?: string,
  name: string,
  description?: string,
  price: string | number,
  dateCreated?: Date,
  timeEnds?: Date,
  expires?: Date
  discount?: string
  seller: string
}