export type Event = {
    _id: string;
    name: string;
    artist: string;
    image: string;
    date_time: string;
    address: string;
    description: string;
};
  
export type Seat = {
    _id: string;
    sector: string;
    price: number;
    quantity: number;
    owner: string[];
};
  
export type EventData = {
    event: Event;
    seats: Seat[];
};
  