import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import restService from "../../components/service/restService.ts";
import { hideLoader, showLoader } from "./loaderSlice.ts";

interface LoginState {
    token: string | null;
    username: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    token: localStorage.getItem("token"),
    username: null,
    loading: false,
    error: null,
};

// Thunk for login
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (data: { username: string; password: string }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(showLoader());
            const response = await restService.post("/login", data);
            dispatch(hideLoader());
            console.log(response);
            return { token: response.data.accessToken, username: data.username };
        } catch (err: any) {
            dispatch(hideLoader());
            return rejectWithValue(err.response?.data?.error || "Login failed");
        }
    }
);

// Thunk for logout (optional if you want API call)
export const logoutUser = createAsyncThunk("login/logoutUser", async () => {
    // just clear local storage
    return;
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; username: string }>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.username = action.payload.username;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.username = null;
                localStorage.removeItem("token");
            });
    },
});

export default loginSlice.reducer;
