import { IImage } from "./auth"

export interface IComment {
    _id: string
    id: string
    userId: string
    productId: string
    description: string
    rating: number
    image: IImage
    colorId: string
    sizeId: string
    materialId: string
    orderId: string
    product: string
    product_name: string
    comments_count: number
    STT: number
    key: string | number
    item: string | number
    createdAt: string
    comment: number | string
}