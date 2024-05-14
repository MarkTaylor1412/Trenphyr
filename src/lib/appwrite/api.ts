import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, ImageGravity, Query } from "appwrite";

export async function createUser(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUser({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        })

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUser(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userColId,
            ID.unique(),
            user,
        )

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signIn(user: {
    email: string;
    password: string;
}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userColId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(post: INewPost) {
    try {
        // Upload image to storage
        const uploadedFile = await uploadFile(post.file[0]);

        if (!uploadedFile) throw Error;

        // Get image URL
        const fileUrl = getFilePreview(uploadedFile.$id);
        console.log({ fileUrl });

        if (!fileUrl) {
            deleteFile(uploadedFile.$id);
            throw Error;
        }

        // Convert tags into an array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // Save to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postColId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            }
        )

        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file,
        );

        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            ImageGravity.Top,
            100,
        );

        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId,
        );

        return { status: "200 OK" };
    } catch (error) {
        console.log(error);
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postColId,
        [Query.orderDesc("$createdAt"), Query.limit(10)],
    )

    if (!posts) throw Error;
    return posts;
}

export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postColId,
            postId,
            {
                likes: likesArray
            }
        )

        if (!updatedPost) throw Error;
        return updatedPost;

    } catch (error) {
        console.log(error);
    }
}

export async function savePost(userId: string, postId: string) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesColId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        )

        if (!updatedPost) throw Error;
        return updatedPost;

    } catch (error) {
        console.log(error);
    }
}

export async function unsavePost(savedRecordId: string) {
    try {
        const statusCode = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesColId,
            savedRecordId,
        )

        if (!statusCode) throw Error;
        return { status: "OK" };

    } catch (error) {
        console.log(error);
    }
}

export async function getPostById(postId: string) {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postColId,
            postId,
        )

        return post;
    } catch (error) {
        console.log(error);
    }
}

export async function editPost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;

    try {
        let imageToUpdate = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        }

        if (hasFileToUpdate) {
            // Upload image to storage
            const uploadedFile = await uploadFile(post.file[0]);
            if (!uploadedFile) throw Error;

            // Get image URL
            const fileUrl = getFilePreview(uploadedFile.$id);
            console.log({ fileUrl });
            if (!fileUrl) {
                deleteFile(uploadedFile.$id);
                throw Error;
            }

            imageToUpdate = { ...imageToUpdate, imageUrl: fileUrl, imageId: uploadedFile.$id }

            // Convert tags into an array
            const tags = post.tags?.replace(/ /g, "").split(",") || [];

            // Save to database
            const updatedPost = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.postColId,
                post.postId,
                {
                    caption: post.caption,
                    imageUrl: imageToUpdate.imageUrl,
                    imageId: imageToUpdate.imageId,
                    location: post.location,
                    tags: tags,
                }
            )

            if (!updatedPost) {
                await deleteFile(post.imageId);
                throw Error;
            }

            return updatedPost;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function infinitePosts({ pageParam }: { pageParam: number }) {
    const queries: any[] = [Query.orderDesc("$createdAt"), Query.limit(10)];

    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postColId,
            queries,
        )

        if (!posts) throw Error;
        return posts;

    } catch (error) {
        console.log(error);
    }
}

export async function searchPosts(searchTerm: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postColId,
            [Query.search("caption", searchTerm)],
        )

        if (!posts) throw Error;
        return posts;

    } catch (error) {
        console.log(error);
    }
}
