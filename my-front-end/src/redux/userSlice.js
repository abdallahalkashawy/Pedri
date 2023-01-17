import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:{}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        unsetUser : (state) => {
            state.user = {};
        }
    }
});

export const { setUser,unsetUser } = userSlice.actions;

export default userSlice.reducer;
