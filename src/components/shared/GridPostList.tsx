import { useUserContext } from "@/context/AuthContext"
import { GridListProps } from "@/types"
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

const GridPostList = ({ posts, showUser = true, showStats = true }: GridListProps) => {
    const { user } = useUserContext();

    return (
        <ul className="grid-container">
            {posts?.map((post) => (
                <li key={post.$id} className="relative h-80 min-w-80">
                    <Link
                        to={`/posts/${post.$id}`}
                        className="grid-post_link"
                    >
                        <img
                            src={post.imageUrl}
                            alt="post"
                            className="h-full w-full object-cover"
                        />
                    </Link>

                    <div className="grid-post_user">
                        {showUser && (
                            <div className="flex flex-1 justify-start items-center gap-2">
                                <img
                                    src={post.creator.imageUrl}
                                    alt="creator"
                                    className="h-10 w-10 rounded-full"
                                />
                                <p className="line-clamp-1">
                                    {post.creator.username}
                                </p>
                            </div>
                        )}

                        {showStats && <PostStats post={post} userId={user.id} />}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default GridPostList