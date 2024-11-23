import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function EventCard({event}: any) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <>
            <div onMouseEnter={() => setIsHovered(!isHovered)} 
                onMouseLeave={() => setIsHovered(!isHovered)}
                className="p-1 relative m-1 bg-white 
                            items-center justify-center">

                <img className="max-w" src={event.image} alt="No image for this event..."/>

                <p>{event.artist}</p>
                <p>{event.name}</p>

                {
                    isHovered &&
                    <div className="absolute inset-0
                                    bg-[rgba(0, 131, 143, 0.0)] 
                                    hover:bg-[rgba(0,131,143,0.4)]
                                    flex justify-center items-center">

                        <button onClick={() => navigate(`/event/${event._id}`)} 
                                className="rounded-md bg-cyan-200 
                                w-2/3 h-1/3">
                                    More...
                        </button>
                    </div>
                }
            </div>
        </>
    )
}