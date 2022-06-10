import {createSlice} from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        value: [],
    },
    reducers: {
        createHotel: (state, action) => {
            const items = JSON.parse(localStorage.getItem('hotels'));
            if (!items ) {
                state.value = [{id: uuid(), image: 'https://via.placeholder.com/300', name: action.payload.hotelName.trim(), point: parseInt(action.payload.point), createdAt: new Date()}]
                localStorage.setItem('hotels', JSON.stringify(state.value));
            }
            else {
                state.value = [...items, {id: uuid(), image: 'https://via.placeholder.com/300', name: action.payload.hotelName.trim(), point: parseInt(action.payload.point), createdAt: new Date()}];
                localStorage.setItem('hotels', JSON.stringify(state.value));
            }
        },
    }
})

export const { createHotel } = hotelSlice.actions

export default hotelSlice.reducer;