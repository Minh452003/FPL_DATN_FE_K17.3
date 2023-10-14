export interface ICoupon{
    _id?: string,
    id?: string,
    name?: string,
    code?: string,
    content?: string,
    quantity?: number,
    discount_amount?: number,
    expiration_date?: Date,
    min_purchase_amount?: number

}