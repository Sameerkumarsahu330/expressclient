import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSessionActive: false,
    sessionId : document.cookie,
    userName:''
}

const sessionSlice = createSlice({
    name : 'session',
    initialState,
    reducers:{
        updateSession : (state,action) => {
            state.isSessionActive = action.payload;
        }
    }
});

export const {updateSession} = sessionSlice.actions;
export default sessionSlice.reducer;