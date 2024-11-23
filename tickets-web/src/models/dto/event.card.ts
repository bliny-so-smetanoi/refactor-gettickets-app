export type EventCardDto = {
    _id: string;
    name: string;
    artist: string;
    image: string;
    date_time: string; // ISO 8601 date-time string
    address: string;
    description?: string; // Optional, as it’s missing in the second example
}