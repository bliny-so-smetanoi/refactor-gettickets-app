import { useParams } from "react-router-dom"
import { useCreateOrderMutation, useGetEventByIdQuery, useLazyGetEventByIdQuery } from "../store/tickets/tickets.api";
import LoaderSpinner from "../components/Loader";
import moment from "moment";
import ModalWindow from "../components/Modal";
import { useEffect, useState } from "react";
import { Seat } from "../models/response/EventByIdResponse";
import { OrderedSeatDto } from "../models/dto/ordered.seat";
import { toast } from "react-toastify";
import processPayment from "../components/tiptop.pay";
import { useAuthSelector } from "../hooks/useAuthDispatch";
import { selectAuth } from "../store/auth/auth.slice";
import { CreateOrderRequest } from "../models/request/CreateOrder";


export default function EventPage() {
    const params = useParams<string>();
    const eventId = params.id;

    const {isLoading, isError, data} = useGetEventByIdQuery(eventId as string);

    const [trigger, {isLoading: isRefetching, error, data: refetched}] = useLazyGetEventByIdQuery();

    const [submitOrder, submitOrderResult] = useCreateOrderMutation();
    const {isAuth} = useAuthSelector(selectAuth)

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const closeModal = () => setModalOpen(false);
    
    const [seats, setSeats] = useState<Seat[] | null | undefined>([] as Seat[]);
    const [orderedSeats, setOrderedSeats] = useState<OrderedSeatDto[] | null>([] as OrderedSeatDto[]);
    const [totalCost, setTotalCost] = useState<number>(0);

    const handleModalOpen = () => {
        if (seats && seats.length <= 0) {
            toast.info('No available tickets for this event!');
            return;
        }

        if (!isAuth) {
            toast.info('Please sing in!');
            return;
        }

        setModalOpen(true);
    };

    const updateQuantityInSeatsList = (id: string, quantity: number) => {
        setSeats((prevItems) => 
            prevItems?.map((item) => 
                item._id === id ? {...item, quantity} : item
            )
        );
    };

    const addToOrderedSeatsList = (ordered: OrderedSeatDto) => {
        setOrderedSeats((prevItems) => 
            [...prevItems as OrderedSeatDto[], ordered]
        );
    };

    const handleSeatClick = (seat: Seat): void => {
        updateQuantityInSeatsList(seat._id, seat.quantity - 1);
        setTotalCost(totalCost + seat.price);
        addToOrderedSeatsList({sector: seat.sector, price: seat.price});
    };

    const availableSeats = seats?.map((seat) => {
        
        let disabled: boolean = false;

        if (orderedSeats) {
            disabled = orderedSeats?.length >= 5 || seat.quantity <= 0;
        }

        return <div key={seat._id} className="flex justify-center mb-1">
                    <button disabled={disabled} onClick={() => handleSeatClick(seat)} 
                            className={`w-4/5 p-5 border border-black rounded-md 
                                        ${disabled ? 'cursor-not-allowed' : ''}`}>
                        <p>Sector name: <b>{seat.sector}</b></p>
                        <p>Available tickets: <b>{seat.quantity <= 0 ? 'Sold out' : seat.quantity}</b></p>
                        <p>Price: <b>{seat.price} KZT</b></p>
                    </button>
                </div>
    });

    const order = orderedSeats?.map((orderedSeat) => {
        return <div key={orderedSeat.price + orderedSeat.sector} className="border-4 p-3 mb-4 border-black border-dotted">
            Sector: {orderedSeat.sector}, Price {orderedSeat.price}
        </div>
    });

    const handlePayment = () => {
        processPayment(totalCost,
            () => {
                toast.info('Waiting response from server...');                
                console.log('Payment success');

                const newOrder: CreateOrderRequest = {
                    details: orderedSeats as OrderedSeatDto[],
                    event: data?.event.name as string,
                    event_time: data?.event.date_time as string,
                    place: data?.event.address as string,
                    total_cost: totalCost,
                    date_time: moment().format()
                };
                
                const requestBody = {
                    newOrder,
                    seats
                }

                submitOrder(requestBody).unwrap().then((data: any) => {
                    clearOrder();
                    toast.success('You purchase succeeded! Now you can your tickets in your profile.');
                }).catch((e) => {

                    toast.error('Something went wrong during processing request.');
                })
            },
            () => {
                toast.error('Something went wrong during processing the payment, try again later...');                
                console.log('Payment error')
            },
            () => {
                toast.info('Processing you payment...');                
                console.log('Payment processing');
            }   
        );
    }

    useEffect(() => {
        if (orderedSeats && orderedSeats.length >= 5) {
            toast.info('You can buy only 5');
        }
    }, [orderedSeats])

    useEffect(() => {
        if (data?.seats !== undefined) {
            setSeats(data?.seats);
        }
    }, [data])

    const clearOrder = () => {
        trigger(eventId as string).unwrap().then((data) => {
            setSeats(data?.seats);
            setOrderedSeats([] as OrderedSeatDto[])
            setTotalCost(0);
        });
    }
    
    return (
        <div className="flex justify-center min-h-screen w-full bg-tickets-back">
            {isLoading && <LoaderSpinner/>}

            {data && 
                <div className="p-2">
                    <p className="text-center text-2xl p-2">{data.event.name}</p>
                    <p className="text-center text-lg p-2"><b>Artist/group</b>: {data.event.artist}</p>

                    <p className="text-center text-lg p-2"><b>Date</b>: {moment(data?.event.date_time).format('YYYY MMMM Do, h:mm A')}</p>                    
                    <p className="text-center text-md p-2"><b>Place</b>: {data.event.address}</p>

                    <div className="flex justify-center">
                        <img className="self-center w-[500px] h-[500px] rounded-md" src={data.event.image} alt=""/>
                    </div>

                    <div className="flex justify-center p-4">
                        <p className="w-1/2 text-balance">{data?.event.description}</p>
                    </div>
                    

                    <div className="flex justify-center">
                        <button onClick={() => handleModalOpen()} className="hover:bg-cyan-200 
                                        bg-cyan-200 p-4 border-2 
                                        border-cyan-100 rounded-md">
                            Purchase tickets
                        </button>
                    </div>
                    
                    <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
                        <div className="flex flex-col">
                            <div className="self-end">
                                <button className="" onClick={closeModal}>
                                    ⨯
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <p>Total price now: <b>{totalCost} KZT</b></p> 
                            </div>
                            
                            <div className="grid grid-cols-2">
                                <div className="flex flex-col">
                                    {availableSeats}                                         
                                </div>
                                <div className="flex flex-col">
                                    <p>Here is your order:</p>
                                    <br />
                                    <div>
                                        {order}
                                    </div>
                                </div>
                            </div>  

                            <div className="flex justify-end">
                                <button hidden={orderedSeats!.length <= 0} className="p-3 bg-red-500 
                                                    rounded-md text-white" 
                                        onClick={() => clearOrder()}>
                                    Rewind my choice
                                </button>
                                <button className={`rounded-md 
                                                    text-white p-3 bg-green-600 
                                                    ${totalCost <= 0 ? 'cursor-not-allowed' : ''}`} 
                                        disabled={totalCost <= 0}
                                        onClick={handlePayment}>
                                    I'm ready to buy!
                                </button>

                            </div>
                        </div>
                    </ModalWindow>
                </div>
            }
        </div>
    )
}
