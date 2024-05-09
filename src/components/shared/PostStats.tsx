import React, { useEffect, useState } from "react";
import { getCurrentUserMutation, likePostMutation, savePostMutation, unsavePostMutation } from "@/lib/react-query/queriesAndMutations"
import { checkIsLiked } from "@/lib/utils";
import { StatsProps } from "@/types"
import { Models } from "appwrite";
import Loader from "./Loader";

const PostStats = ({ post, userId }: StatsProps) => {
    const { mutate: likePost } = likePostMutation();
    const { mutate: savePost, isPending: isSaving } = savePostMutation();
    const { mutate: unsavePost, isPending: isUnsaving } = unsavePostMutation();

    const likesList = post?.likes.map((user: Models.Document) => user.$id);
    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { data: currentUser } = getCurrentUserMutation();
    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes];
        const hasLiked = newLikes.includes(userId);

        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId);
        } else {
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({ postId: post?.$id || "", likesArray: newLikes });
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsSaved(false);
            unsavePost(savedPostRecord.$id);
        } else {
            savePost({ postId: post?.$id || "", userId });
            setIsSaved(true);
        }
    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img
                    src={checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
                    alt="like"
                    height={20}
                    width={20}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />

                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                {isSaving || isUnsaving ? <Loader /> :
                    <img
                        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                        alt="like"
                        height={20}
                        width={20}
                        onClick={handleSavePost}
                        className="cursor-pointer"
                    />}
            </div>
        </div>
    )
}

export default PostStats