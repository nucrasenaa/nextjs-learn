import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- 1. Counter Slice ---
interface CounterState {
    value: number;
}
const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => { state.value += 1; },
        decrement: (state) => { state.value -= 1; },
        reset: (state) => { state.value = 0; },
    },
});
export const { increment, decrement, reset } = counterSlice.actions;

// --- 2. User Slice (Global State Demo) ---
interface UserState {
    name: string;
    role: string;
}
const initialUserState: UserState = { name: 'Guest', role: 'Visitor' };

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        updateProfile: (state, action: PayloadAction<{ name: string; role: string }>) => {
            state.name = action.payload.name;
            state.role = action.payload.role;
        }
    }
});
export const { updateProfile } = userSlice.actions;

// --- 3. Configure Store ---
export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer
    },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
