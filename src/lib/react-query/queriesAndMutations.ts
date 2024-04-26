import { INewPost, INewUser } from "@/types";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createPost, createUserAccount, signInAccount, signOutAccount } from "../appwrite/api";
import { QueryKeys } from "./queryKeys";

export const createUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    });
}

export const signInAccountMutation = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user),
    });
}

export const signOutAccountMutation = () => {
    return useMutation({
        mutationFn: signOutAccount,
    });
}

export const createPostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Recent_Posts] })
        }
    })
}
