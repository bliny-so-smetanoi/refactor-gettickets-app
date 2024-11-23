import { EventCard } from "../components/EventCard";
import LoaderSpinner from "../components/Loader";
import { EventCardDto } from "../models/dto/event.card";
import { EventResponse } from "../models/response/EventResponse";
import {useGetEventsQuery} from "../store/tickets/tickets.api";

export default function HomePage() {
    const {isLoading, isError, data} = useGetEventsQuery("");

    const handleEventResponse = (data: EventResponse[] | undefined): JSX.Element[] | null => {
        if (data !== undefined) {
            return data.map(x => {
                const eventItem: EventCardDto = {
                    _id: x._id,
                    date_time: x.date_time,
                    name: x.name,
                    artist: x.artist,
                    description: '',
                    address: '',
                    image: x.image
                };
                return <EventCard key={eventItem._id} event={eventItem}/>
            });
            
        }
        return null;
    }

    return (
        <main className="flex min-h-screen justify-center w-full">
            <div className="self-center w-1/2">
                <div className="flex justify-center py-5">
                    <input className="w-1/2 p-3 text-center focus:shadow-lg focus:shadow-cyan-200 rounded-full focus:outline-none" placeholder="Search artists" type="text"/>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {!isLoading && handleEventResponse(data)}
                    {isLoading && <LoaderSpinner/>}
                </div>
            </div>
        </main>
    )
}