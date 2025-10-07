import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    isAuthenitcate: false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state)=>{
            state.isAuthenitcate = true
        },
        removeUser:(state,action)=>{
            state.isAuthenitcate = false
        }
    }
})

export default userSlice.reducer;
export const {addUser, removeUser} = userSlice.actions