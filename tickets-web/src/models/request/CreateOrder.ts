import { OrderedSeatDto } from "../dto/ordered.seat"

export type CreateOrderRequest = {
    details: OrderedSeatDto[],
    event: string, 
    event_time: string,
    place: string,
    total_cost: number,
    date_time: string
}