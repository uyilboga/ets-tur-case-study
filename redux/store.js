import {configureStore} from "@reduxjs/toolkit";
import HotelReducer from './slices/hotelSlice'

export const store = configureStore({
    reducer: {
        hotels: HotelReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})