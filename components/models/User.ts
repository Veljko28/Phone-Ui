export default interface User {
  id: string,
  image: string,
  email: string,
  userName: string,
  description?: string,
  phones_sold: number,
  phoneNumber: string,
  emailConfirmed?: boolean
}