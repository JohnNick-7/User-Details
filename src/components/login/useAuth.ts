import { useAppDispatch, useAppSelector } from "../store/hook.ts";
import { loginUser, logoutUser } from "../store/slices/loginSlice.ts";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.login);
    console.log("object", token)
    const login = async (username: string, password: string) => {
        try {
            const resultAction = await dispatch(loginUser({ username, password }));
            if (loginUser.fulfilled.match(resultAction)) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    };

    const logout = () => {
        dispatch(logoutUser());
    };

    const isAuthenticated = !!token;

    return {
        isAuthenticated,
        token,
        login,
        logout,
    };
};
