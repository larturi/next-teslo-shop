import Cookies from 'js-cookie';
import { FC, useReducer } from 'react';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: React.ReactNode;
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    const login = async (email: string, password: string): Promise<boolean> => {

        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'AUTH_LOGIN', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            login,
        }}>
            { children }
        </AuthContext.Provider>
    )
};