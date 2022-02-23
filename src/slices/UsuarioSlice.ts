import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {},
    reducers: {
        adicionar: (state: any, action) => {
            state.value = action.payload;
        }
    }
})

export const { adicionar } = usuarioSlice.actions;

export default usuarioSlice.reducer;
