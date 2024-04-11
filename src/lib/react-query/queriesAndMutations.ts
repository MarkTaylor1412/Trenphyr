import { INewUser } from "@/types";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createUser, signInAccount, signOutAccount } from "../appwrite/api";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUser(user),
    });
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user),
    });
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount,
    });
}
