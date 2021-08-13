export default interface Phone {
  id: string,
  image: string,
  name: string,
  description?: string,
  price: string | number,
  dateCreated?: Date,
  expires?: Date
  discount?: string,
  status?: string | number,
  category?: string,
  brand?: string,
  seller?: string
}