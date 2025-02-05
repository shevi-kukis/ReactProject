

import { createContext, Dispatch } from "react";

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    id: number;
};

type Action =
    | { type: "UPDATE_USER"; data: User }
    | { type: "LOGOUT" } 
    | { type: "ADD_USER"; data: Partial<User> & { email: string; password: string } };

const userEmpty: User = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    id: 0,
};

export const UserContext = createContext<{ user: User; Dispatch: Dispatch<Action> }>({
    user: userEmpty,
    Dispatch: () => null,
});

export default (state: User, action: Action): User => {
    switch (action.type) {
        case "UPDATE_USER":
            return action.data;
        case "ADD_USER":
            return action.data as User;
        case "LOGOUT":
            return userEmpty;
        default:
            return state;
    }
};
