import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {},
    reducers: {
        adicionar: (state) => {
            state = state;
        }
    }
})

export const { adicionar } = usuarioSlice.actions;

export default usuarioSlice.reducer;
