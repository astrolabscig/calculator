import { createSlice } from '@reduxjs/toolkit'

const displaySlice = createSlice({
    name: 'display',
    initialState: '0',
    reducers: {
        setDisplay: (state, action) => action.payload,
        resetDisplay: () => '0'
        
    }
})

export const { setDisplay, resetDisplay} = displaySlice.actions

export default displaySlice.reducer