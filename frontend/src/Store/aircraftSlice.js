
import { createSlice } from '@reduxjs/toolkit';

const aircraftSlice = createSlice({
    name:"aircraft",
    initialState:{
        aircraftMasterId:null,
    },
    reducers:{
        setAircraftMasterId:(state,action) => {
            state.aircraftMasterId = action.payload;
        },
        clearAircraftMasterId:(state) => {
            state.aircraftMasterId = null;
        },
    },
});

export const {setAircraftMasterId,clearAircraftMasterId} = aircraftSlice.actions;
export const selectAircraftMasterId = (state) =>
    state.aircraft.aircraftMasterId;
export default aircraftSlice.reducer;