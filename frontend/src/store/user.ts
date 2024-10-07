// src/store/user.ts
import { reactive } from 'vue';

export const useUserStore = () => {
    const state = reactive({
        user: null as null | { email: string; fullName: string },
    });

    const setUser = (user: { email: string; fullName: string }) => {
        state.user = user;
    };

    const logout = () => {
        state.user = null;
    };

    return {
        state,
        setUser,
        logout,
    };
};

