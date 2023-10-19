import { IImage } from "./auth"

export interface ICategory {
  _id?: string
  id: string | number
  categories_name?: string
  image?: IImage
  price_increase_percent?: number
}