import { INewPost, INewUser, IEditPost } from "@/types";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, createUser, editPost, getCurrentUser, getPostById, getRecentPosts, infinitePosts, likePost, savePost, searchPosts, signIn, signOut, unsavePost } from "../appwrite/api";
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

export const getRecentPostsMutation = () => {
    return useQuery({
        queryKey: [QueryKeys.Get_Recent_Posts],
        queryFn: getRecentPosts,
    })
}

export const likePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, likesArray }: { postId: string; likesArray: string[] }) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Post_By_Id, data?.$id] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Recent_Posts] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Posts] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Current_User] })
        }
    })
}

export const savePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, postId }: { userId: string; postId: string }) => savePost(userId, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Recent_Posts] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Posts] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Current_User] })
        }
    })
}

export const unsavePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (saveId: string) => unsavePost(saveId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Recent_Posts] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Posts] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Get_Current_User] })
        }
    })
}

export const getCurrentUserMutation = () => {
    return useQuery({
        queryKey: [QueryKeys.Get_Current_User],
        queryFn: getCurrentUser,
    })
}

export const getPostByIdMutation = (postId: string) => {
    return useQuery({
        queryKey: [QueryKeys.Get_Post_By_Id, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    })
}

export const editPostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: IEditPost) => editPost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: [QueryKeys.Get_Post_By_Id, data?.$id]});
        }
    })
}

export const infinitePostsMutation = () => {
    return useInfiniteQuery({
        queryKey: [QueryKeys.Get_Infinite_Posts],
        queryFn: infinitePosts,
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.documents.length === 0) return null;

            const lastPageId = lastPage?.documents[lastPage.documents.length - 1].$id;
            return lastPageId;
        }
    })
}

export const searchPostsMutation = (searchTerm: string) => {
    return useQuery({
        queryKey: [QueryKeys.Search_Posts, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm,
    })
}
