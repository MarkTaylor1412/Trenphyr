import { INewPost, INewUser } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, createUser, signIn, signOut } from "../appwrite/api";
import { QueryKeys } from "./queryKeys";

export const createUserMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUser(user),
    });
}

export const signInMutation = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signIn(user),
    });
}

export const signOutMutation = () => {
    return useMutation({
        mutationFn: signOut,
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
