import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const LS_FAV_KEY = 'rfk'

interface TicketsState {
    favourites: string[]
}

const initialState: TicketsState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(f => f !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
        
    }
})

export const ticketsActions = ticketsSlice.actions
export const ticketsReducer = ticketsSlice.reducer