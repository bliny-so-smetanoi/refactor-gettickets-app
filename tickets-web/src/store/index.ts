import {configureStore} from '@reduxjs/toolkit'
import {ticketsApi} from './tickets/tickets.api'
import {setupListeners} from '@reduxjs/toolkit/query'
import {ticketsReducer} from './tickets/tickets.slice'
import authReducer from './auth/auth.slice'

export const store = configureStore({
    reducer: {
        [ticketsApi.reducerPath]: ticketsApi.reducer,
        cart: ticketsReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ticketsApi.middleware)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
