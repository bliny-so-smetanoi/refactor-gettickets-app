import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {EventResponse} from "../../models/response/EventResponse";
import { AuthForm } from "../../forms/AuthForm";
import { AuthResponse } from "../../models/response/AuthResponse";
import { RegisterForm } from "../../forms/RegisterForm";
import { EventData } from "../../models/response/EventByIdResponse";
import { CreateOrderRequest } from "../../models/request/CreateOrder";

const token = JSON.parse(localStorage.getItem('user') as string)?.token;
console.log(token);

export const ticketsApi = createApi({
    reducerPath: 'tickets/api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints: build => ({
        getEvents: build.query<EventResponse[], string>({
            query: () => ({
                url: 'events',
            })
        }),
        loginUser: build.mutation<{} | AuthResponse, AuthForm>({
            query: (payload: AuthForm) => ({
                url: 'auth/login',
                method: 'POST',
                body: payload
            }),
        }),
        signUpUser: build.mutation<{} | AuthResponse, RegisterForm>({
            query: (payload: RegisterForm) => ({
                url: 'auth/register',
                method: 'POST',
                body: payload
            })
        }),
        getEventById: build.query<EventData, string>({
            query: (id) => ({
                url: `events/${id}`
            })
        }),
        createOrder: build.mutation<{} | any, any>({
            query: (payload: any) => ({
                url: 'orders/create',
                method: 'POST',
                body: payload
            })
        })
    })
})

export const {useGetEventsQuery, 
            useLoginUserMutation,
            useSignUpUserMutation,
            useGetEventByIdQuery,
            useCreateOrderMutation,
            useLazyGetEventByIdQuery} = ticketsApi